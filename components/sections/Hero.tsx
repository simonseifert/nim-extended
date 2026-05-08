'use client'
import React from 'react'
import { motion, easeInOut } from 'motion/react'
import { HERO_CONTENT } from '@/app/data'
import { TextSplit } from '@/components/ui/text-split'
import { AnimatedCounter } from '@/components/ui/animated-counter'

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const VARIANTS_METRIC = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

const TRANSITION_SECTION = {
  duration: 0.6,
  ease: easeInOut,
}

export function Hero() {
  return (
    <motion.section
      className="flex min-h-[80vh] items-center justify-end"
      variants={VARIANTS_SECTION}
      initial="hidden"
      animate="visible"
      transition={TRANSITION_SECTION}
    >
      <div className="w-full max-w-2xl text-right">
        <div className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          <motion.div
            whileHover={{ 
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 }
            }}
            className="inline-block cursor-default"
          >
            <TextSplit 
              text={HERO_CONTENT.name}
              className="block"
              delay={0.1}
            />
          </motion.div>
        </div>
        
        <motion.h2 
          className="mb-8 text-xl font-medium text-zinc-600 dark:text-zinc-400 sm:text-2xl"
          variants={VARIANTS_SECTION}
          transition={{ ...TRANSITION_SECTION, delay: 0.8 }}
        >
          {HERO_CONTENT.title}
        </motion.h2>
        
        <motion.p 
          className="mb-12 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl"
          variants={VARIANTS_SECTION}
          transition={{ ...TRANSITION_SECTION, delay: 1.0 }}
        >
          {HERO_CONTENT.intro}
        </motion.p>

        {/* Key Metrics */}
        {HERO_CONTENT.metrics && (
          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
            variants={VARIANTS_SECTION}
            transition={{ ...TRANSITION_SECTION, delay: 1.2 }}
          >
            {HERO_CONTENT.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-right cursor-default"
                variants={VARIANTS_METRIC}
                transition={{ 
                  ...TRANSITION_SECTION, 
                  delay: 1.4 + (index * 0.1)
                }}
              >
                <motion.div 
                  className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl"
                >
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} duration={1500} />
                </motion.div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
} 