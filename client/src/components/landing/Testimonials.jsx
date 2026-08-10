import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya R.',
    role: 'Managing anxiety since 2023',
    avatar: 'AR',
    avatarBg: 'bg-primary-fixed',
    avatarText: 'text-primary',
    rating: 5,
    quote:
      'I was skeptical about online therapy, but Inner Balance changed everything. My therapist felt like a real partner in my healing — not just someone reading from a script. After 8 weeks, my panic attacks have reduced dramatically.',
    therapist: 'Dr. Meera Iyer',
    specialty: 'Anxiety & CBT',
  },
  {
    name: 'Rohan T.',
    role: 'Navigating grief & loss',
    avatar: 'RT',
    avatarBg: 'bg-secondary-container',
    avatarText: 'text-on-secondary-container',
    rating: 5,
    quote:
      'Losing my father was devastating. I found Inner Balance at my lowest, and my therapist guided me through grief in a way I never expected was possible. The convenience of connecting from home made it so much easier to show up consistently.',
    therapist: 'Dr. Kavita Nair',
    specialty: 'Grief Counselling',
  },
  {
    name: 'Sneha & Arjun M.',
    role: 'Couples therapy journey',
    avatar: 'SM',
    avatarBg: 'bg-tertiary-fixed',
    avatarText: 'text-deep-earth',
    rating: 5,
    quote:
      "Our relationship was at a breaking point. After just 12 sessions with our Inner Balance therapist, we have the tools and language to actually hear each other. Best investment we've ever made in our marriage.",
    therapist: 'Dr. Priya Sharma',
    specialty: 'Couples & Relationships',
  },
  {
    name: 'Vikram P.',
    role: 'Overcoming workplace burnout',
    avatar: 'VP',
    avatarBg: 'bg-primary-fixed',
    avatarText: 'text-primary',
    rating: 5,
    quote:
      "I was burning out fast and couldn't see a way forward. The matching process took 20 minutes and within a week I had my first session. My therapist helped me set boundaries I never thought I deserved. Genuinely life-changing.",
    therapist: 'Dr. Anil Verma',
    specialty: 'Stress & Burnout',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-surface-container-low bg-noise relative" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-label-md font-label-md text-secondary bg-secondary-container px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Real Stories
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-background mb-4">
            Lives Transformed
          </h2>
          <p className="text-body-lg font-body-lg text-text-muted max-w-2xl mx-auto">
            Thousands of people have taken the first step. Here's what they found on the other side.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm border border-surface-variant relative">
            {/* Quote icon */}
            <Quote size={48} className="text-primary-fixed absolute top-8 right-8 opacity-60" fill="currentColor" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" className="text-tertiary-fixed-dim" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-body-lg font-body-lg text-on-surface leading-relaxed mb-8 relative z-10">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${t.avatarBg} rounded-full flex items-center justify-center`}>
                  <span className={`text-label-md font-label-md font-bold ${t.avatarText}`}>{t.avatar}</span>
                </div>
                <div>
                  <p className="text-headline-md font-headline-md text-on-surface text-base font-semibold">{t.name}</p>
                  <p className="text-body-sm font-body-sm text-text-muted">{t.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-label-md font-label-md text-primary text-sm font-semibold">{t.therapist}</p>
                <p className="text-body-sm font-body-sm text-text-muted text-xs">{t.specialty}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              id="testimonials-prev-btn"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-on-surface-variant" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  id={`testimonials-dot-${i}`}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-6' : 'bg-outline-variant'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              id="testimonials-next-btn"
              onClick={next}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-on-surface-variant" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
