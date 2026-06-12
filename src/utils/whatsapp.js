export const WHATSAPP_NUMBER = "6281367931303";

export const formatPrice = (price) => {
  if (price === 0) return "Ask admin for price";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const generateOrderLink = (product) => {
  const imageUrl = window.location.origin + product.image;
  const msg = `Halo Jalé Florist, saya tertarik memesan ${product.name} (Kode: ${product.id}) seharga ${formatPrice(product.price)}.\n\n*Gambar Produk:* ${imageUrl}\n\nApakah masih tersedia?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const getWhatsAppLink = () => `https://wa.me/${WHATSAPP_NUMBER}`;
