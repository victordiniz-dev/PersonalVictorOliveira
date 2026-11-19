import { testimonials } from '../content'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'

/**
 * Depoimentos. Enquanto `content.ts` tiver textos de exemplo (`placeholder: true`),
 * cada um aparece com a etiqueta "Depoimento de exemplo". Sem dados estruturados de
 * avaliação (Review) de propósito: só faz sentido com depoimentos reais.
 */
export function Testimonials() {
  return (
    <section className="section testimonials" id="depoimentos" aria-labelledby="depoimentos-title">
      <div className="wrap">
        <header className="section__head" data-reveal="up">
          <h2 id="depoimentos-title">Quem treina conta</h2>
        </header>
        <div data-reveal="up">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  )
}
