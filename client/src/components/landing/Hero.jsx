import { ArrowRight, Shield, UserCheck, TrendingUp, Quote } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-container-low -z-10 bg-noise" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-container/30 to-transparent -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-6 h-px bg-primary" />
            <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider">
              You don't have to do it alone
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-on-background mb-6 leading-tight">
            Better Mind.<br />
            <span className="text-primary">Better You.</span>
          </h1>

          <p className="text-body-lg font-body-lg text-text-muted mb-8 leading-relaxed">
            Compassionate therapy to help you overcome challenges, build resilience, and create a life that feels meaningful.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-12">
            <button
              id="hero-cta-primary"
              className="font-label-md text-label-md bg-primary text-on-primary px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              Book a Session
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              id="hero-cta-secondary"
              className="font-label-md text-label-md text-on-background hover:text-primary transition-colors flex items-center justify-center gap-1.5"
            >
              Learn More
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-8">
            {[
              { icon: Shield, label: 'Confidential & Safe' },
              { icon: UserCheck, label: 'Personalized Approach' },
              { icon: TrendingUp, label: 'Support for Long Lasting Change' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                  <Icon size={20} className="text-on-secondary-container" />
                </div>
                <p className="text-body-sm font-body-sm text-text-muted leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="relative hidden md:block h-[500px]">
          <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-secondary-container/60 -z-10" />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80"
              alt="A calm, modern teletherapy session – person in a serene home environment"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating quote card */}
          <div className="absolute bottom-8 -right-6 bg-surface rounded-2xl p-5 shadow-lg max-w-[220px]">
            <Quote size={20} className="text-primary mb-2" fill="currentColor" />
            <p className="text-body-sm font-body-sm text-on-surface leading-snug">
              Healing takes time, and asking for help is a courageous step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}