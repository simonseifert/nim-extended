'use client'
import { motion } from 'motion/react'
import { ABOUT_CONTENT } from '@/app/data'

export function About() {
  return (
    <section className="py-24">
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-medium text-black dark:text-white mb-4"
        >
          {ABOUT_CONTENT.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-zinc-600 dark:text-zinc-400"
        >
          {ABOUT_CONTENT.subtitle}
        </motion.p>
      </div>

      <div className="grid gap-8">
        {ABOUT_CONTENT.story.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  )
} 