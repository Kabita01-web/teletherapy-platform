import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

/**
 * Polish pass on your latest version:
 *  - Swapped every hardcoded hex color (#172536, #2f705e, #e8d2b5, etc.)
 *    for the site's actual design tokens (on-background, primary,
 *    primary-container, secondary-container). The hex navy/teal palette
 *    was a one-off that would've clashed with every other page on the
 *    site, which all use the cream/green token system consistently.
 *  - "Find a Therapist" is now a real react-router Link to /therepist
 *    (the route used elsewhere on the site) instead of an inert button.
 *  - Removed the empty leftover "TRUST MESSAGE" motion.div — it had no
 *    content after the avatar row was stripped out, so it was just
 *    adding empty vertical space.
 *  - Added a slow, continuous background drift on top of the entrance
 *    scale-in, so the photo keeps a faint, ongoing sense of motion
 *    instead of going fully static once it settles.
 */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-center">
      {/* ========================================================= */}
      {/* BACKGROUND IMAGE                                           */}
      {/* ========================================================= */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=85&w=2200&auto=format&fit=crop"
          alt="Peaceful woman practicing mindfulness"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ========================================================= */}
      {/* OVERLAYS — on-background token, matches every other hero    */}
      {/* ========================================================= */}
      <div className="absolute inset-0 bg-on-background/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-on-background/90 via-on-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-on-background/20" />
      <div className="absolute top-1/4 right-[12%] w-72 h-72 rounded-full bg-secondary-container/15 blur-3xl" />

      {/* ========================================================= */}
      {/* CONTENT                                                    */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-20 pt-28 pb-20">
        <motion.div className="max-w-4xl" initial="hidden" animate="show" variants={containerVariants}>
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
            <span className="w-10 h-px bg-secondary-container" />
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-secondary-container">
              Your journey to inner balance
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-['Fraunces',serif] text-white font-medium tracking-tight leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[92px]"
          >
            Better Mind.
            <br />
            <span className="italic text-secondary-container">Better You.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-white/85 font-['Plus_Jakarta_Sans',sans-serif]"
          >
            Compassionate therapy that helps you navigate life's challenges, build resilience, and create a life that feels meaningful.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-9">
            <button
              id="hero-cta-primary"
              className="group flex items-center gap-3 rounded-full bg-primary px-7 md:px-8 py-4 font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-semibold text-on-primary shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-container hover:text-on-primary-container hover:shadow-2xl"
            >
              Start Your Journey
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={15} />
              </span>
            </button>

            <Link
              to="/therepist"
              id="hero-cta-secondary"
              className="group flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 md:px-8 py-4 font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-on-background"
            >
              Find a Therapist
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* TRUST FEATURES                                             */}
      {/* ========================================================= */}
      <div className="absolute z-20 bottom-8 left-1/2 w-[calc(100%-3rem)] max-w-5xl -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12"
        >
          {[
            { icon: ShieldCheck, title: 'Safe & Confidential', desc: 'Your privacy matters' },
            { icon: HeartHandshake, title: 'Compassionate Care', desc: 'Therapists who listen' },
            { icon: Sparkles, title: 'Personalized Support', desc: 'Care made for you' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                <Icon size={21} className="text-secondary-container" />
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs text-white/60 font-['Plus_Jakarta_Sans',sans-serif]">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* SCROLL INDICATOR                                           */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-6 md:right-10 bottom-36 hidden md:flex flex-col items-center gap-3 text-white/60"
      >
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] uppercase tracking-[0.25em] [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-white/40"
        />
      </motion.div>
    </section>
  );
}