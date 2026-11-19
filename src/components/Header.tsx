import { useEffect, useRef, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Borda do header só depois de rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap site-header__inner">
        <a className="brand" href="#topo" aria-label="Victor Oliveira, início">
          <span className="brand__name">Victor Oliveira</span>
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
            {navItems.map((item) => (
              <li key={item.href}>
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
    </header>
  )
}
