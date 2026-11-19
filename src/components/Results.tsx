import { site } from '../config'
import { photos } from '../content'
import { ExternalLink } from './ExternalLink'

export function Results() {
  return (
    <section className="section section--rule" id="resultados" aria-labelledby="resultados-title">
      <div className="wrap results">
        <header className="section__head results__head">
          <h2 id="resultados-title">Resultados de quem treina comigo</h2>
          <p>
            A evolução dos alunos fica registrada nos destaques do Instagram, com antes e depois e
            relatos de quem está treinando.
          </p>
          <ExternalLink className="btn btn--ghost" href={site.instagram}>
            Ver alunos no Instagram
          </ExternalLink>
        </header>

        <ul className="results__grid">
          {photos.students.map((photo) => (
            <li key={photo.src}>
              <img
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={500}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
