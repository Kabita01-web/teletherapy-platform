import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import api from "../../api/axios";

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // In AssessmentDetail.jsx, update the template fetch:
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/assessments/${id}`);
        if (cancelled) return;
        setAssessment(res.data);

        // Fetch template based on template name
        const templateName = res.data?.template?.toLowerCase();
        if (templateName) {
          try {
            // PHQ-9 or GAD-7
            const key = templateName.includes("phq") ? "phq9" : "gad7";
            const tRes = await api.get(`/assessments/templates/${key}`);
            if (!cancelled) setTemplate(tRes.data);
          } catch {
            // Non-fatal
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
  return (
    <div className="max-w-[700px] mx-auto px-6 md:px-16 py-12">
      <Link
        to="/resources"
        className="inline-flex items-center gap-1.5 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to Resources
      </Link>

      {loading ? (
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-surface-container-lowest border border-surface-variant rounded-lg animate-pulse" />
          <div className="h-40 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse" />
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error}
        </div>
      ) : resource ? (
        <>
          <div className="w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center mb-5">
            <BookOpen size={19} className="text-on-secondary-container" />
          </div>
          {resource.category && (
            <span className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container/50 px-3 py-1 rounded-full mb-4 capitalize">
              {resource.category}
            </span>
          )}
          <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight mb-6">
            {resource.title}
          </h1>
          {resource.type && (
            <span className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-text-muted mb-4">
              Type: {resource.type}
            </span>
          )}
          <div className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-on-surface leading-relaxed whitespace-pre-line">
            {resource.content}
          </div>
          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif] bg-surface-container-lowest border border-surface-variant px-3 py-1 rounded-full text-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
