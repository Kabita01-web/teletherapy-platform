import { motion } from 'motion/react';
import { ShieldCheck, Brain, Clock, Globe } from 'lucide-react';


const features = [
  {
    icon: ShieldCheck,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    ringColor: 'group-hover:ring-primary/25',
    title: 'Confidential & Safe',
    description:
      'Your privacy is paramount. Our platform employs enterprise-grade encryption to ensure your sessions remain entirely secure and private.',
  },
  {
    icon: Brain,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    ringColor: 'group-hover:ring-secondary/25',
    title: 'Personalised Approach',
    description:
      'No two journeys are the same. We match you with therapists who tailor their evidence-based methods to your specific needs.',
  },
  {
    icon: Clock,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-deep-earth',
    ringColor: 'group-hover:ring-deep-earth/25',
    title: 'Flexible Scheduling',
    description:
      'Book sessions that fit your life — evenings, weekends, or lunch breaks. Therapy on your terms, whenever you need it most.',
  },
  {
    icon: Globe,
    iconBg: 'bg-surface-container',
    iconColor: 'text-primary',
    ringColor: 'group-hover:ring-primary/25',
    title: 'Connect from Anywhere',
    description:
      'Access world-class therapy from the comfort of your home, office, or anywhere with an internet connection.',
  },
];

// Parent controls the stagger; children just declare their own "hidden" -> "show" states.
const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TrustFeatures() {
  return (
    <section className="py-24 bg-surface relative z-10" id="trust">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={gridVariants}
        >
          <motion.span
            variants={cardVariants}
            className="inline-block text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-5 uppercase tracking-[0.15em]"
          >
            Why Inner Balance
          </motion.span>
          <motion.h2
            variants={cardVariants}
            className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-4 tracking-tight"
          >
            A Space Designed for{' '}
            <span className="italic text-primary">Healing</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Every feature is built with your well-being in mind — from first contact to lasting transformation.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {features.map(({ icon: Icon, iconBg, iconColor, ringColor, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-variant flex flex-col gap-5 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Accent line that grows in on hover — the section's signature detail */}
              <span className="absolute top-0 left-0 h-[3px] w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />

              <div
                className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 ring-4 ring-transparent ${ringColor} transition-all duration-300 group-hover:scale-105`}
              >
                <Icon size={24} className={iconColor} strokeWidth={1.75} />
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}