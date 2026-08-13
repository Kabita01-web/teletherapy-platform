import { motion } from 'motion/react';
import { ClipboardList, UserSearch, Video, Repeat } from 'lucide-react';


const steps = [
  {
    number: '01',
    icon: ClipboardList,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Tell Us About Yourself',
    description:
      'Complete a short, confidential intake questionnaire about your current challenges, therapy preferences, and scheduling needs.',
  },
  {
    number: '02',
    icon: UserSearch,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Get Matched to a Therapist',
    description:
      'Our smart matching algorithm — backed by clinical expertise — pairs you with the ideal therapist within 24 hours.',
  },
  {
    number: '03',
    icon: Video,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-deep-earth',
    title: 'Begin Your First Session',
    description:
      'Connect via secure video, voice, or text chat. Your first session is an open conversation — no pressure, just presence.',
  },
  {
    number: '04',
    icon: Repeat,
    iconBg: 'bg-surface-container',
    iconColor: 'text-primary',
    title: 'Grow at Your Own Pace',
    description:
      'Continue weekly sessions, track your progress, and adjust your plan as you evolve — your journey, your timeline.',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface" id="how-it-works">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.15em]"
          >
            The Process
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-4 tracking-tight"
          >
            A Simple Path to <span className="italic text-primary">Healing</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Getting started is easier than you think. Four steps stand between you and meaningful change.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-surface-variant z-0" />

          {steps.map(({ number, icon: Icon, iconBg, iconColor, title, description }) => (
            <motion.div key={number} variants={itemVariants} className="flex flex-col items-center text-center relative z-10">
              {/* Step number + icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center shadow-sm border border-surface-variant`}>
                  <Icon size={26} className={iconColor} />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center leading-none">
                  {number.slice(1)}
                </span>
              </div>
              <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={itemVariants}
        >
          <button
            id="how-it-works-cta-btn"
            className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-10 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md"
          >
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}