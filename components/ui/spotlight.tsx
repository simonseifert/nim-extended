'use client'
import React, { useEffect, useState } from 'react'

interface SpotlightProps {
  className?: string
  size?: number
}

export function Spotlight({ className = '', size = 200 }: SpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if we're on a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      return // Don't show spotlight on touch devices
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) {
        setIsVisible(true)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${className}`}
      style={{
        background: `radial-gradient(circle ${size}px at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(255, 255, 255, 0.02) 0%, 
          rgba(255, 255, 255, 0.015) 20%, 
          rgba(59, 130, 246, 0.008) 40%, 
          rgba(59, 130, 246, 0.004) 60%, 
          rgba(59, 130, 246, 0.002) 80%, 
          transparent 100%)`,
        filter: 'blur(1px)',
      }}
    />
  )
}
