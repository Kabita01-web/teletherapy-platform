import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export default function SessionRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserId = user?._id ?? user?.id;

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/appointments");
        const match = (res.data ?? []).find((a) => a._id === id);
        if (!cancelled) {
          if (match) setAppointment(match);
          else setError("Session not found.");
        }
      } catch (err) {
        console.error("Failed to load session:", err);
        if (!cancelled) setError("Could not load this session.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[900px] mx-auto px-6 md:px-16 py-12">
        <div className="h-64 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="max-w-[900px] mx-auto px-6 md:px-16 py-12">
        <Link
          to="/sessions"
          className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Sessions
        </Link>
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error || "Session not found."}
        </div>
      </div>
    );
  }

  return appointment.modality === "video" ? (
    <VideoRoom
      appointment={appointment}
      currentUserRole={user?.role}
      onExit={() => navigate("/sessions")}
    />
  ) : (
    <ChatRoom
      appointment={appointment}
      currentUserId={currentUserId}
      onExit={() => navigate("/sessions")}
    />
  );
}

/* ================================================================== */
/* CHAT — fully wired against confirmed chatController.js endpoints    */
/* ================================================================== */

function ChatRoom({ appointment, currentUserId, onExit }) {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);
  const pollRef = useRef(null);

  const loadMessages = useCallback(async (convId, { silent } = {}) => {
    try {
      const res = await api.get(`/chat/conversations/${convId}/messages`);
      setMessages(res.data ?? []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      if (!silent) setError("Could not load messages.");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      setLoading(true);
      setError("");
      try {
        const res = await api.post("/chat/conversations", {
          participantId: appointment.therapist?._id,
        });
        if (cancelled) return;
        setConversationId(res.data._id);
        await loadMessages(res.data._id);
      } catch (err) {
        console.error("Failed to start conversation:", err);
        if (!cancelled) setError("Couldn't open this conversation.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [appointment.therapist?._id, loadMessages]);

  useEffect(() => {
    if (!conversationId) return;
    pollRef.current = setInterval(
      () => loadMessages(conversationId, { silent: true }),
      5000,
    );
    return () => clearInterval(pollRef.current);
  }, [conversationId, loadMessages]);

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
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Couldn't send that message.");
      setDraft(content);
    } finally {
      setSending(false);
    }
  }

  const { date, time } = formatDateTime(appointment.scheduledAt);

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-surface-variant bg-surface-container-lowest flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-text-muted hover:text-on-surface"
            aria-label="Leave session"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-body-md font-['Fraunces',serif] font-medium text-on-background">
              {appointment.therapist?.name ?? "Session"}
            </p>
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted flex items-center gap-2">
              <Calendar size={11} /> {date} <Clock size={11} /> {time}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-3"
      >
        {loading ? (
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
            This is the start of your session — say hello.
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
    </div>
  );
}

/* ================================================================== */
/* VIDEO — Fixed version with duplicate identity fix                  */
/* ================================================================== */

function VideoRoom({ appointment, currentUserRole, onExit }) {
  const [status, setStatus] = useState("connecting");
  const [errorMsg, setErrorMsg] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const roomRef = useRef(null);
  const connectingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function connectToRoom() {
      if (connectingRef.current) {
        console.log("⏳ Already connecting, skipping...");
        return;
      }
      connectingRef.current = true;

      try {
        console.log("📷 Requesting camera access...");

        try {
          const testStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          console.log("✅ Camera access granted!");
          testStream.getTracks().forEach((track) => track.stop());
        } catch (cameraErr) {
          console.error("❌ Camera access denied:", cameraErr);
          setStatus("error");
          setErrorMsg(
            "Camera/Microphone access denied. Please allow access in browser settings.",
          );
          connectingRef.current = false;
          return;
        }

        console.log("🔑 Getting Twilio token...");
        const tokenRes = await api.post("/video/token", {
          appointmentId: appointment._id,
        });
        console.log("✅ Token response:", tokenRes.data);

        const { token, roomName } = tokenRes.data;

        console.log("📦 Loading Twilio Video...");
        const { connect } = await import("twilio-video");

        console.log("🔗 Connecting to room:", roomName ?? appointment._id);
        const room = await connect(token, {
          name: roomName ?? appointment._id,
          audio: true,
          video: {
            width: 640,
            height: 480,
            frameRate: 24,
          },
        });

        if (cancelled) {
          room.disconnect();
          connectingRef.current = false;
          return;
        }

        roomRef.current = room;
        console.log("✅ Connected to room!");

        // ✅ FIXED: Attach local tracks - removed isSubscribed check
        room.localParticipant.videoTracks.forEach((publication) => {
          console.log("📹 Local video track:", publication.track?.name);
          if (publication.track) {
            if (localVideoRef.current) {
              publication.track.attach(localVideoRef.current);
              console.log("✅ Local video attached to element");
            }
          }
        });

        room.localParticipant.audioTracks.forEach((publication) => {
          console.log("🎤 Local audio track:", publication.track?.name);
        });

        // Attach remote participants
        const attachParticipant = (participant) => {
          console.log("👤 Remote participant:", participant.identity);

          participant.videoTracks.forEach((publication) => {
            if (publication.isSubscribed && publication.track) {
              console.log("📹 Remote video track:", publication.track?.name);
              if (remoteVideoRef.current) {
                publication.track.attach(remoteVideoRef.current);
                console.log("✅ Remote video attached to element");
              }
            }
          });

          participant.on("trackSubscribed", (track) => {
            console.log("📹 Remote track subscribed:", track.kind);
            if (track.kind === "video" && remoteVideoRef.current) {
              track.attach(remoteVideoRef.current);
              console.log("✅ Remote video attached");
            }
          });
        };

        room.participants.forEach(attachParticipant);

        room.on("participantConnected", (participant) => {
          console.log("👤 New participant connected:", participant.identity);
          attachParticipant(participant);
        });

        room.on("participantDisconnected", (participant) => {
          console.log("👋 Participant disconnected:", participant.identity);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
        });

        room.on("disconnected", (room, error) => {
          console.log("🔌 Disconnected:", error);
          if (error && !cancelled) {
            setStatus("error");
            setErrorMsg("Connection lost: " + error.message);
          }
        });

        setStatus("connected");
        console.log("🎉 Video call is ready!");
        connectingRef.current = false;
      } catch (err) {
        console.error("❌ Failed to connect to video room:", err);
        connectingRef.current = false;
        if (!cancelled) {
          setStatus("error");

          let message = "Couldn't connect to the video call. ";
          if (err.message?.includes("duplicate identity")) {
            message =
              "You're already connected to this session in another tab/window. Please close the other one and try again.";
          } else if (
            err.message?.includes("Camera") ||
            err.message?.includes("getUserMedia")
          ) {
            message =
              "Camera access denied. Please allow camera and microphone access in your browser settings.";
          } else if (
            err.message?.includes("token") ||
            err.message?.includes("403")
          ) {
            message = "Session expired. Please refresh and try again.";
          } else if (
            err.message?.includes("WebSocket") ||
            err.message?.includes("network")
          ) {
            message =
              "Network connection issue. Please check your internet and try again.";
          } else if (err.message?.includes("twilio-video")) {
            message =
              "The video call library isn't installed yet — run `npm install twilio-video` in /client.";
          } else {
            message += err.message || "Unknown error.";
          }
          setErrorMsg(message);
        }
      }
    }

    connectToRoom();

    return () => {
      cancelled = true;
      connectingRef.current = false;
      if (roomRef.current) {
        console.log("🔌 Disconnecting from room...");
        roomRef.current.disconnect();
      }
    };
  }, [appointment._id]);

  function toggleMic() {
    if (!roomRef.current) return;
    roomRef.current.localParticipant.audioTracks.forEach((pub) => {
      if (micOn) {
        pub.track.disable();
        console.log("🔇 Microphone muted");
      } else {
        pub.track.enable();
        console.log("🎤 Microphone unmuted");
      }
    });
    setMicOn((v) => !v);
  }

  function toggleCam() {
    if (!roomRef.current) return;
    roomRef.current.localParticipant.videoTracks.forEach((pub) => {
      if (camOn) {
        pub.track.disable();
        console.log("📹 Camera turned off");
      } else {
        pub.track.enable();
        console.log("📹 Camera turned on");
      }
    });
    setCamOn((v) => !v);
  }

  async function handleLeave() {
    console.log("📞 Ending call...");
    roomRef.current?.disconnect();

    if (currentUserRole === "therapist") {
      try {
        await api.post("/video/end", { appointmentId: appointment._id });
        console.log("✅ Session ended by therapist");
      } catch (err) {
        console.error("Failed to end video session:", err);
      }
    }
    onExit();
  }

  return (
    <div className="h-screen bg-on-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-white/80">
          Session with {appointment.therapist?.name ?? "your therapist"}
        </p>
        <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-white/60 uppercase tracking-wide">
          {status === "connecting"
            ? "Connecting…"
            : status === "connected"
              ? "Live"
              : "Error"}
        </span>
      </div>

      {/* Video area */}
      <div className="flex-1 relative bg-black">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-black"
        />
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-6 right-6 w-40 sm:w-56 aspect-video rounded-xl object-cover border-2 border-white/20 shadow-xl bg-black"
        />

        {status === "connecting" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-md text-center bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant">
              <AlertTriangle size={28} className="text-error mx-auto mb-4" />
              <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-on-surface mb-2 font-semibold">
                Couldn't start the video call
              </p>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-6">
                {errorMsg}
              </p>
              <Link
                to="/sessions"
                className="inline-block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-6 py-2.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                Back to Sessions
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-6 flex-shrink-0">
        <button
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            micOn
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-error text-white"
          }`}
          aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
        >
          {micOn ? <Mic size={19} /> : <MicOff size={19} />}
        </button>
        <button
          onClick={handleLeave}
          className="w-14 h-14 rounded-full bg-error text-white flex items-center justify-center hover:bg-error/90 transition-colors"
          aria-label="Leave call"
        >
          <PhoneOff size={20} />
        </button>
        <button
          onClick={toggleCam}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            camOn
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-error text-white"
          }`}
          aria-label={camOn ? "Turn off camera" : "Turn on camera"}
        >
          {camOn ? <VideoIcon size={19} /> : <VideoOff size={19} />}
        </button>
      </div>
    </div>
  );
}
