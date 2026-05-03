import { formatPrice } from '../utils/whatsapp';

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-blush mb-3 shadow-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-charcoal text-xs font-medium px-4 py-2 rounded-full shadow-md">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-xs text-muted mb-0.5">{product.id}</p>
        <h3 className="text-sm font-medium text-charcoal leading-tight truncate">{product.name}</h3>
        <p className="text-rose-brand font-semibold text-sm mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
