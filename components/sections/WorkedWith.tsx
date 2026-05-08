'use client'
import React from 'react'
import { motion } from 'motion/react'
import { LOGOS, LOGOS_HEADING } from '@/app/data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export function WorkedWith() {
  if (!LOGOS || LOGOS.length === 0) return null

  return (
    <motion.section
      className="space-y-8 py-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.p
        className="text-center text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-400"
        variants={VARIANTS_ITEM}
      >
        {LOGOS_HEADING}
      </motion.p>

      <motion.div
        className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
        variants={VARIANTS_CONTAINER}
      >
        {LOGOS.map((logo) => {
          const content = logo.src ? (
            <img
              src={logo.src}
              alt={logo.name}
              className="h-7 w-auto opacity-70 transition-opacity hover:opacity-100 dark:invert"
            />
          ) : (
            <span className="text-base font-semibold tracking-wider text-zinc-700 opacity-70 transition-opacity hover:opacity-100 dark:text-zinc-300">
              {logo.name}
            </span>
          )

          return (
            <motion.div
              key={logo.name}
              variants={VARIANTS_ITEM}
              className="flex h-10 items-center justify-center"
            >
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                content
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
