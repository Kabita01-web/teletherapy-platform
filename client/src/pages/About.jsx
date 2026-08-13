import { motion } from 'motion/react';
import { Globe, ShieldCheck, Brain, Heart } from 'lucide-react';

const missionHero = {
  headingLine1: 'Our Mission: Your',
  headingAccent: 'Mental Wellness',
  body: 'We believe that finding a safe, professional, and empathetic space to explore your mental health should be accessible to everyone. Inner Balance bridges the gap between you and expert care.',
  image:
    'https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg',
};

const whyCards = [
  {
    icon: Globe,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Unmatched Accessibility',
    description:
      'Connect with licensed professionals from the comfort of your own space. Our flexible scheduling and intuitive platform mean support is available when you need it most, breaking down geographical and time barriers.',
    size: 'sm',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Absolute Privacy',
    description:
      'Your trust is our foundation. We employ bank-level encryption and strictly adhere to HIPAA guidelines to ensure your sessions and data remain completely confidential.',
    size: 'sm',
  },
  {
    icon: Brain,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-deep-earth',
    title: 'Expert Care',
    description:
      'Every therapist on our platform is rigorously vetted, licensed, and specialized in various modalities to provide tailored, evidence-based care.',
    size: 'sm',
  },
  {
    icon: Heart,
    iconBg: 'bg-surface',
    iconColor: 'text-primary',
    title: 'Empathetic Approach',
    description:
      'We move beyond clinical coldness. Our interface and our practitioners are dedicated to creating a warm, human-centric experience that prioritizes your emotional safety and mental clarity.',
    size: 'lg',
  },
];

const mosaic = {
  eyebrow: 'A Look Inside',
  heading: 'Care, Wherever You Are',
  body: "Whether it's a scheduled video session or a quiet moment of reflection between appointments, every part of Inner Balance is built around real, unhurried connection.",
  photos: [
    {
      src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&auto=format&fit=crop&q=80',
      alt: 'A calm, softly lit therapy room with two chairs facing each other',
      span: 'col-span-2 row-span-2',
    },
    {
      src: 'https://images.unsplash.com/photo-1590650046871-92c887180603?w=500&auto=format&fit=crop&q=80',
      alt: 'A person on a laptop video call from a cozy home setting',
      span: 'col-span-1 row-span-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d0?w=500&auto=format&fit=crop&q=80',
      alt: 'Warm natural light in a quiet home office space',
      span: 'col-span-1 row-span-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=500&auto=format&fit=crop&q=80',
      alt: 'A person journaling quietly during a moment of reflection',
      span: 'col-span-1 row-span-2',
    },
  ],
};

const team = {
  eyebrow: 'Meet Our Team',
  subtitle: 'Dedicated professionals guiding our therapeutic approach.',
  members: [
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Chief Clinical Officer',
      photo:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Marcus Chen',
      role: 'Head of Adult Therapy',
      photo:
        'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Elena Rodriguez, LCSW',
      role: 'Lead Family Counselor',
      photo:
        'https://images.unsplash.com/photo-1573166364566-a5d9b1cf8ef2?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Taylor Brooks, PhD',
      role: 'Specialist in Anxiety',
      photo:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    },
  ],
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-surface min-h-screen">

      {/* ================================================================ */}
      {/* ABOUT HERO                                                       */}
      {/* ================================================================ */}

      <section
        id="about-hero"
        className="relative h-[520px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <img
          src={missionHero.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-on-background/70 via-on-background/55 to-on-background/70" />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-[900px] mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Small Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-white bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.15em]"
          >
            About Inner Balance
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="text-headline-xl font-['Fraunces',serif] font-medium text-white mb-6 tracking-tight leading-[1.15]"
          >
            {missionHero.headingLine1}{' '}
            <span className="italic text-secondary-container">
              {missionHero.headingAccent}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            {missionHero.body}
          </motion.p>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* WHY INNER BALANCE                                                */}
      {/* ================================================================ */}

      <section
        className="py-24 px-6 md:px-16"
        id="why-us"
      >
        <div className="max-w-[1000px] mx-auto text-center mb-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-4 tracking-tight"
            >
              Why Inner Balance
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted max-w-2xl mx-auto leading-relaxed"
            >
              We've built our platform around the core pillars of effective,
              modern teletherapy to ensure you feel supported every step of
              the way.
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
          {whyCards.map(
            ({
              icon: Icon,
              iconBg,
              iconColor,
              title,
              description,
              size,
            }) => {
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
                  <div
                    className={`w-11 h-11 ${iconBg} rounded-full flex items-center justify-center mb-6`}
                  >
                    <Icon
                      size={20}
                      className={iconColor}
                      strokeWidth={1.75}
                    />
                  </div>

                  <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-3 tracking-tight">
                    {title}
                  </h3>

                  <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* PHOTO MOSAIC                                                     */}
      {/* ================================================================ */}

      <section
        className="py-24 px-6 md:px-16 bg-surface-container-low bg-noise"
        id="mosaic"
      >
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-[minmax(0,360px)_1fr] gap-12 items-start">

          <motion.div
            className="md:sticky md:top-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-5 uppercase tracking-[0.15em]"
            >
              {mosaic.eyebrow}
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-headline-lg font-['Fraunces',serif] font-medium text-on-background mb-4 tracking-tight"
            >
              {mosaic.heading}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed"
            >
              {mosaic.body}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 auto-rows-[140px] sm:auto-rows-[160px] gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
          >
            {mosaic.photos.map(({ src, alt, span }) => (
              <motion.div
                key={src}
                variants={fadeInVariants}
                className={`rounded-xl overflow-hidden ${span}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TEAM                                                              */}
      {/* ================================================================ */}

      <section
        className="py-24 px-6 md:px-16"
        id="team"
      >
        <div className="max-w-[1000px] mx-auto text-center mb-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-[0.15em]"
            >
              {team.eyebrow}
            </motion.span>

            <motion.p
              variants={itemVariants}
              className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-text-muted"
            >
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
            <motion.div
              key={name}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-4 ring-4 ring-surface">
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-body-md font-['Fraunces',serif] font-medium text-on-background">
                {name}
              </h3>

              <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary mt-0.5">
                {role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}