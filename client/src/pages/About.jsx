import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Brain, Heart } from 'lucide-react';

/**
 * About page — a simple mission hero, a four-pillar "why us" bento grid,
 * and a team section. Deliberately smaller and quieter than the homepage —
 * this page's job is to explain who you are and why you exist, not to
 * sell/convert like Hero/Services do. Same type system as the rest of the
 * site (Fraunces for headings, Plus Jakarta Sans for body/UI).
 *
 * Team photos/names below are placeholders — swap in your actual team's
 * photos and titles before shipping; don't ship invented staff bios.
 */

const missionHero = {
  eyebrow: 'Our Purpose',
  headingLine1: 'Our Mission: Your',
  headingAccent: 'Mental Wellness',
  body: "We believe that finding a safe, professional, and empathetic space to explore your mental health should be accessible to everyone. Inner Balance bridges the gap between you and expert care.",
  ctaLabel: 'Start Your Journey',
  ctaTo: '/therepist',
  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&auto=format&fit=crop&q=80',
};

const whyCards = [
  {
    icon: Globe,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Unmatched Accessibility',
    description: 'Connect with licensed professionals from the comfort of your own space. Our flexible scheduling and intuitive platform mean support is available when you need it most, breaking down geographical and time barriers.',
    size: 'sm',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Absolute Privacy',
    description: 'Your trust is our foundation. We employ bank-level encryption and strictly adhere to HIPAA guidelines to ensure your sessions and data remain completely confidential.',
    size: 'sm',
  },
  {
    icon: Brain,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-deep-earth',
    title: 'Expert Care',
    description: 'Every therapist on our platform is rigorously vetted, licensed, and specialized in various modalities to provide tailored, evidence-based care.',
    size: 'sm',
  },
  {
    icon: Heart,
    iconBg: 'bg-surface',
    iconColor: 'text-primary',
    title: 'Empathetic Approach',
    description: "We move beyond clinical coldness. Our interface and our practitioners are dedicated to creating a warm, human-centric experience that prioritizes your emotional safety and mental clarity.",
    size: 'lg',
  },
];

const team = {
  eyebrow: 'Meet Our Team',
  subtitle: 'Dedicated professionals guiding our therapeutic approach.',
  members: [
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Chief Clinical Officer',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Marcus Chen',
      role: 'Head of Adult Therapy',
      photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Elena Rodriguez, LCSW',
      role: 'Lead Family Counselor',
      photo: 'https://images.unsplash.com/photo-1573166364566-a5d9b1cf8ef2?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Taylor Brooks, PhD',
      role: 'Specialist in Anxiety',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    },
  ],
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* ================================================================ */}
      {/* MISSION HERO                                                      */}
      {/* ================================================================ */}
      <section className="bg-surface-container-low bg-noise py-24 px-6 md:px-16" id="mission-hero">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate="show" variants={containerVariants}>
            <motion.span
              variants={itemVariants}
              className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.15em]"
            >
              {missionHero.eyebrow}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-headline-xl font-['Fraunces',serif] font-medium text-on-background mb-6 tracking-tight leading-[1.15]"
            >
              {missionHero.headingLine1}{' '}
              <span className="italic text-primary">{missionHero.headingAccent}</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed mb-8 max-w-md"
            >
              {missionHero.body}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to={missionHero.ctaTo}
                className="inline-block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-label-md bg-primary text-on-primary px-8 py-3.5 rounded-full hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md"
              >
                {missionHero.ctaLabel}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden shadow-xl h-[360px] md:h-[440px]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <img
              src={missionHero.image}
              alt="A warm group therapy conversation in a comfortable living-room setting"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHY INNER BALANCE — bento grid                                    */}
      {/* ================================================================ */}
      <section className="py-24 px-6 md:px-16" id="why-us">
        <div className="max-w-[1000px] mx-auto text-center mb-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-4 tracking-tight">
              Why Inner Balance
            </motion.h2>
            <motion.p variants={itemVariants} className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted max-w-2xl mx-auto leading-relaxed">
              We've built our platform around the core pillars of effective, modern teletherapy to ensure you feel supported every step of the way.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {whyCards.map(({ icon: Icon, iconBg, iconColor, title, description, size }) => {
            const isLarge = size === 'lg';
            return (
              <motion.div
                key={title}
                variants={itemVariants}
                className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isLarge
                    ? 'bg-secondary-container/40 border-secondary-container md:col-span-1'
                    : 'bg-surface-container-lowest border-surface-variant shadow-sm'
                }`}
              >
                <div className={`w-11 h-11 ${iconBg} rounded-full flex items-center justify-center mb-6`}>
                  <Icon size={20} className={iconColor} strokeWidth={1.75} />
                </div>
                <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* TEAM                                                              */}
      {/* ================================================================ */}
      <section className="py-24 px-6 md:px-16 bg-surface-container-low bg-noise" id="team">
        <div className="max-w-[1000px] mx-auto text-center mb-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={containerVariants}>
            <motion.span
              variants={itemVariants}
              className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.15em]"
            >
              {team.eyebrow}
            </motion.span>
            <motion.p variants={itemVariants} className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
              {team.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {team.members.map(({ name, role, photo }) => (
            <motion.div key={name} variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-4 ring-4 ring-surface">
                <img src={photo} alt={name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-body-md font-['Fraunces',serif] font-medium text-on-background">{name}</h3>
              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary mt-0.5">{role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}