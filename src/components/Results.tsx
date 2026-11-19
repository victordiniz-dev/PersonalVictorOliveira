import { site } from '../config'
import { beforeAfter, instagramFollowers } from '../content'
import { ExternalLink } from './ExternalLink'
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '@/components/ui/image-comparison'
import { NumberTicker } from '@/components/ui/number-ticker'

export function Results() {
  return (
    <section className="section section--rule" id="resultados" aria-labelledby="resultados-title">
      <div className="wrap results">
        <header className="section__head results__head" data-reveal="up">
          <h2 id="resultados-title">Resultados de quem treina comigo</h2>
          <p>
            Arraste a linha laranja para comparar o antes e o depois. Mais evoluções de alunos ficam
            nos destaques do Instagram.
          </p>

          <p className="results__stat">
            <span className="results__stat-number">
              <NumberTicker value={instagramFollowers} />+
            </span>
            <span className="results__stat-label">
              pessoas acompanham os treinos e resultados no Instagram
            </span>
          </p>

          <ExternalLink className="btn btn--ghost" href={site.instagram}>
            Ver alunos no Instagram
          </ExternalLink>
        </header>

        <figure className="results__compare" data-reveal="up">
          <ImageComparison
            label="Comparar foto de antes e depois do aluno"
            className="results__frame"
            springOptions={{ bounce: 0.2, duration: 0.4 }}
          >
            <ImageComparisonImage
              src={beforeAfter.before.src}
              alt={beforeAfter.before.alt}
              position="right"
            />
            <ImageComparisonImage
              src={beforeAfter.after.src}
              alt={beforeAfter.after.alt}
              position="left"
            />
            <ImageComparisonSlider className="results__handle">
              <span className="results__grip" />
            </ImageComparisonSlider>
            <span className="results__label results__label--before" aria-hidden="true">
              Antes
            </span>
            <span className="results__label results__label--after" aria-hidden="true">
              Depois
            </span>
          </ImageComparison>
          <figcaption className="results__caption">
            Use o mouse, o dedo ou as setas do teclado.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
