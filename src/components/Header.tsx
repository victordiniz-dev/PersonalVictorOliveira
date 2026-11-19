import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { whatsappLink } from '../config'
import { ExternalLink } from './ExternalLink'

const navItems = [
  { href: '#objetivos', label: 'Objetivos' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#duvidas', label: 'Dúvidas' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  // Um só listener de rolagem, limitado a um quadro por vez (requestAnimationFrame):
  // borda do header, esconder ao descer / mostrar ao subir e barra de progresso.
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current?.style.setProperty('--progress', String(max > 0 ? y / max : 0))
      setScrolled(y > 8)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 160)
        lastY = y
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Esc fecha o menu e devolve o foco ao botão
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const classes = [
    'site-header',
    scrolled && 'is-scrolled',
    hidden && !menuOpen && 'is-hidden',
    menuOpen && 'is-menu-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes}>
      <div className="wrap site-header__inner">
        <a className="brand" href="#topo" aria-label="Victor Oliveira, início">
          <span className="brand__name" translate="no">Victor Oliveira</span>
          <span className="brand__role">Personal trainer</span>
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__bars" aria-hidden="true" />
          <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>

        <nav
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          id="menu"
          aria-label="Seções da página"
        >
          <ul>
            {navItems.map((item, i) => (
              <li key={item.href} style={{ '--d': i } as CSSProperties}>
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ExternalLink
            className="btn btn--small"
            href={whatsappLink('Oi Victor! Vim pelo site e quero saber sobre os treinos.')}
            onClick={closeMenu}
          >
            Chamar no WhatsApp
          </ExternalLink>
        </nav>
      </div>
      <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </header>
  )
}
