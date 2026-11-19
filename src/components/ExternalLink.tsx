import type { AnchorHTMLAttributes } from 'react'

/** Link que abre em nova aba (WhatsApp, Instagram). */
export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener" {...props} />
}
