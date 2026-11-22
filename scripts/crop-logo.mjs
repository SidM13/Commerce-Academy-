// Crops the circular AGCA seal from the original poster and applies a circular alpha mask.
// Usage: node scripts/crop-logo.mjs <poster> <cx> <cy> <r> <outDir>
import sharp from 'sharp';
const [src, cx, cy, r, out] = [process.argv[2], ...process.argv.slice(3, 6).map(Number), process.argv[6]];
const size = r * 2;
const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`);
const seal = await sharp(src)
  .extract({ left: cx - r, top: cy - r, width: size, height: size })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(seal).toFile(`${out}/logo-agca.png`);
await sharp(seal).resize(192, 192).toFile(`${out}/icon-192.png`);
await sharp(seal).resize(32, 32).toFile(`${out}/favicon-32.png`);
await sharp(seal).resize(180, 180).flatten({ background: '#ffffff' }).toFile(`${out}/apple-touch-icon.png`);
console.log('done', size);
