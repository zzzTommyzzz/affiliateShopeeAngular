// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const domain = 'https://your-domain.com'; // <- replace before running

const productsPath = path.join(__dirname, '..', 'src', 'assets', 'products.json');
const outPath = path.join(__dirname, '..', 'src', 'assets', 'sitemap.xml');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const urls = ['/', ...products.map(p => `/product/${p.id}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${domain}${u}</loc></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(outPath, xml);
console.log('Sitemap written to', outPath);
