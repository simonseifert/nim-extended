'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

interface TextScrambleProps {
  children: string
  className?: string
  trigger?: 'hover' | 'view'
  speed?: number
}

export function TextScramble({ 
  children, 
  className = '', 
  trigger = 'hover',
  speed = 50 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children)
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const scramble = () => {
    if (isScrambling) return
    
    setIsScrambling(true)
    const originalText = children
    let iterations = 0
    const maxIterations = originalText.length

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iterations += 1/3

      if (iterations >= maxIterations) {
        clearInterval(interval)
        setDisplayText(originalText)
        setIsScrambling(false)
      }
    }, speed)
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble()
    }
  }

  useEffect(() => {
    if (trigger === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeoutRef.current = setTimeout(scramble, Math.random() * 1000)
          }
        },
        { threshold: 0.5 }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        observer.disconnect()
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [trigger])

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {displayText}
    </motion.span>
  )
} 