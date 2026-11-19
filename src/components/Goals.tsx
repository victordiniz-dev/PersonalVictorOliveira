import { goals } from '../content'

/** Objetivos apresentados como uma ficha de treino (tabela de verdade). */
export function Goals() {
  return (
    <section className="section" id="objetivos" aria-labelledby="objetivos-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="objetivos-title">Você escolhe o objetivo. O treino é montado em cima dele.</h2>
          <p>
            Cada objetivo pede uma forma diferente de treinar: carga, repetições, descanso e
            frequência mudam. É isso que separa um treino genérico de um treino feito para você.
          </p>
        </header>

        <table className="ficha">
          <caption className="sr-only">Objetivos de treino e o que muda em cada um</caption>
          <thead>
            <tr>
              <th scope="col">Objetivo</th>
              <th scope="col">O que muda no treino</th>
              <th scope="col">Para quem é</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.name}>
                <th scope="row">
                  <span className="ficha__goal">{goal.name}</span>
                </th>
                <td>{goal.training}</td>
                <td>{goal.audience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
