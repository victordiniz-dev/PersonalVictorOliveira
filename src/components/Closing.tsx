import { whatsappLink } from '../config'
import { ExternalLink } from './ExternalLink'

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="wrap closing__inner">
        <h2 id="closing-title">Comece pela primeira conversa.</h2>
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
