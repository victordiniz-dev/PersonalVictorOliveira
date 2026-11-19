// Origem: Magic UI — Number Ticker, também publicado no 21st.dev.
// Instalado via `shadcn add` e adaptado:
// - o HTML pré-renderizado já traz o valor final (Google e quem está sem JS veem o número
//   real, não "0"); a contagem só começa no navegador, quando o número entra na tela;
// - formato brasileiro (pt-BR: 1.400) e cor herdada do contexto;
// - sem contagem para quem pede "reduzir movimento".
import { useEffect, useLayoutEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number
  startValue?: number
  delay?: number
  decimalPlaces?: number
  locale?: string
}

// useLayoutEffect avisa no servidor; no build pré-renderizado usamos useEffect.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function NumberTicker({
  value,
  startValue = 0,
  delay = 0,
  className,
  decimalPlaces = 0,
  locale = 'pt-BR',
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(startValue)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  const format = (n: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(n.toFixed(decimalPlaces)))

  // Antes da primeira pintura: volta ao valor inicial para poder contar.
  useIsoLayoutEffect(() => {
    if (!reduceMotion && ref.current) ref.current.textContent = format(startValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isInView || reduceMotion) return
    const timer = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, isInView, delay, value, reduceMotion])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [springValue, decimalPlaces, locale],
  )

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)} {...props}>
      {format(value)}
    </span>
  )
}
