import { ShieldCheck, Brain, Clock, Globe } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Confidential & Safe',
    description:
      'Your privacy is paramount. Our platform employs enterprise-grade encryption to ensure your sessions remain entirely secure and private.',
  },
  {
    icon: Brain,
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Personalised Approach',
    description:
      'No two journeys are the same. We match you with therapists who tailor their evidence-based methods to your specific needs.',
  },
  {
    icon: Clock,
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-deep-earth',
    title: 'Flexible Scheduling',
    description:
      'Book sessions that fit your life — evenings, weekends, or lunch breaks. Therapy on your terms, whenever you need it most.',
  },
  {
    icon: Globe,
    iconBg: 'bg-surface-container',
    iconColor: 'text-primary',
    title: 'Connect from Anywhere',
    description:
      'Access world-class therapy from the comfort of your home, office, or anywhere with an internet connection.',
  },
];

export default function TrustFeatures() {
  return (
    <section className="py-24 bg-surface relative z-10" id="trust">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-label-md font-label-md text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Why Inner Balance
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-background mb-4">
            A Space Designed for Healing
          </h2>
          <p className="text-body-lg font-body-lg text-text-muted max-w-2xl mx-auto">
            Every feature is built with your well-being in mind — from first contact to lasting transformation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
            <div
              key={title}
              className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-variant flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className={iconColor} />
              </div>
              <div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">{title}</h3>
                <p className="text-body-md font-body-md text-text-muted leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
