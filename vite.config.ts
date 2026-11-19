import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { readFileSync } from 'node:fs'

// Gera robots.txt e sitemap.xml no build do cliente a partir de VITE_SITE_URL,
// para que o domínio fique definido num lugar só (.env).
function seoFiles(siteUrl: string): Plugin {
  const site = siteUrl.replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)
  return {
    name: 'seo-files',
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild,
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

// Pré-carrega a fonte do título (Archivo, subconjunto latino). O nome do arquivo tem
// hash e muda a cada build, então o <link rel="preload"> é injetado depois do bundle.
// Sem isso o navegador só descobre a fonte depois de baixar o CSS.
function preloadFont(): Plugin {
  return {
    name: 'preload-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const font = Object.keys(ctx.bundle ?? {}).find((file) =>
          /archivo-latin-wdth-normal.*\.woff2$/.test(file),
        )
        if (!font) return []
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

// `npm run preview` usa os mesmos cabeçalhos de segurança do vercel.json,
// para a CSP poder ser testada localmente antes do deploy.
function vercelHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync(path.resolve(__dirname, 'vercel.json'), 'utf8')) as {
    headers?: { source: string; headers: { key: string; value: string }[] }[]
  }
  const all = config.headers?.find((rule) => rule.source === '/(.*)')
  return Object.fromEntries((all?.headers ?? []).map(({ key, value }) => [key, value]))
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    plugins: [
      react(),
      tailwindcss(),
      seoFiles(env.VITE_SITE_URL || 'https://example.com'),
      preloadFont(),
    ],
    define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
    preview: { headers: vercelHeaders() },
  }
})
