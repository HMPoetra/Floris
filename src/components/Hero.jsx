import { useState, useEffect, useCallback, useRef } from 'react';

const slides = [
  '/images/hero/hero1.png',
  '/images/hero/hero2.png',
  '/images/hero/hero3.png',
  '/images/hero/hero4.png',
];

// Menambahkan slide terakhir di awal, dan slide pertama di akhir untuk infinite loop
const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

export default function Hero() {
  // Index 1 adalah slide pertama aslinya
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  // Swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const next = useCallback(() => {
    if (current >= extendedSlides.length - 1) return;
    setIsTransitioning(true);
    setCurrent((p) => p + 1);
  }, [current]);

  const prev = useCallback(() => {
    if (current <= 0) return;
    setIsTransitioning(true);
    setCurrent((p) => p - 1);
  }, [current]);

  // Handle lompatan tanpa animasi ketika menyentuh clone slide di awal atau akhir
  const handleTransitionEnd = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(slides.length);
    } else if (current === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrent(1);
    }
  };

  // Auto-slide interval
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }
  };

  return (
    <section
      id="home"
      className="relative w-full pb-8 md:pb-0" // Memberikan ruang di bawah untuk mobile dots
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div 
        className="relative w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        {/* Track */}
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {extendedSlides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Banner ${i}`}
              className="block h-auto flex-shrink-0"
              style={{ width: '100%', minWidth: '100%' }}
              draggable="false"
            />
          ))}
        </div>

        {/* Arrow Kiri */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white text-charcoal rounded-full items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Slide sebelumnya"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow Kanan */}
        <button
          onClick={next}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white text-charcoal rounded-full items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Slide berikutnya"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => {
          // Konversi current (1-4) kembali ke index (0-3) untuk indikator dots
          let activeIndex = current - 1;
          if (current === 0) activeIndex = slides.length - 1;
          if (current === extendedSlides.length - 1) activeIndex = 0;

          const isActive = i === activeIndex;

          return (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setCurrent(i + 1);
              }}
              className={`rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-6 h-2 bg-rose-brand md:bg-white' 
                  : 'w-2 h-2 bg-rose-brand/30 hover:bg-rose-brand/50 md:bg-white/50 md:hover:bg-white/80'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
