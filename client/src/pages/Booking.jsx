import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import api from "../api/axios";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAYS_AHEAD = 14;

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
}

function generateUpcomingSlots(availability) {
  const slots = [];
  const now = new Date();

  for (let offset = 0; offset < DAYS_AHEAD; offset++) {
    const date = new Date(now);
    date.setDate(date.getDate() + offset);
    const dayName = dayNames[date.getDay()];

    availability
      .filter((a) => a.day === dayName)
      .forEach((a) => {
        const slotDate = new Date(date);
        const [h, m] = a.startTime.split(":").map(Number);
        slotDate.setHours(h, m || 0, 0, 0);

        if (slotDate > now) {
          const duration =
            parseTimeToMinutes(a.endTime) - parseTimeToMinutes(a.startTime);
          slots.push({
            date: slotDate,
            duration: duration > 0 ? duration : 50,
            raw: a,
          });
        }
      });
  }

  return slots.sort((a, b) => a.date - b.date);
}

function formatSlot(date) {
  return {
    day: date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

export default function Booking() {
  const { id } = useParams();

  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/therapists/${id}`);
        if (!cancelled) {
          setTherapist(res.data);
          const modalities = res.data.modality?.length
            ? res.data.modality
            : ["video", "chat"];
          setSelectedModality(modalities[0]);
        }
      } catch (err) {
        console.error("Failed to load therapist:", err);
        if (!cancelled) setError("Couldn't load this therapist.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);
  async function handleConfirm() {
    if (!selectedSlot || !selectedModality) return;
    setBooking(true);
    setBookError("");

    const payload = {
      therapistId: id,
      scheduledAt: selectedSlot.date.toISOString(),
      duration: selectedSlot.duration,
      modality: selectedModality,
    };

    console.log("📤 Sending payload:", payload); // ✅ Log what's being sent

    try {
      const response = await api.post("/appointments", payload);
      console.log("✅ Response:", response.data);
      setConfirmed(true);
    } catch (err) {
      console.error("❌ Full error:", err);
      console.error("❌ Error response data:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
      setBookError(
        err.response?.data?.message ||
          "Couldn't book that session. Please try a different time or try again.",
      );
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-[700px] mx-auto px-6 md:px-16 py-12">
        <div className="h-8 w-32 bg-surface-container-lowest border border-surface-variant rounded-lg animate-pulse mb-8" />
        <div className="h-96 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !therapist) {
    return (
      <div className="max-w-[700px] mx-auto px-6 md:px-16 py-12">
        <Link
          to="/therapists"
          className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Therapists
        </Link>
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error || "Therapist not found."}
        </div>
      </div>
    );
  }

  if (confirmed) {
    const { day, time } = formatSlot(selectedSlot.date);
    return (
      <div className="max-w-[600px] mx-auto px-6 md:px-16 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={28} className="text-primary" />
          </div>
          <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-3 tracking-tight">
            You're booked.
          </h1>
          <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-8">
            {day} at {time} with {therapist.name}.
          </p>
          <Link
            to="/sessions"
            className="inline-block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-3.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            View My Sessions
          </Link>
        </motion.div>
      </div>
    );
  }

  const modalities = therapist.modality?.length
    ? therapist.modality
    : ["video", "chat"];
  const slots = generateUpcomingSlots(therapist.availability ?? []);

  return (
    <div className="max-w-[700px] mx-auto px-6 md:px-16 py-12">
      <Link
        to={`/therapists/${id}`}
        className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to Profile
      </Link>

      <div className="mb-8">
        <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
          Book with {therapist.name}
        </h1>
        <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
          Pick a time that works for you.
        </p>
      </div>

      {/* Modality */}
      {modalities.length > 1 && (
        <div className="mb-8">
          <h2 className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-3">
            Session Type
          </h2>
          <div className="flex gap-2">
            {modalities.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModality(m)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold capitalize transition-colors ${
                  selectedModality === m
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-lowest border border-surface-variant text-text-muted hover:bg-surface-container"
                }`}
              >
                {m === "video" ? (
                  <Video size={15} />
                ) : (
                  <MessageCircle size={15} />
                )}
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slots */}
      <div className="mb-8">
        <h2 className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-3">
          Available Times
        </h2>

        {slots.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest border border-surface-variant rounded-2xl">
            <Calendar size={24} className="text-text-muted mx-auto mb-3" />
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
              No availability found in the next two weeks.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {slots.map((slot, i) => {
              const { day, time } = formatSlot(slot.date);
              const isSelected =
                selectedSlot?.date.getTime() === slot.date.getTime();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex flex-col items-start gap-1 px-4 py-3 rounded-xl border text-left transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-surface-variant bg-surface-container-lowest hover:bg-surface-container"
                  }`}
                >
                  <span
                    className={`text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold ${isSelected ? "text-primary" : "text-on-surface"}`}
                  >
                    {day}
                  </span>
                  <span className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted flex items-center gap-1">
                    <Clock size={11} /> {time}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {bookError && (
        <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {bookError}
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={!selectedSlot || booking}
        className="w-full sm:w-auto font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md"
      >
        {booking
          ? "Booking…"
          : selectedSlot
            ? `Confirm ${formatSlot(selectedSlot.date).day} at ${formatSlot(selectedSlot.date).time}`
            : "Select a time"}
      </button>
    </div>
  );
}
