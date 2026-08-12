import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Typography: matches Hero.jsx / Services.jsx / TrustFeatures.jsx —
 *   Display / headings → "Fraunces" (warm, humanist serif)
 *   Body / UI text     → "Plus Jakarta Sans"
 * Fonts are loaded once, globally — see TrustFeatures.jsx for the <link> tags.
 *
 * Motion: `motion` package (https://motion.dev). This section is below the
 * fold, so it uses whileInView (scroll-triggered), same as Services/TrustFeatures.
 */

const highlights = [
  'Over 500 licensed, vetted therapists across 30+ specialities',
  'Evidence-based approaches: CBT, DBT, EMDR, Mindfulness & more',
  'Fully HIPAA-compliant platform with bank-level encryption',
  'Matching within 24 hours — start your journey without delay',
  'Sliding scale pricing so care is accessible to everyone',
];

const imageColVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const popVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const textColVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="about">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-surface-container-low to-transparent -z-0 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <motion.div
            className="relative hidden md:block"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={imageColVariants}
          >
            <motion.div variants={popVariants} className="rounded-3xl overflow-hidden shadow-xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=80"
                alt="A warm, professional therapist in a modern office setting"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              variants={popVariants}
              transition={{ delay: 0.25 }}
              className="absolute -bottom-6 -right-6 bg-primary text-on-primary rounded-2xl px-6 py-5 shadow-xl"
            >
              <p className="text-[36px] font-['Fraunces',serif] leading-none font-semibold">98%</p>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-primary/80 mt-1">
                Client satisfaction rate
              </p>
            </motion.div>

            {/* Small accent card */}
            <motion.div
              variants={popVariants}
              transition={{ delay: 0.4 }}
              className="absolute top-6 -left-6 bg-secondary-container rounded-2xl px-5 py-4 shadow-lg"
            >
              <p className="text-label-md font-['Plus_Jakarta_Sans',sans-serif] text-on-secondary-container text-sm font-semibold">
                🏆 Award-Winning
              </p>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-secondary-container/80 text-xs mt-0.5">
                Best Teletherapy Platform 2024
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={textColVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.15em]"
            >
              About Us
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-5 tracking-tight"
            >
              Healing Meets <span className="italic text-primary">Modern Care</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-6 leading-relaxed"
            >
              Inner Balance was founded on a simple belief: everyone deserves access to quality mental health support — wherever they are, whenever they need it. We blend clinical excellence with genuine human warmth.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted mb-8 leading-relaxed"
            >
              Our rigorous therapist vetting process, paired with a platform built specifically for emotional safety, makes us the most trusted name in online therapy.
            </motion.p>

            {/* Highlights list */}
            <motion.ul variants={itemVariants} className="flex flex-col gap-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-on-surface">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants}>
              <Link
                id="about-learn-more-btn"
                to="/about"
                className="inline-block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-3.5 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}