import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import api from "../../api/axios";

function buildResponsesPayload(responses) {
  return responses;
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

export default function AssessmentForm() {
  const { templateKey } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null); // { score, template }

  useEffect(() => {
    let cancelled = false;
    async function loadTemplate() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/assessments/templates/${templateKey}`);
        if (!cancelled) setTemplate(res.data);
      } catch (err) {
        console.error("Failed to load assessment template:", err);
        if (!cancelled)
          setError(
            "Couldn't load this assessment. Please go back and try again.",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadTemplate();
    return () => {
      cancelled = true;
    };
  }, [templateKey]);

  const totalQuestions = template?.questions?.length ?? 0;
  const answeredCount = Object.keys(responses).length;
  const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  function selectAnswer(questionId, value) {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!allAnswered || !template) return;

    setSubmitting(true);
    setError("");
    try {
      await api.post("/assessments", {
        template: template.template,
        responses: buildResponsesPayload(responses),
      });

      const score = Object.values(responses).reduce(
        (sum, v) => sum + Number(v),
        0,
      );
      setSubmitted({ score, template: template.template });
    } catch (err) {
      console.error("Failed to submit assessment:", err);
      setError("Couldn't submit your assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
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
            Thanks for sharing.
          </h1>
          <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-2">
            Your {submitted.template} responses have been recorded and shared
            with your care team.
          </p>
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-8">
            Score: {submitted.score}
          </p>
          <Link
            to="/assessments"
            className="inline-block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-3.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            Back to Assessments
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-6 md:px-16 py-12">
      <Link
        to="/assessments"
        className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back
      </Link>

      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-24 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : error && !template ? (
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight mb-2">
              {template.template}
            </h1>
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
              Over the last 2 weeks, how often have you been bothered by the
              following?
            </p>
            {/* Progress */}
            <div className="mt-4 h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{
                  width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%`,
                }}
              />
            </div>
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1.5">
              {answeredCount} of {totalQuestions} answered
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
              {error}
            </div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="flex flex-col gap-6"
          >
            {template.questions.map((q, index) => (
              <motion.div
                key={q.id}
                variants={itemVariants}
                className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-6"
              >
                <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-4">
                  {index + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {template.options.map((opt) => {
                    const isSelected = responses[q.id] === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => selectAnswer(q.id, opt.value)}
                        className={`text-left px-4 py-2.5 rounded-xl border text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-surface-variant text-text-muted hover:bg-surface-container"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={!allAnswered || submitting}
              className="mt-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md"
            >
              {submitting ? "Submitting…" : "Submit"}
            </motion.button>
          </motion.form>
        </>
      )}
    </div>
  );
}
