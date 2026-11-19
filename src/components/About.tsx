import { site } from '../config'
import { photos } from '../content'
import { ExternalLink } from './ExternalLink'

export function About() {
  return (
    <section className="section section--light" id="sobre" aria-labelledby="sobre-title">
      <div className="wrap about">
        <figure className="about__photo" data-reveal="clip">
          <img
            src={photos.about.src}
            alt={photos.about.alt}
            width={600}
            height={750}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about__text" data-reveal="up">
          <h2 id="sobre-title">Sobre o Victor</h2>
          <p>
            Sou Victor Oliveira, personal trainer em Vila Velha, no Espírito Santo. Trabalho com
            treinamento de força, emagrecimento e hipertrofia, presencialmente e por consultoria
            online.
          </p>
          <p>
            Meu trabalho é tirar o achismo do treino. Cada aluno tem um plano com objetivo claro,
            cargas anotadas e ajustes feitos a partir do que os números mostram, não do que está na
            moda.
          </p>
          <dl className="about__facts">
            <div>
              <dt>Registro</dt>
              <dd>CREF {site.cref}</dd>
            </div>
            <div>
              <dt>Atendimento</dt>
              <dd>Vila Velha, ES e online</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <ExternalLink href={site.instagram}>{site.instagramHandle}</ExternalLink>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
