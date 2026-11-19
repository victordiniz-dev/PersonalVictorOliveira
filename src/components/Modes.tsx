import type { CSSProperties } from 'react'
import { whatsappLink } from '../config'
import { modes } from '../content'
import { ExternalLink } from './ExternalLink'

export function Modes() {
  return (
    <section className="section section--light" id="atendimento" aria-labelledby="atendimento-title">
      <div className="wrap">
        <header className="section__head" data-reveal="up">
          <h2 id="atendimento-title">Duas formas de treinar comigo</h2>
        </header>

        <div className="modes">
          {modes.map((mode, i) => (
            <article
              className={`mode ${i === 0 ? 'mode--light' : 'mode--dark'}`}
              key={mode.title}
              data-reveal="panel"
              style={{ '--d': i } as CSSProperties}
            >
              <p className="mode__where">{mode.where}</p>
              <h3>{mode.title}</h3>
              <p className="mode__summary">{mode.summary}</p>
              <ul className="checklist">
                {mode.includes.map((item, j) => (
                  <li key={item} style={{ '--d': j } as CSSProperties}>
                    {item}
                  </li>
                ))}
              </ul>
              <ExternalLink
                className={`btn ${i === 0 ? 'btn--dark' : ''}`}
                href={whatsappLink(mode.message)}
              >
                {mode.cta}
              </ExternalLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
