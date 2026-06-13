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

export const getPngBlobFromUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    if (blob.type === 'image/png') {
      return blob;
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((pngBlob) => {
            if (pngBlob) {
              resolve(pngBlob);
            } else {
              reject(new Error('Canvas conversion to blob failed'));
            }
          }, 'image/png');
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Error converting image to PNG blob:', error);
    return null;
  }
};

export const copyBlobToClipboard = async (blob) => {
  if (!blob) return false;
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      return true;
    } else {
      console.warn('Clipboard API or ClipboardItem not supported');
      return false;
    }
  } catch (error) {
    console.error('Error copying blob to clipboard:', error);
    return false;
  }
};

export const uploadImageToLink = async (imageUrl) => {
  try {
    const blob = await getPngBlobFromUrl(imageUrl);
    if (!blob) return imageUrl;
    
    // Create a safe filename without spaces
    const originalFilename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const safeFilename = originalFilename.replace(/\s+/g, '_') || 'product.png';
    
    const file = new File([blob], safeFilename, { type: 'image/png' });
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    if (result.status === 'success' && result.data && result.data.url) {
      // Convert standard download page URL to direct file access URL
      const directUrl = result.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      return directUrl;
    }
    
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image to link:', error);
    return imageUrl;
  }
};

