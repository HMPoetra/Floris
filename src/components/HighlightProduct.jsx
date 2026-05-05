import { useState, useRef, useEffect } from 'react';
import { getWhatsAppLink } from '../utils/whatsapp';

const highlightProducts = [
  {
    id: 1,
    name: "Classic Rose Elegance",
    price: "Rp 350.000",
    images: ['/images/highlights/prod1_01.jpeg', '/images/highlights/prod1_02.jpeg']
  },
  {
    id: 2,
    name: "Summer Sunshine Bouquet",
    price: "Rp 275.000",
    images: ['/images/highlights/prod2_01.jpeg', '/images/highlights/prod2_02.jpeg']
  },
  {
    id: 3,
    name: "Pastel Dream Bloom Box",
    price: "Rp 450.000",
    images: ['/images/highlights/prod3_01.jpeg', '/images/highlights/prod3_02.jpeg']
  },
  {
    id: 4,
    name: "White Lily Serenity",
    price: "Rp 320.000",
    images: ['/images/highlights/prod4_01.jpeg', '/images/highlights/prod4_02.jpeg']
  },
  {
    id: 5,
    name: "Rustic Peony Charm",
    price: "Rp 380.000",
    images: ['/images/highlights/prod5_01.jpeg', '/images/highlights/prod5_02.jpeg']
  },
  {
    id: 6,
    name: "Premium Orchid Collection",
    price: "Rp 550.000",
    images: [
      '/images/highlights/prod6_01.jpeg', 
      '/images/highlights/prod6_02.jpeg',
      '/images/highlights/prod6_03.jpeg',
      '/images/highlights/prod6_04.jpeg',
      '/images/highlights/prod6_05.jpeg'
    ]
  }
];

export default function HighlightProduct() {
  const scrollContainerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Duplikat array agar bisa disimulasikan sebagai infinite scroll secara visual
  // Kita kalikan agar cukup panjang untuk digeser terus-menerus
  const duplicatedProducts = [...highlightProducts, ...highlightProducts, ...highlightProducts, ...highlightProducts];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 320 : 220; // Perkiraan lebar kartu
      const container = scrollContainerRef.current;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }

      // Infinite loop trick: if near end, jump back to middle secretly
      setTimeout(() => {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 100) {
          container.scrollLeft = container.scrollWidth / 3;
        } else if (container.scrollLeft <= 10) {
          container.scrollLeft = container.scrollWidth / 3;
        }
      }, 500);
    }
  };

  useEffect(() => {
    // Set initial scroll to the middle segment so we can scroll both ways infinitely
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setModalImageIndex(0);
    // Mencegah scroll pada body saat modal terbuka
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const nextModalImage = () => {
    if (selectedProduct) {
      setModalImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevModalImage = () => {
    if (selectedProduct) {
      setModalImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Jika modal Quick View sedang terbuka
      if (selectedProduct) {
        if (e.key === 'ArrowRight') nextModalImage();
        if (e.key === 'ArrowLeft') prevModalImage();
        if (e.key === 'Escape') closeQuickView();
      } 
      // Jika modal tertutup dan mouse berada di area carousel
      else if (isHovered) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          scroll('right');
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scroll('left');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, isHovered]);

  return (
    <section 
      className="py-20 bg-white relative overflow-hidden border-b border-sand/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center md:text-left mb-10 md:mb-14">
          <p className="text-rose-brand text-sm tracking-[0.2em] uppercase font-medium mb-3">Koleksi Spesial</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold">Highlight Product</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4 md:mx-0 px-4 md:px-0 group">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedProducts.map((product, index) => (
              <div 
                key={`${product.id}-${index}`} 
                className="group/card relative flex-none w-[260px] md:w-[320px] bg-cream rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer snap-start hover:-translate-y-2"
                onClick={() => openQuickView(product)}
              >
                {/* Image Container with Hover Swap */}
                <div className="relative w-full aspect-[4/5] bg-sand/20 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out opacity-100 group-hover/card:opacity-0"
                  />
                  {product.images.length > 1 && (
                    <img 
                      src={product.images[1]} 
                      alt={`${product.name} alt`}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out opacity-0 group-hover/card:opacity-100 scale-105 group-hover/card:scale-100"
                    />
                  )}
                  
                  {/* Quick View Overlay Label */}
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-charcoal px-6 py-2 rounded-full font-medium text-sm translate-y-4 group-hover/card:translate-y-0 transition-all duration-300 shadow-lg flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-charcoal mb-1 line-clamp-1 group-hover/card:text-rose-brand transition-colors">{product.name}</h3>
                  <p className="text-rose-brand font-medium">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows (Overlay on edges) */}
          <div className="absolute inset-y-0 left-0 md:-left-6 w-16 md:w-20 bg-gradient-to-r from-white via-white/80 md:via-transparent to-transparent pointer-events-none z-10 flex items-center pl-2 md:pl-0 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <button onClick={() => scroll('left')} className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-md border border-sand/30 flex items-center justify-center text-charcoal hover:bg-rose-brand hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 md:-right-6 w-16 md:w-20 bg-gradient-to-l from-white via-white/80 md:via-transparent to-transparent pointer-events-none z-10 flex items-center justify-end pr-2 md:pr-0 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <button onClick={() => scroll('right')} className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-md border border-sand/30 flex items-center justify-center text-charcoal hover:bg-rose-brand hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" onClick={closeQuickView} />
          
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-charcoal transition-all shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Modal Image Slider */}
            <div className="relative w-full md:w-3/5 bg-cream aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center group overflow-hidden">
              <img 
                src={selectedProduct.images[modalImageIndex]} 
                alt={`${selectedProduct.name} - view ${modalImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              
              {/* Slider Controls */}
              {selectedProduct.images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevModalImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-charcoal rounded-full flex items-center justify-center shadow-md transition-all md:opacity-0 md:group-hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextModalImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-charcoal rounded-full flex items-center justify-center shadow-md transition-all md:opacity-0 md:group-hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  
                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-charcoal/20 px-3 py-2 rounded-full backdrop-blur-sm">
                    {selectedProduct.images.map((_, i) => (
                      <div key={i} className={`h-2 rounded-full transition-all ${i === modalImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Modal Info */}
            <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col bg-white overflow-y-auto">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">{selectedProduct.name}</h3>
              <p className="text-2xl text-rose-brand font-medium mb-6">{selectedProduct.price}</p>
              
              <div className="space-y-4 mb-8 text-muted">
                <p>Rangkaian bunga cantik yang dirangkai dengan tangan profesional. Cocok untuk menyempurnakan momen spesial Anda bersama orang terkasih.</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Bunga segar berkualitas premium</li>
                  <li>Tersedia opsi custom warna & ukuran</li>
                  <li>Pengiriman aman se-Bandung Raya</li>
                  <li>Gratis kartu ucapan desain eksklusif</li>
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-sand/40">
                <a
                  href={getWhatsAppLink(`Halo Jalé Florist, saya tertarik dengan produk ${selectedProduct.name} (${selectedProduct.price}). Boleh minta info lebih lanjut?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Pesan via WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
