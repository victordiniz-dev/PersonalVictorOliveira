import { useState } from 'react'

const items = [
  'Força',
  'Emagrecimento',
  'Hipertrofia',
  'Consultoria online',
  'Avaliação física',
  'Vila Velha, ES',
]

/**
 * Faixa decorativa em movimento contínuo. O texto é escondido de leitores de tela
 * (o mesmo conteúdo já aparece na página). Para no hover e tem botão de pausa,
 * já que é um movimento automático de mais de 5 segundos (WCAG 2.2.2).
 * A lista é repetida duas vezes para o loop ficar sem emenda.
 */
export function Ticker() {
  const [paused, setPaused] = useState(false)

  const row = (copy: number) => (
    <ul className="ticker__row" key={copy}>
      {items.map((item, i) => (
        <li key={item} className={i % 2 ? 'ticker__item ticker__item--outline' : 'ticker__item'}>
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`ticker${paused ? ' is-paused' : ''}`}>
      <div className="ticker__track" aria-hidden="true">
        {[0, 1].map(row)}
      </div>
      <button
        type="button"
        className="ticker__toggle"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        <span aria-hidden="true" className={paused ? 'icon-play' : 'icon-pause'} />
        <span className="sr-only">{paused ? 'Retomar a faixa animada' : 'Pausar a faixa animada'}</span>
      </button>
    </div>
  )
}
