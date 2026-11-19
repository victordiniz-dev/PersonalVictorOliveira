# Victor Oliveira · Personal Trainer

Landing page do [@victoroliveira.personal](https://www.instagram.com/victoroliveira.personal/), personal trainer em Vila Velha (ES).

HTML estático + CSS + um pouco de JS, com build pelo Vite. O HTML já sai pronto do build (sem renderização no navegador), o que é o melhor cenário para SEO.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (com robots.txt e sitemap.xml)
npm run preview  # serve o dist/
```

Deploy: importar o repositório na Vercel (framework "Vite", saída `dist`).

## Antes de publicar (pendências)

Os dados do contato ficam em um lugar só, o arquivo [`.env`](.env). Eles são injetados no `index.html` no build.

- [ ] `VITE_WHATSAPP`: número real (só dígitos, `55` + DDD + número)
- [ ] `VITE_PHONE_DISPLAY`: o mesmo número formatado
- [ ] `VITE_CREF`: número do CREF
- [ ] `VITE_SITE_URL`: domínio definitivo (canonical, Open Graph, sitemap e dados estruturados usam ele)
- [ ] Fotos em `public/img/` (hoje são placeholders `.svg`). Trocar por `.webp`/`.jpg` e atualizar o `src` no `index.html`:
  - `victor-hero` — Victor treinando um aluno, vertical 4:5 (~1200×1500)
  - `victor-sobre` — retrato do Victor, vertical 4:5
  - `aluno-1` a `aluno-4` — alunos (com autorização de uso de imagem), 4:5
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

## Design

Editorial esportivo: grafite `#222529`, giz `#EDEBE5` e laranja-sinal `#FF5B1A`. Uma família só, a Archivo variável, usando o eixo de largura: condensada nos títulos e normal no texto. O único movimento automático é o título do hero "contraindo" de largo para condensado ao carregar; ele é desligado para quem usa "reduzir movimento".

## Skills do Claude

`.claude/skills/` tem as mesmas skills do projeto AstroClock (brainstorming, web-design-guidelines, webapp-testing, verification-before-completion etc.).
