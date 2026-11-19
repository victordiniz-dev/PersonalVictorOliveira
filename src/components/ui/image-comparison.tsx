// Origem: Motion Primitives — Image Comparison (ibelick), também publicado no 21st.dev.
// Instalado via `shadcn add` e adaptado:
// - acessível pelo teclado (setas, Home/End) com role="slider" e aria-valuenow;
// - nome acessível via `label`;
// - touch-action: pan-y para o arraste horizontal não brigar com a rolagem da página;
// - imagens com loading="lazy".
import { createContext, useContext, useState, type KeyboardEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'motion/react'

import { cn } from '@/lib/utils'

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number
      motionSliderPosition: MotionValue<number>
    }
  | undefined
>(undefined)

function useComparison() {
  const context = useContext(ImageComparisonContext)
  if (!context) throw new Error('Use dentro de <ImageComparison>')
  return context
}

export type ImageComparisonProps = {
  children: ReactNode
  /** Nome acessível do controle, ex.: "Comparar antes e depois". */
  label: string
  className?: string
  enableHover?: boolean
  springOptions?: SpringOptions
}

const DEFAULT_SPRING_OPTIONS = { bounce: 0, duration: 0 }
const KEY_STEP = 5

function ImageComparison({
  children,
  label,
  className,
  enableHover,
  springOptions,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false)
  const motionValue = useMotionValue(50)
  const motionSliderPosition = useSpring(motionValue, springOptions ?? DEFAULT_SPRING_OPTIONS)
  const [sliderPosition, setSliderPosition] = useState(50)

  const setPosition = (value: number) => {
    const clamped = Math.min(Math.max(value, 0), 100)
    motionValue.set(clamped)
    setSliderPosition(clamped)
  }

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const clientX =
      'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX
    setPosition(((clientX - rect.left) / rect.width) * 100)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowLeft: sliderPosition - KEY_STEP,
      ArrowDown: sliderPosition - KEY_STEP,
      ArrowRight: sliderPosition + KEY_STEP,
      ArrowUp: sliderPosition + KEY_STEP,
      Home: 0,
      End: 100,
    }
    if (event.key in moves) {
      event.preventDefault()
      setPosition(moves[event.key])
    }
  }

  return (
    <ImageComparisonContext.Provider value={{ sliderPosition, motionSliderPosition }}>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% da foto de antes visível`}
        className={cn(
          'relative touch-pan-y overflow-hidden select-none',
          enableHover ? 'cursor-ew-resize' : 'cursor-grab active:cursor-grabbing',
          className,
        )}
        onKeyDown={handleKeyDown}
        onMouseMove={handleDrag}
        onMouseDown={(event) => {
          if (enableHover) return
          setIsDragging(true)
          handleDrag(event)
        }}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  )
}

function ImageComparisonImage({
  className,
  alt,
  src,
  position,
}: {
  className?: string
  alt: string
  src: string
  position: 'left' | 'right'
}) {
  const { motionSliderPosition } = useComparison()
  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`)
  const rightClipPath = useTransform(motionSliderPosition, (value) => `inset(0 ${100 - value}% 0 0)`)

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn('absolute inset-0 size-full object-cover', className)}
      style={{ clipPath: position === 'left' ? leftClipPath : rightClipPath }}
    />
  )
}

function ImageComparisonSlider({ className, children }: { className?: string; children?: ReactNode }) {
  const { motionSliderPosition } = useComparison()
  const left = useTransform(motionSliderPosition, (value) => `${value}%`)

  return (
    <motion.div
      aria-hidden="true"
      className={cn('absolute top-0 bottom-0 w-1 cursor-ew-resize', className)}
      style={{ left }}
    >
      {children}
    </motion.div>
  )
}

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider }
