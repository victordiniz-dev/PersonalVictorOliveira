# Victor Oliveira · Personal Trainer

Landing page do [@victoroliveira.personal](https://www.instagram.com/victoroliveira.personal/), personal trainer em Vila Velha (ES).

React 19 + TypeScript + Vite. No build, a página é **pré-renderizada**: o HTML completo já vai pronto no `dist/index.html` (bom para o Google e para a prévia do link no WhatsApp), e o React só "hidrata" esse HTML no navegador.

## Rodar

Precisa do [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install       # só na primeira vez
npm run dev       # abre em http://localhost:5173 e atualiza ao salvar
```

Para ver exatamente o que vai ao ar:

```bash
npm run build     # typecheck + build + pré-renderização em dist/
npm run preview   # serve o dist/ em http://localhost:4173
```

Deploy: importar o repositório na Vercel (framework "Vite", comando `npm run build`, saída `dist`).

## Estrutura

```
index.html            <head> com SEO; o corpo vem do React
src/
  main.tsx            entrada do navegador (hidrata o HTML pré-renderizado)
  entry-server.tsx    entrada do build, gera o HTML estático
  App.tsx             monta as seções
  components/         uma seção por arquivo (Hero, Goals, Modes, Steps...)
  content.ts          todos os textos, tipados (objetivos, planos, FAQ, fotos)
  config.ts           dados de contato lidos do .env + link do WhatsApp
  seo.ts              JSON-LD gerado a partir do content.ts
  styles.css          estilos
scripts/prerender.mjs injeta o HTML e o JSON-LD no dist/index.html
```

Para mudar um texto, edite `src/content.ts`. As perguntas do FAQ alimentam ao mesmo tempo a seção da página e o JSON-LD `FAQPage`.

## Antes de publicar (pendências)

Os dados do contato ficam em um lugar só, o arquivo [`.env`](.env). O `<head>` usa os valores via `%VITE_...%` e o React via `import.meta.env` (ver `src/config.ts`). Esse `.env` vai para o Git porque só tem dados públicos (eles aparecem no HTML de qualquer jeito); nada secreto entra nele. Se preferir, cadastre os valores nas variáveis de ambiente da Vercel, que têm prioridade.

- [ ] `VITE_WHATSAPP`: número real (só dígitos, `55` + DDD + número)
- [ ] `VITE_PHONE_DISPLAY`: o mesmo número formatado
- [ ] `VITE_CREF`: número do CREF
- [ ] `VITE_SITE_URL`: domínio definitivo (canonical, Open Graph, sitemap e dados estruturados usam ele)
- [ ] Fotos em `public/img/` (hoje são placeholders `.svg`). Trocar por `.webp`/`.jpg` e atualizar o `src` em `src/content.ts` (objeto `photos`):
  - `victor-hero` — Victor treinando um aluno, vertical 4:5 (~1200×1500)
  - `victor-sobre` — retrato do Victor, vertical 4:5
  - `aluno-1` a `aluno-4` — alunos (com autorização de uso de imagem), 4:5
- [ ] **Depoimentos:** os 3 textos em `src/content.ts` (`testimonials`) são EXEMPLOS e aparecem com a etiqueta "Depoimento de exemplo". Trocar por depoimentos reais (com autorização) e apagar `placeholder: true`. Não publicar com texto inventado
- [ ] **Antes e depois:** trocar `public/img/antes.svg` e `depois.svg` por fotos reais de um aluno (mesmo enquadramento, 4:5) e ajustar `beforeAfter` em `src/content.ts`
- [ ] Atualizar de vez em quando `instagramFollowers` em `src/content.ts` (hoje 1.400)
- [ ] Revisar os textos com o Victor (local das aulas presenciais, o que entra na consultoria, FAQ)
- [ ] Depois do deploy: cadastrar o site no Google Search Console e enviar o `sitemap.xml`
- [ ] Criar/atualizar o Perfil da Empresa no Google (Google Meu Negócio) apontando para o site; é o que mais pesa na busca local "personal trainer Vila Velha"
- [ ] Colocar o link do site na bio do Instagram

## SEO incluído

- `title` e `description` com a busca principal ("personal trainer em Vila Velha")
- Um único `h1`, hierarquia de títulos e HTML semântico
- Canonical, Open Graph e Twitter Card (`public/og-image.png`, 1200×630)
- Dados estruturados JSON-LD: `Person`, `LocalBusiness` (área atendida: Vila Velha e Brasil), `WebSite` e `FAQPage`
- `robots.txt` e `sitemap.xml` gerados no build a partir de `VITE_SITE_URL`
- Fonte auto-hospedada (Archivo variável), imagens com `width`/`height`, `loading="lazy"` abaixo da dobra
- Página 404 própria (`public/404.html`, com `noindex`) e manifesto com ícones 192, 512 e maskable

## Design

Editorial esportivo: grafite `#222529`, giz `#EDEBE5` e laranja-sinal `#FF5B1A`. Uma família só, a Archivo variável, usando o eixo de largura: condensada nos títulos e normal no texto. O único movimento automático é o título do hero "contraindo" de largo para condensado ao carregar; ele é desligado para quem usa "reduzir movimento".

## Antes de publicar: conferência automática

`npm run check:launch` lista o que ainda é provisório (WhatsApp, CREF, telefone, depoimentos de exemplo, fotos de marcação). O mesmo script roda em todo `npm run build`: localmente só avisa, mas **no deploy de produção da Vercel ele faz o build falhar** enquanto houver dado provisório. Deploys de preview só avisam.

## Segurança

- Cabeçalhos HTTP em `vercel.json`: CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP e HSTS. O `npm run preview` usa os mesmos cabeçalhos, então dá para testar a CSP localmente.
- A CSP libera o script inline do `<head>` pelo hash. Se esse script mudar, o build falha e mostra o hash novo para colocar no `vercel.json`.
- Ao adicionar serviços externos (estatísticas, mapas, vídeos), libere o domínio deles na CSP.
- Se o JavaScript não iniciar em 4s, o script do `<head>` desliga as animações e mostra todo o conteúdo.

## Componentes do 21st.dev

O 21st.dev hoje exige conta para liberar o código. Os componentes abaixo são os mesmos que ele publica, instalados das bibliotecas abertas de origem com `npx shadcn@latest add` (base Tailwind v4 + shadcn em `components.json`, tokens mapeados para a paleta do site em `src/index.css`). Cada arquivo em `src/components/ui/` tem no topo a origem e o que foi adaptado.

| Componente | Origem | Onde |
|---|---|---|
| Animated Testimonials | Aceternity UI | seção Depoimentos |
| Image Comparison | Motion Primitives | Resultados (antes e depois) |
| Number Ticker | Magic UI | Resultados (seguidores) |
| Text Scramble | Motion Primitives | séries da ficha (5×5…) |
| Magic Card | Magic UI | painéis de atendimento |

Adaptações principais: cores e fonte do site, acessibilidade (teclado no comparador, nomes nos botões, leitor de tela), sem quebrar a pré-renderização (nada de `Math.random` no render, o contador já sai com o número real no HTML) e respeito a "reduzir movimento" via `MotionConfig`.

## Skills do Claude

`.claude/skills/` tem as mesmas skills do projeto AstroClock (brainstorming, web-design-guidelines, webapp-testing, verification-before-completion etc.).
