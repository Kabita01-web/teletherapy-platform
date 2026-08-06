const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

module.exports = (io) => {
  // Middleware for authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.email} (${socket.user.role})`);

    // Join user's room
    socket.join(`user_${socket.user._id}`);

    // Handle sending messages
    socket.on("send_message", async (data) => {
      try {
        const { conversationId, content } = data;

        // Verify conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          socket.emit("error", { message: "Conversation not found" });
          return;
        }

        // Verify user is participant
        if (!conversation.participants.includes(socket.user._id)) {
          socket.emit("error", { message: "Access denied" });
          return;
        }

        // Create message
        const message = new Message({
          conversation: conversationId,
          sender: socket.user._id,
          content,
        });

        await message.save();

        // Update conversation
        conversation.lastMessage = message._id;
        conversation.lastMessageAt = message.createdAt;
        await conversation.save();

        // Populate sender
        await message.populate("sender", "name email role");

        // Get other participant
        const otherParticipant = conversation.participants.find(
          (p) => p.toString() !== socket.user._id.toString(),
        );

        // Emit to sender
        socket.emit("message_sent", message);

        // Emit to receiver
        io.to(`user_${otherParticipant}`).emit("new_message", message);

        // Update conversation list for both users
        io.to(`user_${socket.user._id}`).emit(
          "conversation_updated",
          conversation,
        );
        io.to(`user_${otherParticipant}`).emit(
          "conversation_updated",
          conversation,
        );
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // Handle typing indicators
    socket.on("typing", async (data) => {
      try {
        const { conversationId } = data;
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) return;

        const otherParticipant = conversation.participants.find(
          (p) => p.toString() !== socket.user._id.toString(),
        );

        io.to(`user_${otherParticipant}`).emit("user_typing", {
          conversationId,
          user: socket.user._id,
          name: socket.user.name,
        });
      } catch (error) {
        console.error("Typing error:", error);
      }
    });

    // Handle stop typing
    socket.on("stop_typing", async (data) => {
      try {
        const { conversationId } = data;
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) return;

        const otherParticipant = conversation.participants.find(
          (p) => p.toString() !== socket.user._id.toString(),
        );

        io.to(`user_${otherParticipant}`).emit("user_stop_typing", {
          conversationId,
        });
      } catch (error) {
        console.error("Stop typing error:", error);
      }
    });

    // Handle message read
    socket.on("message_read", async (data) => {
      try {
        const { messageId } = data;
        const message = await Message.findById(messageId);

        if (!message) return;

        const alreadyRead = message.readBy.some(
          (r) => r.user.toString() === socket.user._id.toString(),
        );

        if (!alreadyRead) {
          message.readBy.push({ user: socket.user._id, readAt: new Date() });
          await message.save();
        }
      } catch (error) {
        console.error("Message read error:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.email}`);
    });
  });
};
