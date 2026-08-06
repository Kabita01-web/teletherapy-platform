const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getOrCreateConversation,
  getConversations,
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount,
} = require("../controllers/chatController");

// @route   GET /api/chat/unread
// @desc    Get unread message count
// @access  Private
router.get("/unread", auth, getUnreadCount);

// @route   GET /api/chat/conversations
// @desc    Get all conversations
// @access  Private
router.get("/conversations", auth, getConversations);

// @route   POST /api/chat/conversations
// @desc    Get or create conversation
// @access  Private
router.post("/conversations", auth, getOrCreateConversation);

// @route   GET /api/chat/conversations/:conversationId/messages
// @desc    Get messages for a conversation
// @access  Private
router.get("/conversations/:conversationId/messages", auth, getMessages);

// @route   POST /api/chat/messages
// @desc    Send a message
// @access  Private
router.post("/messages", auth, sendMessage);

// @route   PATCH /api/chat/messages/:messageId/read
// @desc    Mark message as read
// @access  Private
router.patch("/messages/:messageId/read", auth, markAsRead);

// @route   DELETE /api/chat/messages/:messageId
// @desc    Delete message
// @access  Private
router.delete("/messages/:messageId", auth, deleteMessage);

module.exports = router;
