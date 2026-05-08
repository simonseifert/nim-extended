'use client'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

interface MorphingIconProps {
  icon1: React.ReactNode
  icon2: React.ReactNode
  isToggled?: boolean
  onToggle?: () => void
  className?: string
  size?: number
}

export function MorphingIcon({ 
  icon1, 
  icon2, 
  isToggled = false,
  onToggle,
  className = '',
  size = 24
}: MorphingIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isToggled ? 'icon2' : 'icon1'}
          initial={{ 
            opacity: 0, 
            scale: 0.5, 
            rotate: -180 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.5, 
            rotate: 180 
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isToggled ? icon2 : icon1}
        </motion.div>
      </AnimatePresence>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-500/20 blur-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1.2 : 0.5 
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

// Pre-built morphing icons for common use cases
export function PlayPauseIcon({ isPlaying = false, onToggle, className = '' }: { 
  isPlaying?: boolean
  onToggle?: () => void
  className?: string 
}) {
  return (
    <MorphingIcon
      icon1={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      }
      icon2={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      }
      isToggled={isPlaying}
      onToggle={onToggle}
      className={className}
    />
  )
}

export function LikeIcon({ isLiked = false, onToggle, className = '' }: { 
  isLiked?: boolean
  onToggle?: () => void
  className?: string 
}) {
  return (
    <MorphingIcon
      icon1={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      }
      icon2={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      }
      isToggled={isLiked}
      onToggle={onToggle}
      className={className}
    />
  )
} 