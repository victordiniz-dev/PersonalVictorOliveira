import type { CSSProperties } from 'react'
import { steps } from '../content'

export function Steps() {
  return (
    <section className="section" id="como-funciona" aria-labelledby="processo-title">
      <div className="wrap">
        <header className="section__head" data-reveal="up">
          <h2 id="processo-title">Como funciona</h2>
          <p>Do primeiro contato ao primeiro treino, sem enrolação.</p>
        </header>

        {/* Sequência real: a numeração vem do contador CSS da <ol>.
            Ao entrar na tela, uma linha laranja percorre os passos em ordem. */}
        <ol className="steps" data-reveal="steps">
          {steps.map((step, i) => (
            <li className="step" key={step.title} style={{ '--d': i } as CSSProperties}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
