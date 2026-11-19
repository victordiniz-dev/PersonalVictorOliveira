import { useEffect, useState, type RefObject } from 'react'
import { whatsappLink } from '../config'
import { ExternalLink } from './ExternalLink'

interface StickyCtaProps {
  /** O botão aparece quando esta seção (o hero) sai da tela. */
  watchRef: RefObject<HTMLElement | null>
}

/** Atalho fixo de WhatsApp no celular (escondido no desktop pelo CSS). */
export function StickyCta({ watchRef }: StickyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = watchRef.current
    if (!target || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    observer.observe(target)
    return () => observer.disconnect()
  }, [watchRef])

  return (
    <ExternalLink
      className={`sticky-cta${visible ? ' is-visible' : ''}`}
      href={whatsappLink('Oi Victor! Vim pelo site e quero saber sobre os treinos.')}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      Chamar no WhatsApp
    </ExternalLink>
  )
}
