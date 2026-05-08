'use client'
import { motion } from 'motion/react'
import { useState } from 'react'

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  borderRadius?: number
  gradientColors?: string[]
  animationDuration?: number
  hoverEffect?: boolean
}

export function AnimatedGradientBorder({
  children,
  className = '',
  borderWidth = 2,
  borderRadius = 8,
  gradientColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
  animationDuration = 3,
  hoverEffect = true
}: AnimatedGradientBorderProps) {
  const [isHovered, setIsHovered] = useState(false)

  const gradientString = gradientColors.join(', ')

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-75"
        style={{
          borderRadius: `${borderRadius}px`,
          background: `conic-gradient(from 0deg, ${gradientString}, ${gradientColors[0]})`,
          padding: `${borderWidth}px`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Hover glow effect */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 blur-xl"
          style={{
            borderRadius: `${borderRadius}px`,
            background: `conic-gradient(from 0deg, ${gradientString}, ${gradientColors[0]})`,
            padding: `${borderWidth}px`,
          }}
          animate={{
            rotate: 360,
            opacity: isHovered ? 0.5 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            rotate: {
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 0.3,
            },
            scale: {
              duration: 0.3,
            },
          }}
        />
      )}

      {/* Content container */}
      <div 
        className="relative z-10 bg-white dark:bg-zinc-900 rounded-[inherit]"
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
          margin: `${borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Preset configurations for common use cases
export function AnimatedGradientCard({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <AnimatedGradientBorder
      className={`p-6 ${className}`}
      borderWidth={1}
      borderRadius={12}
      gradientColors={['#3b82f6', '#8b5cf6', '#ec4899']}
      animationDuration={4}
    >
      {children}
    </AnimatedGradientBorder>
  )
}

export function AnimatedGradientButton({ 
  children, 
  onClick,
  className = '' 
}: { 
  children: React.ReactNode
  onClick?: () => void
  className?: string 
}) {
  return (
    <AnimatedGradientBorder
      className={`cursor-pointer ${className}`}
      borderWidth={2}
      borderRadius={8}
      gradientColors={['#06b6d4', '#3b82f6', '#8b5cf6']}
      animationDuration={2}
    >
      <motion.div
        className="px-6 py-3 text-center font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    </AnimatedGradientBorder>
  )
} 