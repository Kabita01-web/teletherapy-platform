import { motion } from 'motion/react';
import { ArrowRight, Shield, UserCheck, TrendingUp, Quote, Star } from 'lucide-react';

/**
 * Typography: matches Services.jsx / TrustFeatures.jsx —
 *   Display / headings → "Fraunces" (warm, humanist serif)
 *   Body / UI text     → "Plus Jakarta Sans"
 * Fonts are loaded once, globally — see TrustFeatures.jsx for the <link> tags.
 *
 * Motion: `motion` package (https://motion.dev). Install with `npm install motion`.
 * The Hero sits above the fold, so it animates in on load (initial/animate),
 * not on scroll (whileInView) — that's why this differs slightly from the
 * scroll-triggered pattern used in Services/TrustFeatures.
 */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const popVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-container-low -z-10 bg-noise" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-container/30 to-transparent -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10 animate-[spin_22s_linear_infinite]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-secondary-container/20 blur-3xl -z-10 animate-pulse" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          className="max-w-xl"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-5">
            <span className="w-6 h-px bg-primary" />
            <span className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary uppercase tracking-[0.15em]">
              You don't have to do it alone
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-headline-xl font-['Fraunces',serif] font-medium text-on-background mb-6 leading-tight tracking-tight"
          >
            Better Mind.<br />
            <span className="italic text-primary">Better You.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-8 leading-relaxed"
          >
            Compassionate therapy to help you overcome challenges, build resilience, and create a life that feels meaningful.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mb-12">
            <button
              id="hero-cta-primary"
              className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
            >
              Book a Session
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              id="hero-cta-secondary"
              className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md text-on-background hover:text-primary transition-colors flex items-center justify-center gap-1.5 group"
            >
              Learn More
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-8">
            {[
              { icon: Shield, label: 'Confidential & Safe' },
              { icon: UserCheck, label: 'Personalized Approach' },
              { icon: TrendingUp, label: 'Support for Long Lasting Change' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2 max-w-[100px] group cursor-default">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                  <Icon size={20} className="text-on-secondary-container" />
                </div>
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Hero Image */}
        <div className="relative hidden md:block h-[520px]">
          <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-secondary-container/60 -z-10 animate-[bounce_9s_ease-in-out_infinite]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/10 -z-10 blur-2xl animate-pulse" />

          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl h-full group"
            initial="hidden"
            animate="show"
            variants={popVariants}
            transition={{ delay: 0.15 }}
          >
            <img
              src="https://images.unsplash.com/photo-1714976694895-d38078c1a3c0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A calm, modern teletherapy session — a person talking warmly through a video call from a serene home environment"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/25 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
          </motion.div>

          {/* Floating rating / trust chip */}
          <motion.div
            className="absolute top-6 -left-6 bg-surface rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2"
            initial="hidden"
            animate="show"
            variants={popVariants}
            transition={{ delay: 0.45 }}
          >
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <Star key={i} size={14} className="text-primary" fill="currentColor" />
              ))}
            </div>
            <span className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface">Licensed, caring therapists</span>
          </motion.div>

          {/* Floating quote card */}
          <motion.div
            className="absolute bottom-8 -right-6 bg-surface rounded-2xl p-5 shadow-lg max-w-[220px] hover:-translate-y-1 transition-transform duration-300"
            initial="hidden"
            animate="show"
            variants={popVariants}
            transition={{ delay: 0.6 }}
          >
            <Quote size={20} className="text-primary mb-2" fill="currentColor" />
            <p className="text-body-sm font-['Fraunces',serif] italic text-on-surface leading-snug">
              Healing takes time, and asking for help is a courageous step.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}