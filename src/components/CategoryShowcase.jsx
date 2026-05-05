import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Bouquet Artificial',
    image: '/images/produk/bouquet-artificial/l/ba-l-001.jpg', // menggunakan foto asli jika ada
    desc: 'Bunga cantik yang abadi',
  },
  {
    name: 'Fresh Flowers',
    image: '/images/produk/bouquet-artificial/m/ba-m-001.jpg',
    desc: 'Kesegaran bunga asli premium',
  },
  {
    name: 'Bloom Box',
    image: '/images/produk/bouquet-artificial/s/ba-s-001.jpg',
    desc: 'Kado elegan dalam kemasan box',
  },
  {
    name: 'Snack & Money Bucket',
    image: '/images/produk/bouquet-artificial/xl/ba-xl-001.jpg',
    desc: 'Praktis, unik & berkesan',
  }
];

import SectionBackground from './SectionBackground';

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <SectionBackground variant="categories" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-rose-brand text-sm tracking-[0.25em] uppercase font-medium mb-3">Pilihan Kami</p>
          <h2 className="font-display text-4xl text-charcoal font-bold mb-5">
            Kategori Favorit
          </h2>
          <div className="w-16 h-0.5 bg-rose-brand mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to="/catalog"
              className="group relative h-48 sm:h-56 md:h-80 rounded-xl md:rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/30 md:bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors duration-500 z-10" />
              
              {/* Image with fallback styling */}
              <div className="absolute inset-0 bg-cream flex items-center justify-center">
                <span className="text-rose-brand/30 text-5xl">🌸</span>
              </div>
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-0"
                onError={(e) => {
                  e.target.style.display = 'none'; // hide broken images, fallback background will show
                }}
              />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1 md:mb-2 leading-snug">{cat.name}</h3>
                
                <p className="hidden md:block text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {cat.desc}
                </p>
                
                <div className="mt-1 md:mt-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-150">
                  <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-medium text-white/90 md:text-white uppercase tracking-wider">
                    Lihat Koleksi 
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
