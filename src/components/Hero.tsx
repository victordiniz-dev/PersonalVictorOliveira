import type { CSSProperties, Ref } from 'react'
import { site, whatsappLink } from '../config'
import { goals, photos } from '../content'
import { ExternalLink } from './ExternalLink'

interface HeroProps {
  ref?: Ref<HTMLElement>
}

export function Hero({ ref }: HeroProps) {
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title" ref={ref}>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__kicker">Personal trainer em Vila Velha</span>
            <span className="hero__words">
              {goals.map((goal, i) => (
                // --i escalona a animação de "contração" de cada linha
                <span className="hero__line" style={{ '--i': i } as CSSProperties} key={goal.name}>
                  <span className="hero__word">{goal.name}.</span>
                  <span className="hero__rx" aria-hidden="true">
                    {goal.prescription}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p className="hero__lead">
            Treino planejado para o seu objetivo, acompanhado de perto e ajustado a cada semana.
            Presencial em Vila Velha ou por consultoria online.
          </p>

          <div className="hero__actions">
            <ExternalLink
              className="btn"
              href={whatsappLink('Oi Victor! Quero agendar uma conversa sobre treino.')}
            >
              Agendar conversa no WhatsApp
            </ExternalLink>
            <a className="link-quiet" href="#como-funciona">
              Ver como funciona
            </a>
          </div>

          <ul className="hero__facts">
            <li>Atendimento presencial em Vila Velha, ES</li>
            <li>Consultoria online para qualquer cidade</li>
            <li>CREF {site.cref}</li>
          </ul>
        </div>

        <figure className="hero__photo">
          <div className="hero__frame">
            <img
              src={photos.hero.src}
              alt={photos.hero.alt}
              width={800}
              height={1000}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="hero__tag">
            <span className="hero__tag-dot" aria-hidden="true" />
            Vila Velha, ES
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
