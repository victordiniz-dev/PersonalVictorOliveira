import type { CSSProperties } from 'react'
import { whatsappLink } from '../config'
import { modes } from '../content'
import { ExternalLink } from './ExternalLink'
import { MagicCard } from '@/components/ui/magic-card'

// Luz que segue o mouse (Magic Card): laranja-sinal nos dois painéis,
// com borda que acende perto do cursor.
const glow = {
  light: { gradientColor: 'rgb(255 91 26 / 0.10)', gradientFrom: '#ff5b1a', gradientTo: '#1b1d20' },
  dark: { gradientColor: 'rgb(255 91 26 / 0.16)', gradientFrom: '#ff5b1a', gradientTo: '#edebe5' },
}

export function Modes() {
  return (
    <section className="section section--light" id="atendimento" aria-labelledby="atendimento-title">
      <div className="wrap">
        <header className="section__head" data-reveal="up">
          <h2 id="atendimento-title">Duas formas de treinar comigo</h2>
        </header>

        <div className="modes">
          {modes.map((mode, i) => {
            const tone = i === 0 ? 'light' : 'dark'
            return (
              <article
                className={`mode mode--${tone}`}
                key={mode.title}
                data-reveal="panel"
                style={{ '--d': i } as CSSProperties}
              >
                <MagicCard className="mode__card" gradientSize={260} {...glow[tone]}>
                  <div className="mode__body">
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
                  </div>
                </MagicCard>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
