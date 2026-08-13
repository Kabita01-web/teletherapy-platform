import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

/**
 * Same compact, restrained card design as the single-card version —
 * small avatar, small corner quote mark, body-md quote text, shadow-sm —
 * just laid out 3-up (2 on tablet, 1 on mobile) in a horizontally
 * scrollable, snap-aligned row instead of one card at a time.
 */

const testimonials = [
  {
    name: 'Ananya R.',
    role: 'Managing anxiety since 2023',
    avatar: 'AR',
    avatarBg: 'bg-primary-fixed',
    avatarText: 'text-primary',
    rating: 5,
    quote:
      'I was skeptical about online therapy, but Inner Balance changed everything. My therapist felt like a real partner in my healing.',
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
      'I found Inner Balance at my lowest, and my therapist guided me through grief in a way I never expected was possible.',
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
      "After 12 sessions with our Inner Balance therapist, we have the tools and language to actually hear each other.",
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
      'The matching process took 20 minutes and within a week I had my first session — genuinely life-changing.',
    therapist: 'Dr. Anil Verma',
    specialty: 'Stress & Burnout',
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToCard = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  const scrollByCard = (direction) => {
    const nextIndex = Math.min(Math.max(active + direction, 0), testimonials.length - 1);
    scrollToCard(nextIndex);
  };

  // Keep the dots in sync when the person scrolls/drags manually.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      let closest = 0;
      let minDist = Infinity;
      Array.from(track.children).forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="py-20 bg-surface-container-low bg-noise" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 text-center">
        {/* Header */}
        <span className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-secondary bg-secondary-container px-3.5 py-1 rounded-full mb-4 uppercase tracking-[0.15em]">
          What Our Clients Say
        </span>
        <h2 className="text-headline-md font-['Fraunces',serif] font-medium text-on-background mb-10 tracking-tight">
          Lives <span className="italic text-primary">Transformed</span>
        </h2>

        {/* Scrollable row */}
        <motion.div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="snap-start flex-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] bg-surface-container-lowest rounded-2xl p-7 shadow-sm border border-surface-variant"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 flex-shrink-0 ${t.avatarBg} rounded-full flex items-center justify-center`}>
                    <span className={`text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold ${t.avatarText}`}>{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-body-md font-['Fraunces',serif] font-medium text-on-surface leading-tight">{t.name}</p>
                    <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-tight">{t.role}</p>
                  </div>
                </div>
                <Quote size={20} className="text-primary/40 flex-shrink-0" fill="currentColor" />
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" className="text-tertiary-fixed-dim" />
                ))}
              </div>

              <blockquote className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-on-surface leading-relaxed mb-5 line-clamp-4">
                "{t.quote}"
              </blockquote>

              <div className="pt-4 border-t border-surface-variant flex items-center justify-between">
                <p className="text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary">{t.therapist}</p>
                <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">{t.specialty}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Controls: arrow · dots · arrow */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            id="testimonials-prev-btn"
            onClick={() => scrollByCard(-1)}
            className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={15} className="text-on-surface-variant" />
          </button>

          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                id={`testimonials-dot-${i}`}
                onClick={() => scrollToCard(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-primary w-5' : 'bg-outline-variant w-1.5'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            id="testimonials-next-btn"
            onClick={() => scrollByCard(1)}
            className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={15} className="text-on-surface-variant" />
          </button>
        </div>
      </div>
    </section>
  );
}