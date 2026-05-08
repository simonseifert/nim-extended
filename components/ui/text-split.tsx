'use client'
import React from 'react'
import { motion } from 'motion/react'

interface TextSplitProps {
  text: string
  className?: string
  delay?: number
}

export function TextSplit({ text, className = '', delay = 0 }: TextSplitProps) {
  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={child}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
} 