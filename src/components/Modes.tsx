import { whatsappLink } from '../config'
import { modes } from '../content'
import { ExternalLink } from './ExternalLink'

export function Modes() {
  return (
    <section className="section section--light" id="atendimento" aria-labelledby="atendimento-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="atendimento-title">Duas formas de treinar comigo</h2>
        </header>

        <div className="modes">
          {modes.map((mode) => (
            <article className="mode" key={mode.title}>
              <h3>{mode.title}</h3>
              <p>{mode.summary}</p>
              <ul className="checklist">
                {mode.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ExternalLink className="btn btn--dark" href={whatsappLink(mode.message)}>
                {mode.cta}
              </ExternalLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
