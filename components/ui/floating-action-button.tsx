'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, useState, MouseEvent } from 'react'

interface FloatingActionButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'danger'
  tooltip?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export function FloatingActionButton({
  icon,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary',
  tooltip,
  position = 'bottom-right'
}: FloatingActionButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Magnetic effect using motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const offsetX = e.clientX - centerX
    const offsetY = e.clientY - centerY
    
    x.set(offsetX)
    y.set(offsetY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
    setShowTooltip(false)
  }

  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25',
    secondary: 'bg-white text-zinc-900 hover:bg-zinc-50 shadow-lg shadow-zinc-500/25 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25'
  }

  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  }

  return (
    <>
      <motion.button
        ref={ref}
        className={`
          ${positions[position]}
          ${sizes[size]}
          ${variants[variant]}
          ${className}
          rounded-full
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110
          active:scale-95
          z-50
          backdrop-blur-sm
          border border-white/10
        `}
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true)
          setShowTooltip(true)
        }}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 0.5, ease: "easeInOut" },
            scale: { duration: 0.2 }
          }}
        >
          {icon}
        </motion.div>

        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 0.3 : 0
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          className={`
            fixed z-50 px-3 py-2 text-sm font-medium text-white bg-black/80 backdrop-blur-sm rounded-lg
            pointer-events-none
            ${position.includes('right') ? 'right-20' : 'left-20'}
            ${position.includes('bottom') ? 'bottom-8' : 'top-8'}
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showTooltip ? 1 : 0,
            scale: showTooltip ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
        >
          {tooltip}
        </motion.div>
      )}
    </>
  )
} 