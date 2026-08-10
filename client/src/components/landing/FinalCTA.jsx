import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0 bg-primary -z-10" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary-container/20 to-transparent -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl -z-10" />
      <div className="absolute top-12 right-12 w-64 h-64 rounded-full bg-secondary/20 blur-3xl -z-10" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full mb-8 text-label-sm font-label-sm backdrop-blur-sm">
            <Sparkles size={14} />
            <span>Your healing begins with one decision</span>
          </div>

          <h2 className="text-headline-xl font-headline-xl text-on-primary mb-6 leading-tight">
            You Deserve to<br />Feel Better
          </h2>

          <p className="text-body-lg font-body-lg text-on-primary/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Reaching out takes courage — and we honour that. Join thousands who chose to invest in themselves and found clarity, connection, and calm on the other side.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              id="cta-start-btn"
              className="font-label-md text-label-md bg-on-primary text-primary px-10 py-4 rounded-full hover:bg-primary-fixed transition-colors shadow-lg flex items-center justify-center gap-2 group"
            >
              Get Matched — It's Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              id="cta-demo-btn"
              className="font-label-md text-label-md border border-white/30 text-on-primary px-10 py-4 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center"
            >
              Learn How It Works
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-on-primary/70 text-body-sm font-body-sm">
            {[
              '✓ No credit card required',
              '✓ Cancel anytime',
              '✓ Matched in under 24 hours',
              '✓ 100% confidential',
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
