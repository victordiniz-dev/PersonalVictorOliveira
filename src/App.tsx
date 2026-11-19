import { useRef } from 'react'
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

export function App() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero ref={heroRef} />
        <Goals />
        <Modes />
        <Steps />
        <Results />
        <About />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <StickyCta watchRef={heroRef} />
    </>
  )
}
