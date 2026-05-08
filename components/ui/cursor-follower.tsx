'use client'
import React, { useEffect, useRef, useState } from 'react'

interface CursorFollowerProps {
  className?: string
}

export function CursorFollower({ className = '' }: CursorFollowerProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Check if we're on a touch device or mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      return // Don't show cursor follower on touch devices
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Show cursor follower on first mouse movement
      if (!isVisible) {
        setIsVisible(true)
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select') !== null
      setIsHovering(isInteractive)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-30 transition-all duration-150 ease-out ${className}`}
      style={{
        left: mousePos.x - 16,
        top: mousePos.y - 16,
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {/* Simple ring cursor */}
      <div 
        className={`h-8 w-8 rounded-full border-2 transition-all duration-200 ${
          isHovering 
            ? 'border-white/80 dark:border-white/80 scale-150' 
            : 'border-zinc-400/40 dark:border-zinc-500/40 scale-100'
        }`}
      />
    </div>
  )
} 