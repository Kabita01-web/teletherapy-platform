import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  Globe,
  Video,
  Clock,
  User as UserIcon,
} from "lucide-react";
import api from "../api/axios";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TherapistDetail() {
  const { id } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        // Option 1: Try to fetch single therapist (if endpoint exists)
        try {
          const res = await api.get(`/therapists/${id}`);
          if (!cancelled) {
            setTherapist(res.data);
            return;
          }
        } catch (singleErr) {
          // If single endpoint fails, fallback to listing all therapists
          console.log(
            "Single therapist fetch failed, loading all therapists...",
          );
        }

        // Option 2: Fetch all therapists and find the matching one
        const res = await api.get("/therapists");
        const match = (res.data ?? []).find((t) => t._id === id);

        if (!cancelled) {
          if (match) {
            setTherapist(match);
          } else {
            setError("Couldn't find this therapist.");
          }
        }
      } catch (err) {
        console.error("Failed to load therapist:", err);
        if (!cancelled) setError("Couldn't load this therapist's profile.");
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
      <div className="max-w-[800px] mx-auto px-6 md:px-16 py-12">
        <div className="h-8 w-32 bg-surface-container-lowest border border-surface-variant rounded-lg animate-pulse mb-8" />
        <div className="h-64 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error || !therapist) {
    return (
      <div className="max-w-[800px] mx-auto px-6 md:px-16 py-12">
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

  const specialties = therapist.specialties?.length
    ? therapist.specialties
    : [];
  const languages = therapist.languages?.length
    ? therapist.languages
    : ["English"];
  const modality = therapist.modality?.length
    ? therapist.modality
    : ["video", "chat"];
  const bio =
    therapist.bio ||
    `Licensed therapist${specialties.length ? ` specializing in ${specialties.join(", ")}` : ""}.`;
  const credentials = therapist.credentials || "Licensed Therapist";
  const rating = therapist.rating || 4.5;
  const reviews = therapist.reviews || 0;
  const experience = therapist.experience || 0;

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-[800px] mx-auto px-6 md:px-16 py-12">
        <Link
          to="/therapists"
          className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Therapists
        </Link>

        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-surface-variant"
          >
            {therapist.photo ? (
              <img
                src={therapist.photo}
                alt={therapist.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-surface-container-lowest shadow-sm flex-shrink-0"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-surface-container-lowest shadow-sm flex-shrink-0">
                <UserIcon className="w-14 h-14 text-primary/60" />
              </div>
            )}

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
                {therapist.name}
              </h1>
              <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
                {credentials}
                {experience > 0 && ` · ${experience} years experience`}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-primary font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-body-sm">
                <Star size={15} className="fill-current" />
                <span>{rating}</span>
                <span className="text-text-muted font-normal">
                  ({reviews} reviews)
                </span>
              </div>

              <Link
                to={`/book/${therapist._id}`}
                className="inline-block mt-5 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md"
              >
                Book Session
              </Link>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background mb-3">
              About
            </h2>
            <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
              {bio}
            </p>
          </motion.div>

          {/* Specialties */}
          {specialties.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background mb-3">
                Specialties
              </h2>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 bg-secondary-container text-on-secondary-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Details grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Globe size={16} />
                <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold uppercase tracking-wide">
                  Languages
                </span>
              </div>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface">
                {languages.join(", ")}
              </p>
            </div>
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Video size={16} />
                <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold uppercase tracking-wide">
                  Session Types
                </span>
              </div>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface capitalize">
                {modality.join(", ")}
              </p>
            </div>
          </motion.div>

          {/* Availability */}
          {therapist.availability?.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background mb-3">
                Availability
              </h2>
              <div className="flex flex-col gap-2">
                {therapist.availability.map((slot, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-surface-container-lowest border border-surface-variant rounded-xl px-4 py-3"
                  >
                    <Clock size={15} className="text-primary flex-shrink-0" />
                    <span className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface">
                      <span className="font-semibold">{slot.day}</span> ·{" "}
                      {slot.startTime}–{slot.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
