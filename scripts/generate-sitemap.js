const fs = require('fs');
const path = require('path');

// CONFIG - UPDATED TO NON-WWW TO MATCH CANONICAL AND NETLIFY PRIMARY
const BASE_URL = 'https://rentorbuyworld.com';
const CITIES_PATH = path.join(__dirname, '../data/cities.json');
const PUBLIC_PATH = path.join(__dirname, '../public/sitemap.xml');

// 1. Static Pages
const staticPages = [
  '',
  '/calculator',
  '/how-it-works',
  '/data-and-sources',
  '/privacy'
];

// 2. Read Cities
const cities = JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'));

// 3. Build XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${cities.map(city => `
  <url>
    <loc>${BASE_URL}/${city.slug}/buy-vs-rent</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

// 4. Write File
fs.writeFileSync(PUBLIC_PATH, xml);
console.log(`✅ Sitemap generated with ${staticPages.length + cities.length} URLs using Primary Domain (non-www)`);