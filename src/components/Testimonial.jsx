import { testimonials } from '../data/testimonials';

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Testimonial() {
  return (
    <section className="py-24 bg-blush">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-rose-brand text-sm tracking-[0.25em] uppercase font-medium mb-3">Testimoni</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-4">
            Kata Pelanggan Kami
          </h2>
          <div className="w-16 h-0.5 bg-rose-brand mx-auto mb-5" />
          <p className="text-muted max-w-xl mx-auto">
            Review nyata dari Google Maps — kebahagiaan pelanggan adalah prioritas kami.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-cream rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-3"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="text-charcoal text-sm leading-relaxed flex-1">"{t.review}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-blush">
                <div className="w-9 h-9 rounded-full bg-rose-brand/20 flex items-center justify-center text-rose-brand font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-charcoal font-medium text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.date} · Google Maps</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
