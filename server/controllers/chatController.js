const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Get or create a conversation
// @route   POST /api/chat/conversations
// @access  Private
const getOrCreateConversation = async (req, res) => {
  try {
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ message: "Participant ID is required" });
    }

    // Check if participant exists
    const participant = await User.findById(participantId);
    if (!participant) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, participantId] },
    }).populate("participants", "name email role");

    if (!conversation) {
      // Create new conversation
      conversation = new Conversation({
        participants: [req.user._id, participantId],
      });
      await conversation.save();
      await conversation.populate("participants", "name email role");
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all conversations for current user
// @route   GET /api/chat/conversations
// @access  Private
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
      isActive: true,
    })
      .populate("participants", "name email role")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get messages for a conversation
// @route   GET /api/chat/conversations/:conversationId/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, before } = req.query;

    // Verify user is part of conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Build query
    const query = { conversation: conversationId, isDeleted: false };
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    const messages = await Message.find(query)
      .populate("sender", "name email role")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    // Mark messages as read
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: req.user._id },
        "readBy.user": { $ne: req.user._id },
      },
      {
        $push: { readBy: { user: req.user._id, readAt: new Date() } },
      },
    );

    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message (via REST, but we'll use Socket.IO for real-time)
// @route   POST /api/chat/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res
        .status(400)
        .json({ message: "Conversation ID and content are required" });
    }

    // Verify conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Verify user is part of conversation
    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Create message
    const message = new Message({
      conversation: conversationId,
      sender: req.user._id,
      content,
    });

    await message.save();

    // Update conversation last message
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;
    await conversation.save();

    await message.populate("sender", "name email role");

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as read
// @route   PATCH /api/chat/messages/:messageId/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Check if already read
    const alreadyRead = message.readBy.some(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (!alreadyRead) {
      message.readBy.push({ user: req.user._id, readAt: new Date() });
      await message.save();
    }

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete message (soft delete)
// @route   DELETE /api/chat/messages/:messageId
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    message.isDeleted = true;
    await message.save();

    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unread message count
// @route   GET /api/chat/unread
// @access  Private
const getUnreadCount = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    });

    let totalUnread = 0;

    for (const conversation of conversations) {
      const unread = await Message.countDocuments({
        conversation: conversation._id,
        sender: { $ne: req.user._id },
        "readBy.user": { $ne: req.user._id },
      });
      totalUnread += unread;
    }

    res.json({ unread: totalUnread });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrCreateConversation,
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount,
};
