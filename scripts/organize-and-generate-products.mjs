import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uncategorizedDir = path.join(__dirname, '../public/images/produk/uncategorized');
const produkDir = path.join(__dirname, '../public/images/produk');
const productsFile = path.join(__dirname, '../src/data/products.js');

// Map prefixes to categories and subdirectories
const prefixMap = {
  // Bouquet Artificial
  'bap': { cat: 'Bouquet Artificial', sub: 'Petite', dir: 'bouquet-artificial/petite', namePrefix: 'Bouquet Artificial Petite' },
  'bas': { cat: 'Bouquet Artificial', sub: 'Small', dir: 'bouquet-artificial/s', namePrefix: 'Bouquet Artificial Small' },
  'bam': { cat: 'Bouquet Artificial', sub: 'Medium', dir: 'bouquet-artificial/m', namePrefix: 'Bouquet Artificial Medium' },
  'bal': { cat: 'Bouquet Artificial', sub: 'Large', dir: 'bouquet-artificial/l', namePrefix: 'Bouquet Artificial Large' },
  'baxl': { cat: 'Bouquet Artificial', sub: 'XL', dir: 'bouquet-artificial/xl', namePrefix: 'Bouquet Artificial XL' },
  'baxxl': { cat: 'Bouquet Artificial', sub: 'XXL', dir: 'bouquet-artificial/xxl', namePrefix: 'Bouquet Artificial XXL' },
  'bahs': { cat: 'Bouquet Artificial', sub: 'Human Size', dir: 'bouquet-artificial/human-size', namePrefix: 'Bouquet Artificial Human Size' },

  // Bouquet Fresh
  'bfs': { cat: 'Fresh Flowers', sub: 'Small', dir: 'bouquet-fresh/s', namePrefix: 'Bouquet Fresh Small' },
  'bfm': { cat: 'Fresh Flowers', sub: 'Medium', dir: 'bouquet-fresh/m', namePrefix: 'Bouquet Fresh Medium' },
  'bfl': { cat: 'Fresh Flowers', sub: 'Large', dir: 'bouquet-fresh/l', namePrefix: 'Bouquet Fresh Large' },
  'bfxl': { cat: 'Fresh Flowers', sub: 'XL', dir: 'bouquet-fresh/xl', namePrefix: 'Bouquet Fresh XL' },
  'bfp': { cat: 'Fresh Flowers', sub: 'Premium', dir: 'bouquet-fresh/premium', namePrefix: 'Bouquet Fresh Premium' },
  'bsf': { cat: 'Fresh Flowers', sub: 'Single Flower', dir: 'bouquet-fresh/single', namePrefix: 'Bouquet Single Fresh Flower' },
  'bfhs': { cat: 'Fresh Flowers', sub: 'Human Size', dir: 'bouquet-fresh/human-size', namePrefix: 'Bouquet Fresh Flower Human Size' },

  // Bouquet Mix
  'bfmam': { cat: 'Fresh Mix Artificial', sub: 'Medium', dir: 'bouquet-mix/m', namePrefix: 'Bouquet Fresh Mix Artificial Medium' },
  'bfmal': { cat: 'Fresh Mix Artificial', sub: 'Large', dir: 'bouquet-mix/l', namePrefix: 'Bouquet Fresh Mix Artificial Large' },
  'bfmaxl': { cat: 'Fresh Mix Artificial', sub: 'XL', dir: 'bouquet-mix/xl', namePrefix: 'Bouquet Fresh Mix Artificial XL' },

  // Bloom Box
  'blboxartif': { cat: 'Bloom Box', sub: 'Artificial', dir: 'bloom-box-artificial', namePrefix: 'Bloombox Artificial' },
  'blboxfresh': { cat: 'Bloom Box', sub: 'Fresh', dir: 'bloom-box-fresh', namePrefix: 'Bloombox Fresh' },

  // Vas
  'vaskacaartif': { cat: 'Vas Arrangement', sub: 'Kaca Artificial', dir: 'vas-artificial', namePrefix: 'Vas Kaca Artificial' },
  'vaskacafresh': { cat: 'Vas Arrangement', sub: 'Kaca Fresh', dir: 'vas-fresh', namePrefix: 'Vas Kaca Fresh Flower' },
  'vaspetitearti': { cat: 'Vas Arrangement', sub: 'Petite Artificial', dir: 'vas-artificial', namePrefix: 'Vas Kaca Artificial Petite' },
  'vaspetite': { cat: 'Vas Arrangement', sub: 'Petite Artificial', dir: 'vas-artificial', namePrefix: 'Vas Kaca Artificial Petite' },
  'vasplasticmelaminartif': { cat: 'Vas Arrangement', sub: 'Plastic Melamin Artificial', dir: 'vas-artificial', namePrefix: 'Vas Plastic Melamine Artificial' },

  // Snack Bouquet
  'bsnack': { cat: 'Snack Bouquet', sub: 'Snack', dir: 'snack-bucket', namePrefix: 'Snack Bouquet' },

  // Wedding Arrangement
  'wedartifcar': { cat: 'Wedding Arrangement', sub: 'Wedding Car Artificial', dir: 'wedding-arrangement', namePrefix: 'Wedding Car Artificial' },
  'wedfreshcar': { cat: 'Wedding Arrangement', sub: 'Wedding Car Fresh', dir: 'wedding-arrangement', namePrefix: 'Wedding Car Fresh Flower' },
  'wedartif': { cat: 'Wedding Arrangement', sub: 'Artificial', dir: 'wedding-arrangement', namePrefix: 'Bouquet Wedding Artificial' },
  'wedfresh': { cat: 'Wedding Arrangement', sub: 'Fresh', dir: 'wedding-arrangement', namePrefix: 'Bouquet Wedding Fresh Flower' },
  'wedmix': { cat: 'Wedding Arrangement', sub: 'Mix', dir: 'wedding-arrangement', namePrefix: 'Bouquet Wedding Fresh Mix Artificial' },
  'wcartif': { cat: 'Wedding Arrangement', sub: 'Corsage Artificial', dir: 'wedding-arrangement', namePrefix: 'Wedding Corsage Artificial' },
  'wcfresh': { cat: 'Wedding Arrangement', sub: 'Corsage Fresh', dir: 'wedding-arrangement', namePrefix: 'Wedding Corsage Fresh Flower' },

  // Custom / Gift Bouquet
  'bgradartif': { cat: 'Custom Bouquet', sub: 'Graduation Artificial', dir: 'custom-bucket', namePrefix: 'Bouquet Graduation Artificial' },
  'bgradfresh': { cat: 'Custom Bouquet', sub: 'Graduation Fresh', dir: 'custom-bucket', namePrefix: 'Bouquet Graduation Fresh' },
  'bgradsnack': { cat: 'Custom Bouquet', sub: 'Graduation Snack', dir: 'custom-bucket', namePrefix: 'Bouquet Graduation Snack' },
  'blego': { cat: 'Custom Bouquet', sub: 'Lego', dir: 'custom-bucket', namePrefix: 'Bouquet Lego' },
  'brokokartif': { cat: 'Custom Bouquet', sub: 'Rokok', dir: 'custom-bucket', namePrefix: 'Bouquet Rokok Artificial' },
  'bphotoartif': { cat: 'Custom Bouquet', sub: 'Photo', dir: 'custom-bucket', namePrefix: 'Bouquet Photo Artificial' },
  'giftcustom': { cat: 'Custom Bouquet', sub: 'Gift Custom', dir: 'custom-bucket', namePrefix: 'Bouquet Gift Custom' },
  'bdried': { cat: 'Custom Bouquet', sub: 'Dried', dir: 'custom-bucket', namePrefix: 'Bouquet Dried Flower' },
  'bcsayur': { cat: 'Custom Bouquet', sub: 'Sayur', dir: 'custom-bucket', namePrefix: 'Bouquet Sayur' },

  // Pipe Bouquet
  'bpipe': { cat: 'Pipe Bouquet', sub: '', dir: 'bucket-pipe', namePrefix: 'Bouquet Pipe' }
};

