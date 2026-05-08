import {
  Hero,
  WorkedWith,
  About,
  Services,
  Projects,
  Contact,
  BottomCTA,
} from '@/components/sections'

export default function Personal() {
  return (
    <main className="space-y-32">
      <Hero />
      <WorkedWith />
      <About />
      <Services />
      <Projects />
      <Contact />
      <BottomCTA />
    </main>
  )
}
