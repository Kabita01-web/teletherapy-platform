import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'Over 500 licensed, vetted therapists across 30+ specialities',
  'Evidence-based approaches: CBT, DBT, EMDR, Mindfulness & more',
  'Fully HIPAA-compliant platform with bank-level encryption',
  'Matching within 24 hours — start your journey without delay',
  'Sliding scale pricing so care is accessible to everyone',
];

export default function About() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="about">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-surface-container-low to-transparent -z-0 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <div className="relative hidden md:block">
            <div className="rounded-3xl overflow-hidden shadow-xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=80"
                alt="A warm, professional therapist in a modern office setting"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-on-primary rounded-2xl px-6 py-5 shadow-xl">
              <p className="text-[36px] font-headline-xl leading-none font-bold">98%</p>
              <p className="text-body-sm font-body-sm text-on-primary/80 mt-1">Client satisfaction rate</p>
            </div>
            {/* Small accent card */}
            <div className="absolute top-6 -left-6 bg-secondary-container rounded-2xl px-5 py-4 shadow-lg">
              <p className="text-label-md font-label-md text-on-secondary-container text-sm font-semibold">
                🏆 Award-Winning
              </p>
              <p className="text-body-sm font-body-sm text-on-secondary-container/80 text-xs mt-0.5">
                Best Teletherapy Platform 2024
              </p>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <span className="inline-block text-label-md font-label-md text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              About Us
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-background mb-5">
              Healing Meets Modern Care
            </h2>
            <p className="text-body-lg font-body-lg text-text-muted mb-6 leading-relaxed">
              Inner Balance was founded on a simple belief: everyone deserves access to quality mental health support — wherever they are, whenever they need it. We blend clinical excellence with genuine human warmth.
            </p>
            <p className="text-body-md font-body-md text-text-muted mb-8 leading-relaxed">
              Our rigorous therapist vetting process, paired with a platform built specifically for emotional safety, makes us the most trusted name in online therapy.
            </p>

            {/* Highlights list */}
            <ul className="flex flex-col gap-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-body-md font-body-md text-on-surface">{item}</span>
                </li>
              ))}
            </ul>

            <button
              id="about-learn-more-btn"
              className="font-label-md text-label-md bg-primary text-on-primary px-8 py-3.5 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md"
            >
              Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
