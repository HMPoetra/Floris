import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { products, categories, sizes } from '../data/products';
import ProductCard from './ProductCard';
import QuickView from './QuickView';

const CustomDropdown = ({ value, options, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`relative ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`} ref={dropdownRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-white/90 backdrop-blur-sm border border-sand rounded-2xl px-5 py-4 flex justify-between items-center shadow-sm transition-all duration-300 ${disabled ? 'bg-cream/50' : 'cursor-pointer hover:shadow-md hover:border-rose-brand/50'} ${isOpen ? 'ring-4 ring-rose-brand/10 border-rose-brand bg-white' : ''}`}
      >
        <span className={`font-medium truncate pr-4 ${disabled ? 'text-muted' : 'text-charcoal'}`}>
          {selectedOption?.label}
        </span>
        <svg className={`w-5 h-5 text-rose-brand transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-sand/50 rounded-2xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
          <div className="max-h-[250px] overflow-y-auto py-2">
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-5 py-3.5 cursor-pointer transition-all duration-200 text-sm md:text-base
                  ${value === opt.value ? 'bg-rose-brand/10 text-rose-brand font-bold border-l-4 border-rose-brand' : 'text-charcoal hover:bg-sand/30 hover:text-rose-brand border-l-4 border-transparent pl-6'}
                `}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Catalog() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.selectedCategory || 'all');
  const [activeSize, setActiveSize] = useState('all');
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(30);

  // Update filter dari navigasi (state)
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedCategory) {
        setActiveCategory(location.state.selectedCategory);
        setActiveSize('all');
      }
      if (location.state.searchQuery !== undefined) {
        setSearchQuery(location.state.searchQuery);
      }
    }
  }, [location.state]);

  // Reset jumlah yang ditampilkan saat filter diganti
  useEffect(() => {
    setVisibleCount(30);
  }, [activeCategory, activeSize, searchQuery]);

  // Auto-open product modal if ?product=ID is present in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      const found = products.find(p => p.id === productId.toUpperCase());
      if (found) {
        setSelectedProduct(found);
      }
    }
  }, []);

  // Acak semua produk sekali saja saat halaman dimuat
  const randomizedProducts = useMemo(() => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const filtered = useMemo(() => {
    return randomizedProducts.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const sizeMatch = activeSize === 'all' || p.size === activeSize;
      
      const searchMatch = !searchQuery.trim() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.price.toString().includes(searchQuery.trim());

      return catMatch && sizeMatch && searchMatch;
    });
  }, [activeCategory, activeSize, searchQuery, randomizedProducts]);

  const displayedProducts = filtered.slice(0, visibleCount);

  return (
    <section id="catalog" className="py-24 bg-cream relative overflow-hidden">
      {/* --- Ornamen Background --- */}
      {/* Blur Backgrounds (Menyebar di berbagai area) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D9A299]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-[30%] right-0 w-[400px] h-[400px] bg-[#DCC5B2]/15 rounded-full blur-[120px] translate-x-1/3 pointer-events-none"></div>
      <div className="absolute top-[60%] left-0 w-[600px] h-[600px] bg-[#D9A299]/10 rounded-full blur-[120px] -translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DCC5B2]/15 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
      
      {/* Floating Flowers (Lebih banyak & variatif di berbagai ketinggian) */}
      {/* Top area */}
      <svg className="absolute top-40 left-10 md:left-20 w-16 h-16 text-[#D9A299]/20 animate-[spin_20s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[15%] right-8 md:right-24 w-12 h-12 text-[#DCC5B2]/30 animate-[spin_15s_linear_infinite_reverse] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[20%] left-1/3 w-10 h-10 text-[#D9A299]/15 animate-[spin_25s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[10%] right-1/4 w-14 h-14 text-[#DCC5B2]/20 animate-[bounce_7s_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      
      {/* Middle area */}
      <svg className="absolute top-[40%] left-5 md:left-12 w-20 h-20 text-[#D9A299]/20 animate-[bounce_5s_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[55%] right-10 md:right-20 w-16 h-16 text-[#DCC5B2]/25 animate-[spin_25s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[45%] right-1/3 w-12 h-12 text-[#D9A299]/18 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-1/2 left-1/4 w-14 h-14 text-[#DCC5B2]/22 animate-[bounce_6s_infinite_1s] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      
      {/* Bottom area */}
      <svg className="absolute top-[80%] left-10 md:left-[15%] w-14 h-14 text-[#D9A299]/20 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute bottom-[5%] right-12 md:right-32 w-24 h-24 text-[#DCC5B2]/20 animate-[bounce_6s_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute bottom-[20%] left-1/3 w-16 h-16 text-[#D9A299]/15 animate-[spin_22s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute bottom-[15%] right-1/4 w-12 h-12 text-[#DCC5B2]/18 animate-[bounce_5s_infinite_2s] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      {/* Extra flowers - more positions */}
      <svg className="absolute top-[5%] left-[5%] w-10 h-10 text-[#D9A299]/16 animate-[spin_28s_linear_infinite_reverse] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-1/3 left-[8%] w-14 h-14 text-[#DCC5B2]/19 animate-[bounce_7.5s_infinite_0.5s] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[60%] right-[5%] w-16 h-16 text-[#D9A299]/17 animate-[spin_24s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[72%] left-[22%] w-10 h-10 text-[#DCC5B2]/20 animate-[spin_26s_linear_infinite_reverse] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[38%] right-[5%] w-12 h-12 text-[#D9A299]/15 animate-[bounce_8s_infinite_1.5s] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute bottom-[8%] left-[8%] w-14 h-14 text-[#DCC5B2]/21 animate-[spin_20s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute bottom-[28%] right-[12%] w-11 h-11 text-[#D9A299]/18 animate-[bounce_6.5s_infinite_0.8s] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>
      <svg className="absolute top-[28%] left-[50%] w-13 h-13 text-[#DCC5B2]/17 animate-[spin_32s_linear_infinite] pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="25" r="20" /><circle cx="74" cy="42" r="20" /><circle cx="65" cy="70" r="20" /><circle cx="35" cy="70" r="20" /><circle cx="26" cy="42" r="20" />
      </svg>

      {/* Floating Sparkles (Menyebar) */}
      <div className="absolute top-[10%] right-[20%] text-[#D9A299]/40 text-4xl animate-pulse pointer-events-none">✦</div>
      <div className="absolute top-[25%] left-[25%] text-[#DCC5B2]/50 text-2xl animate-[pulse_3s_infinite_1s] pointer-events-none">✧</div>
      <div className="absolute top-[50%] right-[30%] text-[#D9A299]/30 text-3xl animate-[pulse_4s_infinite_2s] pointer-events-none">✦</div>
      <div className="absolute top-[75%] left-[10%] text-[#DCC5B2]/40 text-4xl animate-pulse pointer-events-none">✧</div>
      <div className="absolute bottom-[10%] right-[15%] text-[#D9A299]/50 text-3xl animate-[pulse_3s_infinite] pointer-events-none">✦</div>
      {/* Additional sparkles */}
      <div className="absolute top-[5%] left-[15%] text-[#DCC5B2]/35 text-3xl animate-[pulse_2.5s_infinite_1.5s] pointer-events-none">✧</div>
      <div className="absolute top-[35%] right-[10%] text-[#D9A299]/25 text-2xl animate-[pulse_3.5s_infinite_0.5s] pointer-events-none">✦</div>
      <div className="absolute top-[65%] left-1/3 text-[#DCC5B2]/30 text-2xl animate-[pulse_2s_infinite_2s] pointer-events-none">✧</div>
      <div className="absolute bottom-[30%] right-[8%] text-[#D9A299]/35 text-3xl animate-[pulse_3s_infinite_1s] pointer-events-none">✦</div>
      {/* More sparkles */}
      <div className="absolute top-[18%] right-[45%] text-[#DCC5B2]/28 text-2xl animate-[pulse_2.8s_infinite_0.3s] pointer-events-none">✧</div>
      <div className="absolute top-[42%] left-[5%] text-[#D9A299]/32 text-3xl animate-[pulse_3.2s_infinite_1.2s] pointer-events-none">✦</div>
      <div className="absolute bottom-[22%] left-[40%] text-[#DCC5B2]/26 text-2xl animate-[pulse_2.6s_infinite_1.8s] pointer-events-none">✧</div>
      <div className="absolute top-[58%] right-[22%] text-[#D9A299]/29 text-3xl animate-[pulse_3.3s_infinite_0.7s] pointer-events-none">✦</div>
      
      {/* Pattern Titik Halus */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D9A299 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
      {/* --- End Ornamen --- */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-rose-brand text-sm tracking-[0.25em] uppercase font-medium mb-3">Koleksi Kami</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-4">Katalog Produk</h2>
          <div className="w-16 h-0.5 bg-rose-brand mx-auto mb-5" />
          <p className="text-muted max-w-xl mx-auto">
            Temukan rangkaian bunga sempurna untuk setiap momen spesialmu.
          </p>
        </div>

        {/* Modern Filter Section */}
        <div className="flex flex-col gap-4 md:gap-6 justify-center mb-12 max-w-4xl mx-auto relative z-20">
          {/* Search Input */}
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama bunga, kode produk, atau harga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 backdrop-blur-sm border border-sand hover:border-rose-brand/50 focus:border-rose-brand rounded-2xl pl-12 pr-5 py-4 shadow-sm transition-all outline-none text-charcoal font-medium placeholder:text-muted/60"
              />
              <svg className="w-6 h-6 text-rose-brand absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Dropdown Kategori */}
            <div className="flex-1">
            <label className="block text-xs font-bold text-rose-brand tracking-widest uppercase mb-2 ml-2">Kategori Produk</label>
            <CustomDropdown 
              value={activeCategory}
              options={[
                { value: 'all', label: '🌸 Semua Kategori' },
                ...categories.filter(c => c.id !== 'all').map(cat => ({ value: cat.id, label: cat.label }))
              ]}
              onChange={(val) => {
                setActiveCategory(val);
                setActiveSize('all');
              }}
            />
          </div>

          {/* Dropdown Ukuran/Varian Dinamis */}
          <div className="flex-1">
            <label className="block text-xs font-bold text-rose-brand tracking-widest uppercase mb-2 ml-2">Varian / Ukuran</label>
            <CustomDropdown 
              value={activeSize}
              options={[
                { value: 'all', label: '✨ Semua Varian' },
                ...(activeCategory !== 'all' 
                  ? [...new Set(products.filter(p => p.category === activeCategory).map(p => p.size))]
                      .filter(Boolean)
                      .map(size => ({ value: size, label: size }))
                  : [])
              ]}
              onChange={(val) => setActiveSize(val)}
              disabled={activeCategory === 'all'}
            />
          </div>
        </div>
      </div>

        {/* Product Count */}
        <p className="text-sm text-muted text-center mb-8">
          Menampilkan <span className="font-semibold text-charcoal">{displayedProducts.length}</span> dari <span className="font-semibold text-charcoal">{filtered.length}</span> produk
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filtered.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 30)}
                  className="px-8 py-3 bg-white border border-sand rounded-full text-charcoal font-medium hover:bg-sand/30 hover:shadow-sm transition-all duration-300"
                >
                  Lihat Produk Lainnya
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🌸</p>
            <p className="text-muted">Belum ada produk untuk filter ini.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          onClose={() => {
            setSelectedProduct(null);
            // Clean up the query parameter without reloading page
            const url = new URL(window.location.href);
            url.searchParams.delete('product');
            window.history.pushState({}, '', url.toString());
          }} 
        />
      )}
    </section>
  );
}
