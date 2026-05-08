'use client'
import { motion, useAnimation } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

interface ParticleTextProps {
  text: string
  className?: string
  particleCount?: number
  trigger?: 'hover' | 'click' | 'inView'
  resetDelay?: number
}

interface Particle {
  id: number
  x: number
  y: number
  originalX: number
  originalY: number
  char: string
  color: string
}

export function ParticleText({
  text,
  className = '',
  particleCount = 50,
  trigger = 'hover',
  resetDelay = 2000
}: ParticleTextProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isExploded, setIsExploded] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Generate particles from text
  useEffect(() => {
    if (!textRef.current) return

    const textElement = textRef.current
    const rect = textElement.getBoundingClientRect()
    const newParticles: Particle[] = []

    // Create particles for each character
    text.split('').forEach((char, index) => {
      if (char === ' ') return

      const charWidth = rect.width / text.length
      const x = (index * charWidth) + (charWidth / 2)
      const y = rect.height / 2

      // Generate multiple particles per character
      for (let i = 0; i < particleCount / text.length; i++) {
        newParticles.push({
          id: index * 100 + i,
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          originalX: x,
          originalY: y,
          char,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        })
      }
    })

    setParticles(newParticles)
  }, [text, particleCount])

  const explode = () => {
    if (isExploded) return
    
    setIsExploded(true)
    
    // Reset after delay
    setTimeout(() => {
      setIsExploded(false)
    }, resetDelay)
  }

  const handleTrigger = () => {
    if (trigger === 'hover' || trigger === 'click') {
      explode()
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
    >
      {/* Original text */}
      <motion.span
        ref={textRef}
        className="relative z-10"
        animate={{
          opacity: isExploded ? 0 : 1,
          scale: isExploded ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>

      {/* Particles */}
      {isExploded && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-sm font-bold pointer-events-none"
              style={{
                left: particle.originalX,
                top: particle.originalY,
                color: particle.color,
                textShadow: `0 0 10px ${particle.color}`,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            >
              {particle.char}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Preset variants for common use cases
export function ExplosiveTitle({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  return (
    <ParticleText
      text={text}
      className={`text-3xl font-bold cursor-pointer ${className}`}
      particleCount={100}
      trigger="click"
      resetDelay={3000}
    />
  )
}

export function HoverParticleText({ 
  text, 
  className = '' 
}: { 
  text: string
  className?: string 
}) {
  return (
    <ParticleText
      text={text}
      className={`cursor-pointer ${className}`}
      particleCount={60}
      trigger="hover"
      resetDelay={2000}
    />
  )
} 