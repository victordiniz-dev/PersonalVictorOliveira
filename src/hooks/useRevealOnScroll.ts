import { useEffect } from 'react'

declare global {
  interface Window {
    /** Avisa o script do <head> que o app iniciou (desliga a rede de segurança). */
    __appReady?: boolean
  }
}

/**
 * Marca com `data-inview` cada elemento `[data-reveal]` quando ele entra na tela.
 * O CSS (src/motion.css) faz a animação. Um único observer serve a página toda.
 *
 * Usa um atributo que o React não controla, então não interfere na hidratação.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    window.__appReady = true
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const motionOn = document.documentElement.classList.contains('motion')

    if (!motionOn || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.setAttribute('data-inview', ''))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-inview', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
