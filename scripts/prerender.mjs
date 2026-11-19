// Pré-renderização: transforma o app React em HTML estático dentro de dist/index.html.
// Assim o Google (e quem abre o link no WhatsApp) recebe a página pronta,
// e o React só "hidrata" o HTML no navegador.
//
// Também confere a CSP: o hash do script inline do <head> precisa estar no
// vercel.json, senão o navegador bloquearia o script em produção.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'dist', 'index.html')
const ssrDir = path.join(root, 'dist-ssr')

const { render, structuredData } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

// Quebras de linha sempre LF: no Windows o Git entrega CRLF e na Vercel LF,
// e o hash da CSP mudaria conforme a máquina.
const template = (await readFile(htmlPath, 'utf8')).replace(/\r\n/g, '\n')
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-jsonld-->')) {
  throw new Error('index.html sem os marcadores <!--app-html--> e <!--app-jsonld-->')
}

// "<" vira a sequência < dentro do JSON, para nenhum texto conseguir fechar a
// tag <script> (ex.: "</script>" num depoimento). Atenção: precisa ser '\\u003c'.
const jsonLd = JSON.stringify(structuredData()).replace(/</g, '\\u003c')
const html = template
  .replace('<!--app-html-->', render())
  .replace('<!--app-jsonld-->', `<script type="application/ld+json">${jsonLd}</script>`)

// CSP: todo <script> inline executável precisa ter o hash liberado no vercel.json
const vercel = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'))
const csp =
  vercel.headers
    ?.flatMap((rule) => rule.headers)
    .find((header) => header.key === 'Content-Security-Policy')?.value ?? ''
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
const missing = inlineScripts
  .map((code) => `'sha256-${createHash('sha256').update(code, 'utf8').digest('base64')}'`)
  .filter((hash) => !csp.includes(hash))
if (missing.length) {
  throw new Error(
    `O script inline do index.html mudou e a CSP do vercel.json não libera o novo hash.\n` +
      `Troque o hash antigo em script-src por: ${missing.join(' ')}`,
  )
}

await writeFile(htmlPath, html)
await rm(ssrDir, { recursive: true, force: true })
console.log('✓ HTML pré-renderizado em dist/index.html (CSP conferida)')
