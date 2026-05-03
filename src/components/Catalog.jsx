import { useState, useMemo } from 'react';
import { products, categories, sizes } from '../data/products';
import ProductCard from './ProductCard';
import QuickView from './QuickView';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSize, setActiveSize] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const sizeMatch = activeSize === 'all' || p.size === activeSize;
      return catMatch && sizeMatch;
    });
  }, [activeCategory, activeSize]);

  return (
    <section id="catalog" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-rose-brand text-sm tracking-[0.25em] uppercase font-medium mb-3">Koleksi Kami</p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mb-4">Katalog Produk</h2>
          <div className="w-16 h-0.5 bg-rose-brand mx-auto mb-5" />
          <p className="text-muted max-w-xl mx-auto">
            Temukan rangkaian bunga sempurna untuk setiap momen spesialmu.
          </p>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-rose-brand text-white shadow-md'
                : 'bg-blush text-charcoal hover:bg-sand'
            }`}
          >
            Semua Kategori
          </button>
          {categories.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-rose-brand text-white shadow-md'
                  : 'bg-blush text-charcoal hover:bg-sand'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Ukuran */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveSize('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              activeSize === 'all'
                ? 'border-rose-brand bg-rose-brand/10 text-rose-brand'
                : 'border-sand text-muted hover:border-rose-brand hover:text-rose-brand'
            }`}
          >
            Semua Ukuran
          </button>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setActiveSize(size)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                activeSize === size
                  ? 'border-rose-brand bg-rose-brand/10 text-rose-brand'
                  : 'border-sand text-muted hover:border-rose-brand hover:text-rose-brand'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <p className="text-sm text-muted text-center mb-8">
          Menampilkan <span className="font-semibold text-charcoal">{filtered.length}</span> produk
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🌸</p>
            <p className="text-muted">Belum ada produk untuk filter ini.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
