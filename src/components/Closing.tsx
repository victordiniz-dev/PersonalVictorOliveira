import { Fragment, type CSSProperties } from 'react'
import { whatsappLink } from '../config'
import { ExternalLink } from './ExternalLink'

const headline = ['Comece', 'pela', 'primeira', 'conversa.']

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title" data-reveal="closing">
      <div className="wrap closing__inner">
        {/* Fecha a página com o mesmo gesto do topo: as palavras "contraem" ao aparecer */}
        <h2 id="closing-title">
          {headline.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && ' '}
              <span className="closing__word" style={{ '--i': i } as CSSProperties}>
                {word}
              </span>
            </Fragment>
          ))}
        </h2>
        <p>
          Mande uma mensagem com o seu objetivo. Eu respondo com os horários disponíveis e as
          opções de atendimento.
        </p>
        <ExternalLink
          className="btn btn--large"
          href={whatsappLink('Oi Victor! Quero começar a treinar.')}
        >
          Chamar no WhatsApp
        </ExternalLink>
      </div>
    </section>
  )
}