function getPrefixInfo(filename) {
  let lowerName = filename.toLowerCase().replace(/^salinan\s+/, '');

  // Special check for Money Bucket
  const mbMatch = lowerName.match(/^(mb[afd]?)(\d+)?lbr/);
  if (mbMatch) {
    const type = mbMatch[1];
    let sub = '';
    let namePrefix = 'Money Bouquet';
    if (type === 'mba') { sub = 'Artificial'; namePrefix = 'Money Bouquet Artificial'; }
    else if (type === 'mbf') { sub = 'Fresh'; namePrefix = 'Money Bouquet Fresh Flower'; }
    else if (type === 'mbd') { sub = 'Dried'; namePrefix = 'Money Bouquet Dried Flower'; }
    else { sub = 'Custom'; namePrefix = 'Money Bouquet Custom'; }

    return {
      sku: mbMatch[0],
      cat: 'Money Bouquet',
      sub: sub,
      dir: 'money-bucket',
      namePrefix: namePrefix
    };
  }

  // Find longest matching prefix
  const prefixes = Object.keys(prefixMap).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (lowerName.startsWith(prefix)) {
      return { sku: prefix, ...prefixMap[prefix] };
    }
  }

  return null;
}

function parsePrice(filename) {
  const match = filename.match(/harga\s*([\d,\.]+[kK])/i);
  if (match) {
    let priceStr = match[1].toLowerCase().replace('k', '');
    priceStr = priceStr.replace(',', '.');
    const num = parseFloat(priceStr);
    if (!isNaN(num)) {
      return num * 1000;
    }
  }
  return 0; // 0 artinya Custom atau Ask Admin
}

