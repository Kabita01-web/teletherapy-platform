import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen, Search } from "lucide-react";
import api from "../../api/axios";

function excerpt(content, length = 140) {
  if (!content) return "";
  return content.length > length
    ? `${content.slice(0, length).trim()}…`
    : content;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/resources");
        if (!cancelled) {
          // Transform backend data to match frontend expectations
          const transformedResources = (res.data ?? []).map((resource) => ({
            ...resource,
            // Map backend fields to frontend fields
            topic: resource.category,
            body: resource.content,
            // Keep original fields for reference
            _id: resource._id,
            title: resource.title,
            description: resource.description,
            content: resource.content,
            category: resource.category,
            type: resource.type,
            tags: resource.tags,
            author: resource.author,
            assignedTo: resource.assignedTo,
            isPublished: resource.isPublished,
            readBy: resource.readBy,
            downloads: resource.downloads,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
          }));
          setResources(transformedResources);
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
        if (!cancelled) setError("Could not load resources right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Get unique categories from resources
  const categories = Array.from(
    new Set(resources.map((r) => r.category).filter(Boolean)),
  );

  const filtered = resources.filter((r) => {
    const matchesCategory =
      activeCategory === "all" || r.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      r.title?.toLowerCase().includes(q) ||
      r.content?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-16 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
          Resources
        </h1>
        <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mt-1">
          Articles and exercises to support you between sessions.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search resources…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-surface-variant rounded-xl outline-none text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest border border-surface-variant text-text-muted hover:bg-surface-container"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold capitalize transition-colors ${
                activeCategory === category
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest border border-surface-variant text-text-muted hover:bg-surface-container"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
          {error}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-surface-container-lowest border border-surface-variant rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-lowest border border-surface-variant rounded-2xl">
          <BookOpen size={26} className="text-text-muted mx-auto mb-3" />
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
            {resources.length === 0
              ? "No resources available yet."
              : "No resources match your search."}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {filtered.map((r) => (
            <motion.div key={r._id} variants={itemVariants}>
              <Link
                to={`/resources/${r._id}`}
                className="group flex flex-col h-full bg-surface-container-lowest border border-surface-variant rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center mb-4 flex-shrink-0">
                  <BookOpen size={17} className="text-on-secondary-container" />
                </div>
                {r.category && (
                  <span className="inline-block w-fit text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container/50 px-3 py-1 rounded-full mb-3 capitalize">
                    {r.category}
                  </span>
                )}
                <h3 className="text-body-lg font-['Fraunces',serif] font-medium text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
                  {excerpt(r.content)}
                </p>
                {r.type && (
                  <span className="mt-3 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                    {r.type}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
