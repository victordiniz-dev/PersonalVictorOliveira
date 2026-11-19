import '@fontsource-variable/archivo/wdth.css'
import './styles.css'

const header = document.querySelector('[data-header]')
const toggle = document.querySelector('[data-nav-toggle]')
const nav = document.querySelector('[data-nav]')
const hero = document.querySelector('[data-hero]')
const stickyCta = document.querySelector('[data-sticky-cta]')

// Borda do header só depois de rolar
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8)
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

// Menu no celular
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open))
  toggle.querySelector('.sr-only').textContent = open ? 'Fechar menu' : 'Abrir menu'
  nav.classList.toggle('is-open', open)
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'))
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false)
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    setMenu(false)
    toggle.focus()
  }
})

// Botão fixo de WhatsApp aparece quando o hero sai da tela
if (hero && stickyCta && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    stickyCta.classList.toggle('is-visible', !entry.isIntersecting)
  }).observe(hero)
}

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())
