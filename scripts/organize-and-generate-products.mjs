import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uncategorizedDir = path.join(__dirname, '../public/images/produk/uncategorized');
const produkDir = path.join(__dirname, '../public/images/produk');
const productsFile = path.join(__dirname, '../src/data/products.js');

// Map prefixes to categories and subdirectories
const prefixMap = {
  // Bouquet Artificial
  'bap': { cat: 'Bouquet Artificial', sub: 'Petite', dir: 'bouquet-artificial/petite' },
  'bas': { cat: 'Bouquet Artificial', sub: 'Small', dir: 'bouquet-artificial/s' },
  'bam': { cat: 'Bouquet Artificial', sub: 'Medium', dir: 'bouquet-artificial/m' },
  'bal': { cat: 'Bouquet Artificial', sub: 'Large', dir: 'bouquet-artificial/l' },
  'baxl': { cat: 'Bouquet Artificial', sub: 'XL', dir: 'bouquet-artificial/xl' },
  'baxxl': { cat: 'Bouquet Artificial', sub: 'XXL', dir: 'bouquet-artificial/xxl' },
  'bahs': { cat: 'Bouquet Artificial', sub: 'Human Size', dir: 'bouquet-artificial/human-size' },

  // Bouquet Fresh
  'bfs': { cat: 'Fresh Flowers', sub: 'Small', dir: 'bouquet-fresh/s' },
  'bfm': { cat: 'Fresh Flowers', sub: 'Medium', dir: 'bouquet-fresh/m' },
  'bfl': { cat: 'Fresh Flowers', sub: 'Large', dir: 'bouquet-fresh/l' },
  'bfxl': { cat: 'Fresh Flowers', sub: 'XL', dir: 'bouquet-fresh/xl' },
  'bfp': { cat: 'Fresh Flowers', sub: 'Premium', dir: 'bouquet-fresh/premium' },
  'bsf': { cat: 'Fresh Flowers', sub: 'Single Flower', dir: 'bouquet-fresh/single' },
  'bfhs': { cat: 'Fresh Flowers', sub: 'Human Size', dir: 'bouquet-fresh/human-size' },

  // Bouquet Mix
  'bfmam': { cat: 'Fresh Mix Artificial', sub: 'Medium', dir: 'bouquet-mix/m' },
  'bfmal': { cat: 'Fresh Mix Artificial', sub: 'Large', dir: 'bouquet-mix/l' },
  'bfmaxl': { cat: 'Fresh Mix Artificial', sub: 'XL', dir: 'bouquet-mix/xl' },

  // Bloom Box & Vas
  'blboxartif': { cat: 'Bloom Box & Vas', sub: 'Bloom Box Artificial', dir: 'bloom-box-vas' },
  'blboxfresh': { cat: 'Bloom Box & Vas', sub: 'Bloom Box Fresh', dir: 'bloom-box-vas' },
  'vaskacaartif': { cat: 'Bloom Box & Vas', sub: 'Vas Kaca Artificial', dir: 'bloom-box-vas' },
  'vaskacafresh': { cat: 'Bloom Box & Vas', sub: 'Vas Kaca Fresh', dir: 'bloom-box-vas' },
  'vaspetitearti': { cat: 'Bloom Box & Vas', sub: 'Vas Petite Artificial', dir: 'bloom-box-vas' },
  'vaspetite': { cat: 'Bloom Box & Vas', sub: 'Vas Petite Artificial', dir: 'bloom-box-vas' },
  'vasplasticmelaminartif': { cat: 'Bloom Box & Vas', sub: 'Vas Plastic Melamin Artificial', dir: 'bloom-box-vas' },

  // Snack Bucket
  'bsnack': { cat: 'Snack & Gift Bucket', sub: 'Snack', dir: 'snack-bucket' },

  // Wedding Arrangement
  'wedartifcar': { cat: 'Wedding Arrangement', sub: 'Wedding Car Artificial', dir: 'wedding-arrangement' },
  'wedfreshcar': { cat: 'Wedding Arrangement', sub: 'Wedding Car Fresh', dir: 'wedding-arrangement' },
  'wedartif': { cat: 'Wedding Arrangement', sub: 'Artificial', dir: 'wedding-arrangement' },
  'wedfresh': { cat: 'Wedding Arrangement', sub: 'Fresh', dir: 'wedding-arrangement' },
  'wedmix': { cat: 'Wedding Arrangement', sub: 'Mix', dir: 'wedding-arrangement' },
  'wcartif': { cat: 'Wedding Arrangement', sub: 'Corsage Artificial', dir: 'wedding-arrangement' },
  'wcfresh': { cat: 'Wedding Arrangement', sub: 'Corsage Fresh', dir: 'wedding-arrangement' },

  // Custom / Gift
  'bgradartif': { cat: 'Custom Bucket', sub: 'Graduation Artificial', dir: 'custom-bucket' },
  'bgradfresh': { cat: 'Custom Bucket', sub: 'Graduation Fresh', dir: 'custom-bucket' },
  'bgradsnack': { cat: 'Custom Bucket', sub: 'Graduation Snack', dir: 'custom-bucket' },
  'blego': { cat: 'Custom Bucket', sub: 'Lego', dir: 'custom-bucket' },
  'brokokartif': { cat: 'Custom Bucket', sub: 'Rokok', dir: 'custom-bucket' },
  'bphotoartif': { cat: 'Custom Bucket', sub: 'Photo', dir: 'custom-bucket' },
  'giftcustom': { cat: 'Custom Bucket', sub: 'Gift Custom', dir: 'custom-bucket' },
  'bdried': { cat: 'Custom Bucket', sub: 'Dried', dir: 'custom-bucket' },
  'bcsayur': { cat: 'Custom Bucket', sub: 'Sayur', dir: 'custom-bucket' },

  // Bucket Pipe
  'bpipe': { cat: 'Bucket Pipe', sub: '', dir: 'bucket-pipe' }
};

function getPrefixInfo(filename) {
  let lowerName = filename.toLowerCase().replace(/^salinan\s+/, '');
  
  // Special check for Money Bucket
  const mbMatch = lowerName.match(/^(mb[afd]?)(\d+)?lbr/);
  if (mbMatch) {
    const type = mbMatch[1];
    let sub = '';
    if (type === 'mba') sub = 'Artificial';
    else if (type === 'mbf') sub = 'Fresh';
    else if (type === 'mbd') sub = 'Dried';
    else sub = 'Custom';
    
    return {
      sku: mbMatch[0], 
      cat: 'Money Bucket',
      sub: sub,
      dir: 'money-bucket'
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
          
          let name = `${info.cat}`;
          if (info.sub) name += ` ${info.sub}`;
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
  { id: "Bloom Box & Vas", label: "Bloom Box & Vas" },
  { id: "Money Bucket", label: "Money Bucket" },
  { id: "Wedding Arrangement", label: "Wedding Arrangement" },
  { id: "Snack & Gift Bucket", label: "Snack & Gift Bucket" },
  { id: "Bucket Pipe", label: "Bucket Pipe" },
  { id: "Custom Bucket", label: "Custom Bucket" }
];

export const sizes = ${JSON.stringify(uniqueSizes, null, 2)};
`;

  fs.writeFileSync(productsFile, jsContent);
  console.log(`\n✅ Selesai! Berhasil meng-generate ${productsList.length} data produk di products.js.`);
  if (unknownCount > 0) {
    console.log(`⚠️ Ada ${unknownCount} file baru yang dilewati karena kodenya tidak dikenali.`);
  }
}

organizeProducts();
