// Origem: Motion Primitives — Text Scramble (ibelick), também publicado no 21st.dev.
// Instalado via `shadcn add` e adaptado:
// - o elemento animado é criado uma vez (useMemo), não a cada quadro;
// - o leitor de tela recebe só o texto final (o embaralhado fica aria-hidden);
// - respeita "reduzir movimento" e limpa o intervalo ao desmontar.
import { useEffect, useMemo, useRef, useState, type ElementType, type JSX } from 'react'
import { motion, useReducedMotion, type MotionProps } from 'motion/react'

export type TextScrambleProps = {
  children: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: ElementType
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
} & MotionProps

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = useMemo(
    () => motion.create(Component as keyof JSX.IntrinsicElements),
    [Component],
  )
  const reduceMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState(children)
  const running = useRef(false)
  const text = children

  useEffect(() => {
    if (!trigger || reduceMotion || running.current) return
    running.current = true

    const steps = duration / speed
    let step = 0

    const interval = setInterval(() => {
      const progress = step / steps
      let scrambled = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') scrambled += ' '
        else if (progress * text.length > i) scrambled += text[i]
        else scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
      }
      setDisplayText(scrambled)
      step++

      if (step > steps) {
        clearInterval(interval)
        setDisplayText(text)
        running.current = false
        onScrambleComplete?.()
      }
    }, speed * 1000)

    return () => {
      clearInterval(interval)
      setDisplayText(text)
      running.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, reduceMotion, text])

  return (
    <MotionComponent className={className} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </MotionComponent>
  )
}
