// Entrada usada só no build (scripts/prerender.mjs) para gerar o HTML estático.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'

export { structuredData } from './seo'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
