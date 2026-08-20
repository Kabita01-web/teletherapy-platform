import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../api/axios";

function templateKeyFromName(name) {
  if (!name) return null;
  const normalized = name.toLowerCase().replace(/[\s-]/g, "");
  if (normalized.includes("phq")) return "phq9";
  if (normalized.includes("gad")) return "gad7";
  return null;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AssessmentDetail() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/assessments/${id}`);
        if (cancelled) return;
        setAssessment(res.data);

        const key = templateKeyFromName(res.data?.template);
        if (key) {
          try {
            const tRes = await api.get(`/assessments/templates/${key}`);
            if (!cancelled) setTemplate(tRes.data);
          } catch {
            // Non-fatal — falls back to showing raw responses without question text.
          }
        }
      } catch (err) {
        console.error("Failed to load assessment:", err);
        if (!cancelled) setError("Couldn't load this assessment.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const score = assessment?.responses
    ? Object.values(assessment.responses).reduce((sum, v) => sum + Number(v), 0)
    : null;

  return (
    <div className="max-w-[700px] mx-auto px-6 md:px-16 py-12">
      <Link
        to="/assessments"
        className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to Assessments
      </Link>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight mb-1">
              {assessment.template}
            </h1>
            <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
              Taken {formatDate(assessment.createdAt)}
              {score !== null && ` · Score: ${score}`}
            </p>
          </div>

          {assessment.therapistNotes && (
            <div className="mb-6 p-5 rounded-2xl bg-secondary-container/40 border border-secondary-container">
              <p className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-secondary-container uppercase tracking-wide mb-2">
                Therapist Notes
              </p>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-secondary-container">
                {assessment.therapistNotes}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {template
              ? template.questions.map((q) => {
                  const value = assessment.responses?.[q.id];
                  const optionLabel = template.options.find(
                    (o) => o.value === value,
                  )?.label;
                  return (
                    <div
                      key={q.id}
                      className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5"
                    >
                      <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-1.5">
                        {q.question}
                      </p>
                      <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-primary font-medium">
                        {optionLabel ?? `Response: ${value}`}
                      </p>
                    </div>
                  );
                })
              : // Fallback if the template couldn't be matched/loaded — show raw responses.
                Object.entries(assessment.responses ?? {}).map(
                  ([qId, value]) => (
                    <div
                      key={qId}
                      className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-5"
                    >
                      <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                        Question {qId}:{" "}
                        <span className="text-on-surface font-medium">
                          {value}
                        </span>
                      </p>
                    </div>
                  ),
                )}
          </div>
        </>
      )}
    </div>
  );
}
