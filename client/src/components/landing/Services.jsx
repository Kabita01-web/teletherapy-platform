import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  HeartHandshake,
  Users,
  Stethoscope,
  Smile,
  Wind,
  Moon,
} from "lucide-react";

const services = [
  {
    icon: HeartHandshake,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    ringColor: "group-hover:ring-primary/25",
    title: "Anxiety & Stress",
    description:
      "Learn practical tools to calm your nervous system and reclaim your peace of mind.",
    tag: "Most Requested",
    tagStyle: "bg-primary-fixed text-primary",
  },
  {
    icon: Moon,
    iconBg: "bg-surface-container",
    iconColor: "text-primary",
    ringColor: "group-hover:ring-primary/25",
    title: "Depression & Mood",
    description:
      "Find warmth and clarity with compassionate therapy tailored to lift you forward.",
    tag: null,
    tagStyle: "",
  },
  {
    icon: Users,
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    ringColor: "group-hover:ring-secondary/25",
    title: "Relationships & Couples",
    description:
      "Strengthen connection, improve communication, and heal together with guided support.",
    tag: null,
    tagStyle: "",
  },
  {
    icon: Stethoscope,
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-deep-earth",
    ringColor: "group-hover:ring-deep-earth/25",
    title: "Trauma & PTSD",
    description:
      "Gently process difficult experiences in a safe, evidence-based therapeutic environment.",
    tag: null,
    tagStyle: "",
  },
  {
    icon: Smile,
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    ringColor: "group-hover:ring-secondary/25",
    title: "Self-Esteem & Identity",
    description:
      "Explore who you are with curiosity and compassion, building lasting confidence.",
    tag: null,
    tagStyle: "",
  },
  {
    icon: Wind,
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
    ringColor: "group-hover:ring-primary/25",
    title: "Grief & Life Transitions",
    description:
      "Navigate loss, change, and new beginnings with steady, empathetic guidance.",
    tag: null,
    tagStyle: "",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Services() {
  return (
    <section
      className="py-24 bg-surface-container-low bg-noise relative"
      id="services"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <div>
            <motion.span
              variants={itemVariants}
              className="inline-block text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.15em]"
            >
              What We Treat
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-3 tracking-tight"
            >
              Support for Life's{" "}
              <span className="italic text-primary">Challenges</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted max-w-xl leading-relaxed"
            >
              Whether you're facing a specific struggle or simply seeking
              growth, our therapists are here for every chapter.
            </motion.p>
          </div>
          <motion.div variants={itemVariants}>
            <Link
              id="services-view-all-btn"
              to="/therapists"
              className="flex-shrink-0 flex items-center gap-2 text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary hover:text-primary-container transition-colors group"
            >
              View all specialities
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {services.map(
            ({
              icon: Icon,
              iconBg,
              iconColor,
              ringColor,
              title,
              description,
              tag,
              tagStyle,
            }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="group relative bg-surface-container-lowest p-7 rounded-2xl border border-surface-variant shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col gap-5 overflow-hidden"
              >
                {/* Accent line — same signature detail as TrustFeatures, for visual consistency across sections */}
                <span className="absolute top-0 left-0 h-[3px] w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />

                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center ring-4 ring-transparent ${ringColor} transition-all duration-300 group-hover:scale-105`}
                  >
                    <Icon size={20} className={iconColor} strokeWidth={1.75} />
                  </div>
                  {tag && (
                    <span
                      className={`text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold px-3 py-1 rounded-full ${tagStyle}`}
                    >
                      {tag}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-2 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
