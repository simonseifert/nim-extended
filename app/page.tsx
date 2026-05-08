import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function Personal() {
  return (
    <main className="space-y-32">
      {/* Hero Section - Strong first impression with key metrics */}
      <Hero />
      
      {/* About Section - Tell the story behind the metrics */}
      <About />
      
      {/* Services Section - How I can help */}
      <Services />
      
      {/* Projects Section - Proof through real work */}
      <Projects />
      
      {/* Contact Section - Clear call to action */}
      <Contact />
    </main>
  )
}
