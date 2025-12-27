import { tools, categoryInfo } from '../config/tools';

export function generateSitemap(baseUrl: string): string {
  const urls = [
    { loc: baseUrl, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/tools`, priority: '0.9', changefreq: 'daily' },
    { loc: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/privacy-policy`, priority: '0.5', changefreq: 'yearly' },
    { loc: `${baseUrl}/terms-conditions`, priority: '0.5', changefreq: 'yearly' },
  ];

  // Add category pages from config
  Object.keys(categoryInfo).forEach(categoryId => {
    urls.push({
      loc: `${baseUrl}/category/${categoryId}`,
      priority: '0.8',
      changefreq: 'weekly'
    });
  });

  // Add tool pages
  tools.forEach(tool => {
    urls.push({
      loc: `${baseUrl}${tool.path}`,
      priority: tool.featured ? '0.9' : '0.8',
      changefreq: 'weekly'
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// Example usage:
// console.log(generateSitemap('https://yourwebsite.com'));
