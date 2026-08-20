import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ClipboardList, Brain, Heart, ChevronRight } from "lucide-react";
import api from "../../api/axios";

const templates = [
  {
    key: "phq9",
    name: "PHQ-9",
    label: "Depression Screening",
    description:
      "A 9-question screen for how you've been feeling over the past two weeks.",
    icon: Brain,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    key: "gad7",
    name: "GAD-7",
    label: "Anxiety Screening",
    description:
      "A 7-question screen for anxiety and worry over the past two weeks.",
    icon: Heart,
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
  },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/assessments");
        if (!cancelled) setAssessments(res.data ?? []);
      } catch (err) {
        console.error("Failed to load assessments:", err);
        if (!cancelled) setError("Could not load your assessments right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = [...assessments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
          Assessments
        </h1>
        <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
          Short, confidential check-ins that help your therapist understand how
          you're doing.
        </p>
      </div>

      {/* Start a new one */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {templates.map(
          ({
            key,
            name,
            label,
            description,
            icon: Icon,
            iconBg,
            iconColor,
          }) => (
            <Link
              key={key}
              to={`/assessments/take/${key}`}
              className="group bg-surface-container-lowest border border-surface-variant rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`w-11 h-11 ${iconBg} rounded-full flex items-center justify-center mb-4`}
              >
                <Icon size={20} className={iconColor} />
              </div>
              <h3 className="text-body-lg font-['Fraunces',serif] font-medium text-on-surface mb-1">
                {name}{" "}
                <span className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-normal text-text-muted">
                  — {label}
                </span>
              </h3>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed mb-4">
                {description}
              </p>
              <span className="inline-flex items-center gap-1 text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary">
                Start{" "}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </span>
            </Link>
          ),
        )}
      </div>

      {/* History */}
      <h2 className="text-body-lg font-['Fraunces',serif] font-medium text-on-background mb-4">
        History
      </h2>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-16 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-lowest border border-surface-variant rounded-2xl">
          <ClipboardList size={26} className="text-text-muted mx-auto mb-3" />
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
            You haven't taken an assessment yet.
          </p>
        </div>
      ) : (
        <motion.ul
          className="flex flex-col gap-3"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {sorted.map((a) => (
            <motion.li key={a._id} variants={itemVariants}>
              <Link
                to={`/assessments/${a._id}`}
                className="flex items-center justify-between gap-4 bg-surface-container-lowest border border-surface-variant rounded-2xl px-5 py-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ClipboardList size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface truncate">
                      {a.template}
                    </p>
                    <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                      Taken {formatDate(a.createdAt)}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="text-text-muted flex-shrink-0"
                />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
