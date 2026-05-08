'use client'
import { motion } from 'motion/react'
import { useState } from 'react'

interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'minimal'
}

export function LiquidButton({ 
  children, 
  onClick,
  className = '',
  variant = 'primary' 
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (variant === 'minimal') {
    return (
      <motion.button
        className={`relative overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 px-6 py-3 font-medium text-zinc-900 dark:text-zinc-50 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${className}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle hover glow */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-200/50 to-zinc-300/50 dark:from-zinc-800/50 dark:to-zinc-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Button content */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }

  const baseClasses = variant === 'primary' 
    ? 'bg-blue-600 text-white hover:bg-blue-700' 
    : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'

  return (
    <motion.button
      className={`relative overflow-hidden rounded-full px-8 py-3 font-medium transition-colors ${baseClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Liquid blob effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(45deg, #3b82f6, #1d4ed8)' 
            : 'linear-gradient(45deg, #71717a, #27272a)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1.2 : 0,
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      />
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? [0, 1.5] : 0,
          opacity: isHovered ? [0.5, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeOut',
        }}
      />

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
} 