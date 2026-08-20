import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  ClipboardList,
  BookOpen,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
// Adjust this import to wherever your axios instance actually lives
// (per your README's client/src/api/ folder) — this assumes a default
// export configured with baseURL = REACT_APP_API_URL (or your Vite
// equivalent) and the auth token attached via an interceptor.
import api from "../../api/axios";

/**
 * Client Dashboard — the landing page after a client logs in.
 * Pulls from your existing backend:
 *   GET /api/appointments        (role-scoped to this client)
 *   GET /api/clients/:id/assessments   — using GET /api/assessments/:id
 *     isn't right for "pending ones"; adjust once you confirm the actual
 *     "list my assessments" endpoint, since the README only documents
 *     single-assessment GET and the therapist-view list route.
 *   GET /api/resources
 *   GET /api/conversations
 *
 * Assumes this route is already wrapped by your auth/role guard — this
 * component doesn't re-check the role itself.
 */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

// getConversations returns raw populated Conversation docs
// ({ participants: [User, User], lastMessage: Message | null, ... }),
// not a flattened shape — this picks out "the other person" relative to
// whoever's logged in.
function getOtherParticipant(conversation, currentUserId) {
  return conversation.participants?.find(
    (p) => String(p._id) !== String(currentUserId),
  );
}

export default function ClientDashboard() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [resources, setResources] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      // Promise.allSettled instead of Promise.all — a single failing
      // endpoint (e.g. /conversations 404ing because that route isn't
      // built yet) no longer discards data from the requests that
      // succeeded. Each result is applied independently.
      const [appointmentsRes, resourcesRes, conversationsRes, assessmentsRes] =
        await Promise.allSettled([
          api.get("/appointments"),
          api.get("/resources"),
          api.get("/chat/conversations"),
          // Pending assessment: GET /api/assessments (bare, no id) is the
          // real "list mine" route per assementRoute.js — /client/:clientId
          // is therapist-only (roleCheck("therapist")), so that was never
          // going to work for a client account.
          api.get("/assessments"),
        ]);

      if (cancelled) return;

      const failedEndpoints = [];

      if (appointmentsRes.status === "fulfilled") {
        setAppointments(appointmentsRes.value.data ?? []);
      } else {
        console.error("Failed to load appointments:", appointmentsRes.reason);
        failedEndpoints.push("sessions");
      }

      if (resourcesRes.status === "fulfilled") {
        setResources((resourcesRes.value.data ?? []).slice(0, 3));
      } else {
        console.error("Failed to load resources:", resourcesRes.reason);
        failedEndpoints.push("resources");
      }

      if (conversationsRes.status === "fulfilled") {
        setConversations((conversationsRes.value.data ?? []).slice(0, 3));
      } else {
        console.error("Failed to load conversations:", conversationsRes.reason);
        failedEndpoints.push("messages");
      }

      if (assessmentsRes.status === "fulfilled") {
        // NOTE: createAssessment never sets completedAt (a client submits
        // template+responses in one step, which IS the completion), and
        // there's currently no backend concept of an assessment being
        // "assigned but not yet filled out" — every assessment that
        // exists has already been submitted. So there's no reliable way
        // to detect a genuinely pending one yet; showing "X on file"
        // instead of guessing avoids falsely prompting someone to
        // "complete" something they already did.
        //
        // Once you build the assign/pending flow (new status field +
        // assign endpoint), swap this back to finding the actual
        // pending one, e.g.:
        //   const pending = assessments.find((a) => a.status === 'assigned');
        setAssessmentCount(assessmentsRes.value.data?.length ?? 0);
      }
      // Assessments failure stays silent (non-fatal) — it's still an
      // unconfirmed endpoint per the README, so it shouldn't trigger
      // the visible error banner the other three do.

      if (failedEndpoints.length > 0) {
        setError(
          `Couldn't load your ${failedEndpoints.join(", ")} right now. The rest of your dashboard is up to date.`,
        );
      }

      setLoading(false);
    }

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const upcoming = appointments
    .filter((a) => ["booked", "confirmed"].includes(a.status))
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

  const nextSession = upcoming[0];

  return (
    <div className="min-h-screen bg-surface-container-low bg-noise">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
            </h1>
            <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
              Here's what's happening with your care.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link
              to="/therapists"
              className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-6 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-sm"
            >
              <Plus size={16} />
              Book a Session
            </Link>
          </motion.div>
        </motion.div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
            {error}
          </div>
        )}

        {/* Quick-status cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Next session */}
          <motion.div
            variants={itemVariants}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3 text-primary">
              <Calendar size={18} />
              <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold uppercase tracking-wide">
                Next Session
              </span>
            </div>
            {loading ? (
              <div className="h-5 w-2/3 bg-surface-container rounded animate-pulse" />
            ) : nextSession ? (
              <div>
                <p className="text-body-md font-['Fraunces',serif] font-medium text-on-surface">
                  {formatDateTime(nextSession.scheduledAt).date} ·{" "}
                  {formatDateTime(nextSession.scheduledAt).time}
                </p>
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
                  with {nextSession.therapist?.name ?? "your therapist"}
                </p>
              </div>
            ) : (
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                No upcoming sessions —{" "}
                <Link
                  to="/therapists"
                  className="text-primary font-semibold hover:underline"
                >
                  book one
                </Link>
                .
              </p>
            )}
          </motion.div>

          {/* Assessments */}
          <motion.div
            variants={itemVariants}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3 text-secondary">
              <ClipboardList size={18} />
              <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold uppercase tracking-wide">
                Assessments
              </span>
            </div>
            {loading ? (
              <div className="h-5 w-2/3 bg-surface-container rounded animate-pulse" />
            ) : (
              <div>
                <p className="text-body-md font-['Fraunces',serif] font-medium text-on-surface">
                  {assessmentCount} on file
                </p>
                <Link
                  to="/assessments"
                  className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-primary font-semibold hover:underline mt-1 inline-block"
                >
                  View history →
                </Link>
              </div>
            )}
          </motion.div>

          {/* Messages */}
          <motion.div
            variants={itemVariants}
            className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3 text-deep-earth">
              <MessageCircle size={18} />
              <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold uppercase tracking-wide">
                Messages
              </span>
            </div>
            {loading ? (
              <div className="h-5 w-2/3 bg-surface-container rounded animate-pulse" />
            ) : (
              <div>
                <p className="text-body-md font-['Fraunces',serif] font-medium text-on-surface">
                  {conversations.length} conversation
                  {conversations.length === 1 ? "" : "s"}
                </p>
                <Link
                  to="/messages"
                  className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-primary font-semibold hover:underline mt-1 inline-block"
                >
                  Open inbox →
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming sessions list */}
          <motion.div
            className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm p-6 md:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-md font-['Fraunces',serif] font-medium text-on-background tracking-tight">
                Upcoming Sessions
              </h2>
              <Link
                to="/sessions"
                className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-primary font-semibold hover:underline flex items-center gap-1"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-surface-container rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : upcoming.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-4">
                  You don't have any sessions booked yet.
                </p>
                <Link
                  to="/therapists"
                  className="inline-flex items-center gap-1.5 text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary hover:underline"
                >
                  Find a therapist <ChevronRight size={14} />
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-surface-variant">
                {upcoming.map((appt) => {
                  const { date, time } = formatDateTime(appt.scheduledAt);
                  return (
                    <li
                      key={appt._id}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                          {appt.modality === "video" ? (
                            <Video
                              size={18}
                              className="text-on-secondary-container"
                            />
                          ) : (
                            <MessageCircle
                              size={18}
                              className="text-on-secondary-container"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface">
                            {appt.therapist?.name ?? "Your therapist"}
                          </p>
                          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted flex items-center gap-1">
                            <Clock size={12} /> {date} · {time}
                          </p>
                        </div>
                      </div>
                      <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {appt.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>

          {/* Right column: resources + inbox preview */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            {/* Resource feed */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background">
                  For You
                </h2>
                <Link
                  to="/resources"
                  className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-primary font-semibold hover:underline"
                >
                  Browse
                </Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-surface-container rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : resources.length === 0 ? (
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                  No resources yet.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {resources.map((r) => (
                    <li key={r._id}>
                      <Link
                        to={`/resources/${r._id}`}
                        className="flex items-start gap-3 group"
                      >
                        <BookOpen
                          size={16}
                          className="text-secondary mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface group-hover:text-primary transition-colors">
                            {r.title}
                          </p>
                          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted text-xs">
                            {r.topic}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Inbox preview */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background">
                  Messages
                </h2>
                <Link
                  to="/messages"
                  className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-primary font-semibold hover:underline"
                >
                  Open
                </Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-surface-container rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                  No conversations yet.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {conversations.map((c) => {
                    const other = getOtherParticipant(c, user?._id ?? user?.id);
                    const name = other?.name ?? "Conversation";
                    const preview = c.lastMessage?.content ?? "No messages yet";
                    return (
                      <li key={c._id}>
                        <Link
                          to={`/messages/${c._id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                            <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold text-primary">
                              {name[0]}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                              {name}
                            </p>
                            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted text-xs truncate">
                              {preview}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
