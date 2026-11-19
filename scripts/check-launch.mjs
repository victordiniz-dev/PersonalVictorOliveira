// Confere se o site ainda tem dados provisórios antes de ir ao ar.
//
// - `npm run build` local: só avisa (dá para trabalhar com os dados de exemplo).
// - Deploy de PRODUÇÃO na Vercel (VERCEL_ENV=production) ou `npm run check:launch`:
//   falha, para o site nunca ir ao ar com WhatsApp falso, CREF falso, depoimentos
//   inventados ou fotos de marcação. Deploys de preview da Vercel só avisam.
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const strict = process.argv.includes('--strict') || process.env.VERCEL_ENV === 'production'

// Mesma ordem de prioridade do Vite: variáveis do ambiente > .env.production(.local) > .env
function loadEnv() {
  const env = {}
  for (const file of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    const full = path.join(root, file)
    if (!existsSync(full)) continue
    for (const line of readFileSync(full, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (match) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  }
  for (const key of Object.keys(env)) if (process.env[key]) env[key] = process.env[key]
  return env
}

const env = loadEnv()
const content = readFileSync(path.join(root, 'src', 'content.ts'), 'utf8')
const problems = []

if (!/^55\d{10,11}$/.test(env.VITE_WHATSAPP ?? '') || /9{8,}/.test(env.VITE_WHATSAPP ?? '')) {
  problems.push('VITE_WHATSAPP ainda é o número de exemplo (todos os botões levariam a um número inexistente).')
}
if (!env.VITE_CREF || /^0+/.test(env.VITE_CREF)) {
  problems.push('VITE_CREF ainda é o número de exemplo (o CONFEF exige o CREF real na divulgação).')
}
if (/9999-9999/.test(env.VITE_PHONE_DISPLAY ?? '')) {
  problems.push('VITE_PHONE_DISPLAY ainda é o telefone de exemplo.')
}
if (!env.VITE_SITE_URL || /example\.com/.test(env.VITE_SITE_URL)) {
  problems.push('VITE_SITE_URL não está definido com o domínio real.')
}
if (/placeholder:\s*true/.test(content)) {
  problems.push('Há depoimentos de EXEMPLO em src/content.ts (placeholder: true). Não publicar texto inventado.')
}
const placeholderImages = [...content.matchAll(/'\/img\/[\w-]+\.svg'/g)].map((m) => m[0])
if (placeholderImages.length) {
  problems.push(`Fotos ainda são marcadores (.svg): ${[...new Set(placeholderImages)].join(', ')}`)
}

if (problems.length === 0) {
  console.log('✓ Pronto para publicar: nenhum dado provisório encontrado.')
  console.log(`  Confira o domínio: ${env.VITE_SITE_URL}`)
} else {
  const header = strict
    ? '✗ Deploy de produção bloqueado: o site ainda tem dados provisórios.'
    : '⚠ Aviso: o site ainda tem dados provisórios (ok para desenvolver; o deploy de produção vai falhar).'
  console[strict ? 'error' : 'warn'](`\n${header}\n${problems.map((p) => `  - ${p}`).join('\n')}\n`)
  if (strict) process.exit(1)
}
