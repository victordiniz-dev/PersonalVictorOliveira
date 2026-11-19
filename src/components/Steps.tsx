import { steps } from '../content'

export function Steps() {
  return (
    <section className="section" id="como-funciona" aria-labelledby="processo-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="processo-title">Como funciona</h2>
          <p>Do primeiro contato ao primeiro treino, sem enrolação.</p>
        </header>

        {/* Sequência real: a numeração vem do contador CSS da <ol> */}
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
