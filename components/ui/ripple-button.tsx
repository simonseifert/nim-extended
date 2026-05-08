'use client'
import { useState, useRef, MouseEvent } from 'react'
import { motion } from 'motion/react'

interface RippleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

interface Ripple {
  x: number
  y: number
  id: number
}

export function RippleButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  size = 'md'
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const rippleId = useRef(0)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple: Ripple = {
      x,
      y,
      id: rippleId.current++
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  const baseClasses = "relative overflow-hidden transition-all duration-300 font-medium rounded-lg"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
    ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ 
            width: 0, 
            height: 0, 
            x: '-50%', 
            y: '-50%',
            opacity: 0.8 
          }}
          animate={{ 
            width: 300, 
            height: 300, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut" 
          }}
        />
      ))}
    </motion.button>
  )
} 