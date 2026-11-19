import { site, whatsappLink } from '../config'
import { ExternalLink } from './ExternalLink'

// Ano fixado no build (vite.config.ts): o HTML pré-renderizado e o navegador
// sempre mostram o mesmo valor, sem erro de hidratação na virada do ano.
const year = __BUILD_YEAR__

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p className="site-footer__mark" aria-hidden="true" data-reveal="mark" translate="no">
          {site.name}
        </p>
        <p className="site-footer__brand">
          <strong translate="no">{site.name}</strong>
          <br />
          Personal trainer em Vila Velha, ES
          <br />
          CREF {site.cref}
        </p>
        <ul className="site-footer__links">
          <li>
            <ExternalLink href={site.instagram}>Instagram</ExternalLink>
          </li>
          <li>
            <ExternalLink href={whatsappLink()}>WhatsApp {site.phoneDisplay}</ExternalLink>
          </li>
        </ul>
        <p className="site-footer__copy">
          © {year} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
