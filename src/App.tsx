import { useRef } from 'react'
import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Closing } from './components/Closing'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Goals } from './components/Goals'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Modes } from './components/Modes'
import { Results } from './components/Results'
import { Steps } from './components/Steps'
import { StickyCta } from './components/StickyCta'
import { Testimonials } from './components/Testimonials'
import { Ticker } from './components/Ticker'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'

export function App() {
  const heroRef = useRef<HTMLElement>(null)
  useRevealOnScroll()

  // reducedMotion="user": os componentes com motion (vindos do 21st.dev) respeitam
  // "reduzir movimento" do sistema, como o resto da página.
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero ref={heroRef} />
        <Ticker />
        <Goals />
        <Modes />
        <Steps />
        <Results />
        <Testimonials />
        <About />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <StickyCta watchRef={heroRef} />
    </MotionConfig>
  )
}
