// Pré-renderização: transforma o app React em HTML estático dentro de dist/index.html.
// Assim o Google (e quem abre o link no WhatsApp) recebe a página pronta,
// e o React só "hidrata" o HTML no navegador.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'dist', 'index.html')
const ssrDir = path.join(root, 'dist-ssr')

const { render, structuredData } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = await readFile(htmlPath, 'utf8')
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-jsonld-->')) {
  throw new Error('index.html sem os marcadores <!--app-html--> e <!--app-jsonld-->')
}

// "<" escapado para o JSON não conseguir fechar a tag <script>
const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\u003c')
const html = template
  .replace('<!--app-html-->', render())
  .replace('<!--app-jsonld-->', `<script type="application/ld+json">${jsonLd}</script>`)

await writeFile(htmlPath, html)
await rm(ssrDir, { recursive: true, force: true })
console.log('✓ HTML pré-renderizado em dist/index.html')
