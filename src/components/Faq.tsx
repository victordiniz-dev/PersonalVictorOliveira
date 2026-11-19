import { faqs } from '../content'

/** As mesmas perguntas alimentam o JSON-LD FAQPage (src/seo.ts). */
export function Faq() {
  return (
    <section className="section" id="duvidas" aria-labelledby="duvidas-title">
      <div className="wrap faq">
        <header className="section__head" data-reveal="up">
          <h2 id="duvidas-title">Dúvidas frequentes</h2>
        </header>

        <div className="faq__list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