async function organizeProducts() {
  console.log("🚀 Starting organization and code generation...");

  // 1. Delete old .jpg and .png files to clean up
  const deleteOldImages = (dir) => {
    if (dir.includes('uncategorized')) return;
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        deleteOldImages(itemPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
          fs.unlinkSync(itemPath);
          console.log(`🗑️ Deleted old file: ${itemPath}`);
        }
      }
    }
  };
  deleteOldImages(produkDir);

  // 2. Process uncategorized files (Move them)
  const filesToMove = fs.existsSync(uncategorizedDir) ? fs.readdirSync(uncategorizedDir).filter(f => f.toLowerCase().endsWith('.webp')) : [];

  let unknownCount = 0;

  for (const file of filesToMove) {
    const info = getPrefixInfo(file);
    if (!info) {
      console.warn(`⚠️ Skipped (Unknown prefix): ${file}`);
      unknownCount++;
      continue;
    }

    const cleanFilename = file.replace(/^Salinan\s+/i, '');
    const sourcePath = path.join(uncategorizedDir, file);
    const targetDirPath = path.join(produkDir, info.dir);
    const targetPath = path.join(targetDirPath, cleanFilename);

    if (!fs.existsSync(targetDirPath)) {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }

    // Move file
    fs.renameSync(sourcePath, targetPath);
  }

  // 3. Scan all files in produkDir to generate catalog
  const productsList = [];
  const seenIds = new Set();

  const scanCatalog = (dir) => {
    if (dir.includes('uncategorized')) return;
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        scanCatalog(itemPath);
      } else if (item.toLowerCase().endsWith('.webp')) {
        const info = getPrefixInfo(item);
        if (info) {
          const price = parsePrice(item);
          const idMatch = item.match(/^([A-Za-z0-9]+_\d+)/);
          let baseId = idMatch ? idMatch[1] : item.replace('.webp', '');
          baseId = baseId.toUpperCase();

          // Ensure uniqueness
          if (seenIds.has(baseId)) {
            let counter = 1;
            while (seenIds.has(`${baseId}_${counter}`)) {
              counter++;
            }
            baseId = `${baseId}_${counter}`;
          }
          seenIds.add(baseId);
          const id = baseId;

          const codeNumber = idMatch ? (id.includes('_') ? id.split('_')[1] : '') : '';

          let name = info.namePrefix || info.cat;
          if (codeNumber) name += ` ${codeNumber}`;
          if (id.includes('_') && !idMatch) name += ` (Custom)`; // fallback

          // Relative path for web
          const relativePath = '/images/produk/' + path.relative(produkDir, itemPath).replace(/\\/g, '/');

          productsList.push({
            id: id,
            name: name,
            category: info.cat,
            size: info.sub || "Custom",
            price: price,
            image: relativePath,
            isPopular: false,
            available: true,
          });
        }
      }
    }
  };

  scanCatalog(produkDir);

  // Gather unique sizes
  const uniqueSizes = [...new Set(productsList.map(p => p.size))].filter(Boolean);

  // 4. Generate products.js
  const jsContent = `// File ini di-generate secara otomatis oleh scripts/organize-and-generate-products.mjs

export const products = ${JSON.stringify(productsList, null, 2)};

export const categories = [
  { id: "all", label: "Semua Kategori" },
  { id: "Bouquet Artificial", label: "Bouquet Artificial" },
  { id: "Fresh Flowers", label: "Fresh Flowers" },
  { id: "Fresh Mix Artificial", label: "Fresh Mix Artificial" },
  { id: "Bloom Box", label: "Bloom Box" },
  { id: "Vas Arrangement", label: "Vas Arrangement" },
  { id: "Money Bouquet", label: "Money Bouquet" },
  { id: "Wedding Arrangement", label: "Wedding Arrangement" },
  { id: "Snack Bouquet", label: "Snack Bouquet" },
  { id: "Pipe Bouquet", label: "Pipe Bouquet" },
  { id: "Custom Bouquet", label: "Custom Bouquet" }
];

export const sizes = ${JSON.stringify(uniqueSizes, null, 2)};
`;

  fs.writeFileSync(productsFile, jsContent);
  console.log(`\n✅ Selesai! Berhasil meng-generate ${productsList.length} data produk di products.js.`);

  // 5. Generate static redirect pages in public/p/
  const pDir = path.join(__dirname, '../public/p');
  if (fs.existsSync(pDir)) {
    fs.rmSync(pDir, { recursive: true, force: true });
  }
  fs.mkdirSync(pDir, { recursive: true });

  const formatPriceIndo = (price) => {
    if (price === 0) return "Ask admin for price";
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Create OG directory if not exists
  const ogDir = path.join(__dirname, '../public/images/og');
  if (!fs.existsSync(ogDir)) {
    fs.mkdirSync(ogDir, { recursive: true });
  }

  console.log(`⏳ Menyiapkan gambar OG berukuran besar untuk ${productsList.length} produk...`);

  for (const product of productsList) {
    const ogImageFilename = `${product.id}.jpg`;
    const ogImagePath = path.join(ogDir, ogImageFilename);
    const inputImagePath = path.join(__dirname, '../public', product.image);

    if (!fs.existsSync(ogImagePath) && fs.existsSync(inputImagePath)) {
      try {
        // 1. Resize background to cover 1200x630 and blur it
        const bg = await sharp(inputImagePath)
          .resize(1200, 630, { fit: 'cover' })
          .blur(30)
          .toBuffer();

        // 2. Resize foreground to fit height of 570
        const fg = await sharp(inputImagePath)
          .resize({ height: 570, fit: 'inside' })
          .toBuffer();

        const fgMetadata = await sharp(fg).metadata();
        const leftOffset = Math.round((1200 - fgMetadata.width) / 2);
        const topOffset = Math.round((630 - fgMetadata.height) / 2);

        // 3. Composite fg on bg
        await sharp(bg)
          .composite([{ input: fg, left: leftOffset, top: topOffset }])
          .jpeg({ quality: 85 })
          .toFile(ogImagePath);
      } catch (err) {
        console.error(`⚠️ Gagal generate OG image untuk ${product.id}:`, err);
      }
    }

    const fileContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${product.name} - Jalé Florist</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Open Graph Meta Tags for WhatsApp/Social Media Link Preview -->
  <meta property="og:title" content="${product.name}" />
  <meta property="og:description" content="Pesan ${product.name} (${product.size}) seharga ${formatPriceIndo(product.price)} di Jalé Florist Bandung." />
  <meta property="og:image" content="https://testfloris2.vercel.app/images/og/${product.id}.jpg" />
  <meta property="og:url" content="https://testfloris2.vercel.app/p/${product.id}" />
  <meta property="og:type" content="product" />
  
  <!-- Redirect real users to the main website with the product query parameter -->
  <script>
    window.location.replace("/?product=${product.id}");
  </script>
  <meta http-equiv="refresh" content="0;url=/?product=${product.id}" />
</head>
<body>
  <p>Mengalihkan Anda ke Jalé Florist...</p>
</body>
</html>`;
    
    fs.writeFileSync(path.join(pDir, `${product.id}.html`), fileContent);
  }
  console.log(`✅ Generated ${productsList.length} static redirect product files in public/p/`);

  if (unknownCount > 0) {
    console.log(`⚠️ Ada ${unknownCount} file baru yang dilewati karena kodenya tidak dikenali.`);
  }
}

organizeProducts();
