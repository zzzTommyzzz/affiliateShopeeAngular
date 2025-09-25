// scripts/generate-prerender-routes.js
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'assets', 'products.json');
const outPath = path.join(__dirname, '..', 'prerender-routes.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const routes = ['/'];
products.forEach(p => routes.push(`/product/${p.id}`));

fs.writeFileSync(outPath, JSON.stringify(routes, null, 2));
console.log('Wrote prerender routes to', outPath);
