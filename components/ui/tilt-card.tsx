'use client'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltStrength?: number
  glareEffect?: boolean
}

export function TiltCard({ 
  children, 
  className = '',
  tiltStrength = 15,
  glareEffect = true 
}: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    const percentX = deltaX / (rect.width / 2)
    const percentY = deltaY / (rect.height / 2)

    x.set(percentX)
    y.set(percentY)
    rotateX.set(-percentY * tiltStrength)
    rotateY.set(percentX * tiltStrength)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {/* Glare effect */}
      {glareEffect && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + x.get() * 50}% ${50 + y.get() * 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Card content */}
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  )
} 