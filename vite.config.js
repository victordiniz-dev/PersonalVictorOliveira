import { defineConfig, loadEnv } from 'vite'

// Gera robots.txt e sitemap.xml no build a partir de VITE_SITE_URL,
// para que o domínio fique definido num lugar só (.env).
function seoFiles(siteUrl) {
  const site = siteUrl.replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          '</urlset>\n',
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [seoFiles(env.VITE_SITE_URL || 'https://example.com')],
    build: { cssMinify: true },
  }
})
