'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ 
  value, 
  suffix = '',
  duration = 2000,
  className = '' 
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (startTime === undefined) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation (ease-out)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const current = Math.floor(easeOutQuart * value)
      setCount(current)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isInView, value, duration])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <span className="relative z-10 font-mono">
        {count}{suffix}
      </span>
    </div>
  )
} 