import { useState, useEffect, useCallback } from 'react';

const slides = [
  { img: '/images/hero/hero1.png', tagline: 'Bloom with meaning,', sub: 'delivered with love.' },
  { img: '/images/hero/hero2.png', tagline: 'Handle with care,', sub: 'happiness inside.' },
  { img: '/images/hero/hero3.png', tagline: 'Setiap bunga,', sub: 'menceritakan kisahmu.' },
  { img: '/images/hero/hero4.png', tagline: 'Rangkaian indah,', sub: 'untuk momen istimewamu.' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.img}
            alt={`Banner ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-sand text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light">
          Jalé Florist · Bandung
        </p>
        <h1
          key={current}
          className="font-display text-white text-5xl md:text-7xl font-bold leading-tight mb-3"
          style={{ animation: 'fadeUp 0.8s ease forwards' }}
        >
          {slides[current].tagline}
        </h1>
        <p
          key={`sub-${current}`}
          className="font-display italic text-white/90 text-3xl md:text-5xl font-normal mb-10"
          style={{ animation: 'fadeUp 0.8s ease 0.15s forwards', opacity: 0 }}
        >
          {slides[current].sub}
        </p>
        <a
          href="#catalog"
          className="group inline-flex items-center gap-2 bg-rose-brand hover:bg-rose-dark text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Lihat Koleksi
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Slide sebelumnya"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
        aria-label="Slide berikutnya"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-rose-brand' : 'w-2 h-2 bg-white/60 hover:bg-white'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
