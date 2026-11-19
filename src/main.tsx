import '@fontsource-variable/archivo/wdth.css'
import './index.css'
import './styles.css'
import './motion.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root não encontrado no index.html')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build, o HTML já vem pré-renderizado: o React só "hidrata".
// No `npm run dev`, o #root está vazio e o React renderiza do zero.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
