// Origem: Aceternity UI — Animated Testimonials (Manu Arora), o mesmo componente
// publicado no 21st.dev. Instalado via `shadcn add` e adaptado ao site:
// - ícones Lucide (biblioteca do projeto) no lugar de @tabler/icons-react;
// - cores por tokens (text-foreground / text-muted-foreground) e tipografia condensada;
// - rotação determinística por índice (Math.random quebrava a hidratação do HTML pré-renderizado);
// - botões com nome acessível, alvo de 44px e região aria-live para a troca de depoimento;
// - sem autoplay (movimento automático contínuo exigiria controle de pausa).
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
  /** Enquanto for texto de exemplo, mostra a etiqueta "exemplo" na tela. */
  placeholder?: boolean
}

/** Inclinação fixa por posição: igual no servidor e no navegador. */
const tilt = (index: number) => ((index * 7) % 21) - 10

export function AnimatedTestimonials({
  testimonials,
  className,
}: {
  testimonials: Testimonial[]
  className?: string
}) {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  const next = () => setActive((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <div className={cn('grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20', className)}>
      <div className="relative aspect-[4/5] w-full max-w-md [perspective:1000px]">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => {
            const isActive = index === active
            return (
              <motion.div
                key={testimonial.src}
                initial={{ opacity: 0, scale: 0.9, z: -100, rotate: tilt(index) }}
                animate={{
                  opacity: isActive ? 1 : 0.55,
                  scale: isActive ? 1 : 0.94,
                  z: isActive ? 0 : -100,
                  rotate: isActive ? 0 : tilt(index),
                  zIndex: isActive ? 40 : testimonials.length + 2 - index,
                  y: isActive ? [0, -60, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, z: 100 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 origin-bottom"
                aria-hidden={!isActive}
              >
                <img
                  src={testimonial.src}
                  alt={isActive ? `Foto de ${testimonial.name}` : ''}
                  width={400}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-full rounded-xl object-cover object-center"
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-between gap-10">
        <motion.figure
          key={active}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
          className="flex flex-col gap-6"
        >
          <blockquote className="text-foreground text-xl leading-snug md:text-2xl">
            {current.quote.split(' ').map((word, index) => (
              <motion.span
                key={`${active}-${index}`}
                initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.02 * index }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </blockquote>
          <figcaption className="flex flex-col gap-1">
            <span className="text-foreground text-2xl font-extrabold [font-stretch:68%]">
              {current.name}
            </span>
            <span className="text-muted-foreground text-sm">{current.designation}</span>
            {current.placeholder && (
              <span className="testimonial-placeholder">Depoimento de exemplo, trocar pelo real</span>
            )}
          </figcaption>
        </motion.figure>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Depoimento anterior"
            className="testimonial-nav group/button"
          >
            <ArrowLeft className="transition-transform duration-300 group-hover/button:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo depoimento"
            className="testimonial-nav group/button"
          >
            <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </button>
          <span className="text-muted-foreground ml-2 text-sm tabular-nums" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
