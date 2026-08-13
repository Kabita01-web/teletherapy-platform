import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Typography: matches the rest of the site — Fraunces for the headline
 * (with the italic accent used elsewhere), Plus Jakarta Sans for body/UI
 * text. Fonts load once, globally (see TrustFeatures.jsx for the <link> tags).
 *
 * Motion: `motion` package. This is a below-the-fold closing section, so
 * it uses whileInView, same as Services/TrustFeatures/About/HowItWorks.
 */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0 bg-primary -z-10" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary-container/20 to-transparent -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-12 right-12 w-64 h-64 rounded-full bg-secondary/20 blur-3xl -z-10 animate-[spin_24s_linear_infinite]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full mb-8 text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold backdrop-blur-sm"
          >
            <Sparkles size={14} />
            <span>Your healing begins with one decision</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-headline-xl font-['Fraunces',serif] font-medium text-on-primary mb-6 leading-tight tracking-tight"
          >
            You Deserve to<br />
            <span className="italic">Feel Better</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-on-primary/80 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Reaching out takes courage — and we honour that. Join thousands who chose to invest in themselves and found clarity, connection, and calm on the other side.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              id="cta-start-btn"
              className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-on-primary text-primary px-10 py-4 rounded-full hover:bg-primary-fixed hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
            >
              Get Matched — It's Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              id="cta-demo-btn"
              className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md border border-white/30 text-on-primary px-10 py-4 rounded-full hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
            >
              Learn How It Works
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-on-primary/70 text-body-sm font-['Plus_Jakarta_Sans',sans-serif]"
          >
            {[
              '✓ No credit card required',
              '✓ Cancel anytime',
              '✓ Matched in under 24 hours',
              '✓ 100% confidential',
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}