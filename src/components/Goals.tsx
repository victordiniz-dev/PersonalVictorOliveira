import { useRef } from 'react'
import { useInView } from 'motion/react'
import { goals } from '../content'
import { TextScramble } from '@/components/ui/text-scramble'

/** A prescrição (5×5, 3×15…) se embaralha e assenta quando a linha aparece. */
function ScrambleOnView({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return (
    <span ref={ref}>
      <TextScramble as="span" trigger={inView} duration={0.9} speed={0.05} characterSet="0123456789×">
        {children}
      </TextScramble>
    </span>
  )
}

/** Objetivos apresentados como uma ficha de treino (tabela de verdade). */
export function Goals() {
  return (
    <section className="section" id="objetivos" aria-labelledby="objetivos-title">
      <div className="wrap">
        <header className="section__head" data-reveal="up">
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
              <tr key={goal.name} data-reveal="row">
                <th scope="row">
                  <span className="ficha__goal">{goal.name}</span>
                  <span className="ficha__rx">
                    <span className="sr-only">Exemplo de prescrição: </span>
                    <ScrambleOnView>{goal.prescription}</ScrambleOnView>
                  </span>
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
