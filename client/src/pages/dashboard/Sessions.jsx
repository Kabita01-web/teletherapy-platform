import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  X,
  ChevronRight,
} from "lucide-react";
import api from "../../api/axios";

/**
 * Sessions — full list of the client's appointments, filterable by
 * Upcoming / Past / Cancelled. Uses the same GET /api/appointments
 * endpoint as the dashboard (role-scoped server-side), plus the
 * PATCH /api/appointments/:id/cancel and /reschedule routes documented
 * in your README.
 *
 * Reschedule is a minimal inline modal (pick a new date/time, submit) —
 * intentionally simple since the full booking flow isn't built yet
 * ("Booking flow coming soon" at /book/:id).
 */

const filters = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

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

// For the datetime-local input, which needs "YYYY-MM-DDTHH:mm" in local time.
function toDatetimeLocalValue(dateStr) {
  const d = new Date(dateStr);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Sessions() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("upcoming");

  const [cancellingId, setCancellingId] = useState(null);
  const [rescheduleTarget, setRescheduleTarget] = useState(null); // the appointment being rescheduled
  const [newDateTime, setNewDateTime] = useState("");
  const [rescheduleSaving, setRescheduleSaving] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/appointments");
        if (!cancelled) setAppointments(res.data ?? []);
      } catch (err) {
        console.error("Failed to load appointments:", err);
        if (!cancelled) setError("Could not load your sessions right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const now = new Date();

  const filtered = appointments
    .filter((a) => {
      if (activeFilter === "cancelled")
        return ["cancelled", "no_show"].includes(a.status);
      if (activeFilter === "upcoming") {
        return (
          ["booked", "confirmed"].includes(a.status) &&
          new Date(a.scheduledAt) >= now
        );
      }
      // past: completed, or booked/confirmed sessions whose time has already passed
      return (
        a.status === "completed" ||
        (["booked", "confirmed"].includes(a.status) &&
          new Date(a.scheduledAt) < now)
      );
    })
    .sort((a, b) =>
      activeFilter === "past"
        ? new Date(b.scheduledAt) - new Date(a.scheduledAt)
        : new Date(a.scheduledAt) - new Date(b.scheduledAt),
    );

  async function handleCancel(appointmentId) {
    if (!window.confirm("Cancel this session? This can't be undone.")) return;
    setCancellingId(appointmentId);
    setActionError("");
    try {
      await api.patch(`/appointments/${appointmentId}/cancel`);
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === appointmentId ? { ...a, status: "cancelled" } : a,
        ),
      );
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
      setActionError("Couldn't cancel that session. Please try again.");
    } finally {
      setCancellingId(null);
    }
  }

  function openReschedule(appointment) {
    setRescheduleTarget(appointment);
    setNewDateTime(toDatetimeLocalValue(appointment.scheduledAt));
    setActionError("");
  }

  async function handleRescheduleSubmit(e) {
    e.preventDefault();
    if (!rescheduleTarget) return;
    setRescheduleSaving(true);
    setActionError("");
    try {
      const res = await api.patch(
        `/appointments/${rescheduleTarget._id}/reschedule`,
        {
          scheduledAt: new Date(newDateTime).toISOString(),
        },
      );
      const updated = res.data;
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === rescheduleTarget._id ? { ...a, ...updated } : a,
        ),
      );
      setRescheduleTarget(null);
    } catch (err) {
      console.error("Failed to reschedule appointment:", err);
      setActionError("Couldn't reschedule that session. Please try again.");
    } finally {
      setRescheduleSaving(false);
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
          Your Sessions
        </h1>
        <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
          Everything you've got booked, and everywhere you've been.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-surface-variant">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-2.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold border-b-2 -mb-px transition-colors ${
              activeFilter === key
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-on-surface"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {(error || actionError) && (
        <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error || actionError}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-lowest border border-surface-variant rounded-2xl">
          <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-4">
            {activeFilter === "upcoming" &&
              "You don't have any upcoming sessions."}
            {activeFilter === "past" && "You don't have any past sessions yet."}
            {activeFilter === "cancelled" && "No cancelled sessions."}
          </p>
          {activeFilter === "upcoming" && (
            <Link
              to="/therapists"
              className="inline-flex items-center gap-1.5 text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary hover:underline"
            >
              Find a therapist <ChevronRight size={14} />
            </Link>
          )}
        </div>
      ) : (
        <motion.ul
          className="flex flex-col gap-3"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {filtered.map((appt) => {
            const { date, time } = formatDateTime(appt.scheduledAt);
            const isUpcoming =
              ["booked", "confirmed"].includes(appt.status) &&
              new Date(appt.scheduledAt) >= now;

            return (
              <motion.li
                key={appt._id}
                variants={itemVariants}
                className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
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
                  <div className="min-w-0">
                    <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface truncate">
                      {appt.therapist?.name ?? "Your therapist"}
                    </p>
                    <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {time}
                      </span>
                      <span className="capitalize text-label-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {appt.status}
                      </span>
                    </p>
                  </div>
                </div>

                {isUpcoming && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/session/${appt._id}`}
                      className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold bg-primary text-on-primary px-4 py-2 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
                    >
                      Join
                    </Link>
                    <button
                      onClick={() => openReschedule(appt)}
                      className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface border border-surface-variant px-4 py-2 rounded-full hover:bg-surface-container transition-colors"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(appt._id)}
                      disabled={cancellingId === appt._id}
                      className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-error hover:bg-error-container px-3 py-2 rounded-full transition-colors disabled:opacity-50"
                    >
                      {cancellingId === appt._id ? "Cancelling…" : "Cancel"}
                    </button>
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      )}

      {/* Reschedule modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/50 px-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background">
                Reschedule Session
              </h2>
              <button
                onClick={() => setRescheduleTarget(null)}
                className="text-text-muted hover:text-on-surface"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-4">
              With {rescheduleTarget.therapist?.name ?? "your therapist"}
            </p>
            <form onSubmit={handleRescheduleSubmit}>
              <label
                htmlFor="reschedule-time"
                className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5"
              >
                New date & time
              </label>
              <input
                id="reschedule-time"
                type="datetime-local"
                required
                value={newDateTime}
                onChange={(e) => setNewDateTime(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-surface-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface mb-5"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRescheduleTarget(null)}
                  className="flex-1 py-3 rounded-full text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface border border-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rescheduleSaving}
                  className="flex-1 py-3 rounded-full text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-60"
                >
                  {rescheduleSaving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
