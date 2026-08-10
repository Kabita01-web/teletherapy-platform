import { ArrowRight, HeartHandshake, Users, Stethoscope, Smile, Wind, Moon } from 'lucide-react';

const services = [
  {
    icon: HeartHandshake,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Anxiety & Stress',
    description: 'Learn practical tools to calm your nervous system and reclaim your peace of mind.',
    tag: 'Most Requested',
    tagStyle: 'bg-primary-fixed text-primary',
  },
  {
    icon: Moon,
    iconBg: 'bg-surface-container',
    iconColor: 'text-primary',
    title: 'Depression & Mood',
    description: 'Find warmth and clarity with compassionate therapy tailored to lift you forward.',
    tag: null,
    tagStyle: '',
  },
  {
    icon: Users,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Relationships & Couples',
    description: 'Strengthen connection, improve communication, and heal together with guided support.',
    tag: null,
    tagStyle: '',
  },
  {
    icon: Stethoscope,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-deep-earth',
    title: 'Trauma & PTSD',
    description: 'Gently process difficult experiences in a safe, evidence-based therapeutic environment.',
    tag: null,
    tagStyle: '',
  },
  {
    icon: Smile,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Self-Esteem & Identity',
    description: 'Explore who you are with curiosity and compassion, building lasting confidence.',
    tag: null,
    tagStyle: '',
  },
  {
    icon: Wind,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Grief & Life Transitions',
    description: 'Navigate loss, change, and new beginnings with steady, empathetic guidance.',
    tag: null,
    tagStyle: '',
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-surface-container-low bg-noise relative" id="services">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block text-label-md font-label-md text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              What We Treat
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-background mb-3">
              Support for Life's Challenges
            </h2>
            <p className="text-body-lg font-body-lg text-text-muted max-w-xl">
              Whether you're facing a specific struggle or simply seeking growth, our therapists are here for every chapter.
            </p>
          </div>
          <button
            id="services-view-all-btn"
            className="flex-shrink-0 flex items-center gap-2 text-label-md font-label-md text-primary hover:text-primary-container transition-colors group"
          >
            View all specialities
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, iconBg, iconColor, title, description, tag, tagStyle }) => (
            <div
              key={title}
              className="group bg-surface-container-lowest p-7 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 ${iconBg} rounded-full flex items-center justify-center`}>
                  <Icon size={20} className={iconColor} />
                </div>
                {tag && (
                  <span className={`text-label-sm font-label-sm px-3 py-1 rounded-full ${tagStyle}`}>
                    {tag}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">{title}</h3>
                <p className="text-body-md font-body-md text-text-muted leading-relaxed">{description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-primary text-label-md font-label-md mt-auto group-hover:gap-2.5 transition-all duration-200">
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
