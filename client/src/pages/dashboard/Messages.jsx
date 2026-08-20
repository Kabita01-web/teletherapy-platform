import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Send, ArrowLeft, MessageCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";

/**
 * Messages — two-pane chat UI (conversation list + active thread), using
 * your real chatController.js endpoints:
 *   GET  /api/chat/conversations
 *   GET  /api/chat/conversations/:conversationId/messages  (also marks
 *        incoming messages as read, server-side, as a side effect)
 *   POST /api/chat/messages   { conversationId, content }
 *
 * No Socket.IO/real-time wiring yet — this is REST-only with a light
 * poll on the active thread (every 5s) so messages don't require a
 * manual refresh, but it isn't instant like a real socket connection
 * would be. Swap the poll for your sockets/chatSocket.js client once
 * that's wired up frontend-side; the message-list rendering itself
 * won't need to change, just how new messages arrive.
 */

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getOtherParticipant(conversation, currentUserId) {
  return conversation.participants?.find(
    (p) => String(p._id) !== String(currentUserId),
  );
}

export default function Messages() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserId = user?._id ?? user?.id;

  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);
  const pollRef = useRef(null);

  // Load the conversation list once.
  useEffect(() => {
    let cancelled = false;
    async function loadConversations() {
      setConversationsLoading(true);
      try {
        const res = await api.get("/chat/conversations");
        if (!cancelled) setConversations(res.data ?? []);
      } catch (err) {
        console.error("Failed to load conversations:", err);
        if (!cancelled) setError("Could not load your conversations.");
      } finally {
        if (!cancelled) setConversationsLoading(false);
      }
    }
    loadConversations();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMessages = useCallback(async (id, { silent } = {}) => {
    if (!silent) setMessagesLoading(true);
    try {
      const res = await api.get(`/chat/conversations/${id}/messages`);
      setMessages(res.data ?? []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      if (!silent) setError("Could not load this conversation.");
    } finally {
      if (!silent) setMessagesLoading(false);
    }
  }, []);

  // Load messages for the active conversation, and poll it lightly while open.
  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    loadMessages(conversationId);

    pollRef.current = setInterval(
      () => loadMessages(conversationId, { silent: true }),
      5000,
    );
    return () => clearInterval(pollRef.current);
  }, [conversationId, loadMessages]);

  // Auto-scroll to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    const content = draft.trim();
    if (!content || !conversationId) return;

    setSending(true);
    setDraft("");
    try {
      const res = await api.post("/chat/messages", { conversationId, content });
      setMessages((prev) => [...prev, res.data]);
      // Bump this conversation's preview/order without a full refetch.
      setConversations((prev) =>
        prev.map((c) =>
          c._id === conversationId
            ? { ...c, lastMessage: res.data, lastMessageAt: res.data.createdAt }
            : c,
        ),
      );
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Couldn't send that message. Please try again.");
      setDraft(content); // give it back so nothing's lost
    } finally {
      setSending(false);
    }
  }

  const activeConversation = conversations.find(
    (c) => c._id === conversationId,
  );
  const activeOther = activeConversation
    ? getOtherParticipant(activeConversation, currentUserId)
    : null;

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex">
      {/* Conversation list */}
      <div
        className={`w-full md:w-80 flex-shrink-0 border-r border-surface-variant bg-surface-container-lowest flex flex-col ${
          conversationId ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="px-6 py-5 border-b border-surface-variant">
          <h1 className="text-headline-md font-['Fraunces',serif] font-medium text-on-background tracking-tight">
            Messages
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversationsLoading ? (
            <div className="p-4 space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-surface-container rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-6 text-center">
              <MessageCircle
                size={28}
                className="text-text-muted mx-auto mb-3"
              />
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                No conversations yet.
              </p>
            </div>
          ) : (
            <ul>
              {conversations.map((c) => {
                const other = getOtherParticipant(c, currentUserId);
                const name = other?.name ?? "Conversation";
                const preview = c.lastMessage?.content ?? "No messages yet";
                const isActive = c._id === conversationId;
                return (
                  <li key={c._id}>
                    <button
                      onClick={() => navigate(`/messages/${c._id}`)}
                      className={`w-full flex items-center gap-3 px-6 py-3.5 text-left transition-colors ${
                        isActive
                          ? "bg-primary/10"
                          : "hover:bg-surface-container"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                        <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold text-primary">
                          {name[0]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold truncate ${isActive ? "text-primary" : "text-on-surface"}`}
                        >
                          {name}
                        </p>
                        <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted text-xs truncate">
                          {preview}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Active thread */}
      <div
        className={`flex-1 min-w-0 flex flex-col ${conversationId ? "flex" : "hidden md:flex"}`}
      >
        {!conversationId ? (
          <div className="flex-1 flex items-center justify-center text-center px-6">
            <div>
              <MessageCircle
                size={32}
                className="text-text-muted mx-auto mb-3"
              />
              <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                Select a conversation to see your messages.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Thread header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-surface-variant bg-surface-container-lowest flex-shrink-0">
              <button
                onClick={() => navigate("/messages")}
                className="md:hidden text-text-muted hover:text-on-surface"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold text-primary">
                  {(activeOther?.name ?? "?")[0]}
                </span>
              </div>
              <p className="text-body-md font-['Fraunces',serif] font-medium text-on-background">
                {activeOther?.name ?? "Conversation"}
              </p>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-3"
            >
              {messagesLoading ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-10 w-2/3 bg-surface-container rounded-2xl animate-pulse ${i % 2 ? "ml-auto" : ""}`}
                    />
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted text-center mt-8">
                  No messages yet — say hello.
                </p>
              ) : (
                messages.map((m) => {
                  const isMine =
                    String(m.sender?._id ?? m.sender) === String(currentUserId);
                  return (
                    <motion.div
                      key={m._id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-2xl text-body-sm font-['Plus_Jakarta_Sans',sans-serif] ${
                        isMine
                          ? "self-end bg-primary text-on-primary rounded-br-sm"
                          : "self-start bg-surface-container-lowest border border-surface-variant text-on-surface rounded-bl-sm"
                      }`}
                    >
                      <p>{m.content}</p>
                      <p
                        className={`text-[10px] mt-1 ${isMine ? "text-on-primary/70" : "text-text-muted"}`}
                      >
                        {formatTime(m.createdAt)}
                      </p>
                    </motion.div>
                  );
                })
              )}
            </div>

            {error && (
              <div className="px-6 py-2 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-error">
                {error}
              </div>
            )}

            {/* Composer */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-3 px-6 py-4 border-t border-surface-variant bg-surface-container-lowest flex-shrink-0"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 bg-surface border border-surface-variant rounded-full px-5 py-3 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!draft.trim() || sending}
                className="w-11 h-11 flex-shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
