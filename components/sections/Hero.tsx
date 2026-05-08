'use client'
import React from 'react'
import { motion, easeInOut } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
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
  const { announcement, ctaPrimary, ctaSecondary } = HERO_CONTENT

  return (
    <motion.section
      className="flex min-h-[80vh] items-center justify-end"
      variants={VARIANTS_SECTION}
      initial="hidden"
      animate="visible"
      transition={TRANSITION_SECTION}
    >
      <div className="w-full max-w-2xl text-right">
        {announcement && (
          <motion.div
            className="mb-6 flex justify-end"
            variants={VARIANTS_SECTION}
            transition={{ ...TRANSITION_SECTION, delay: 0.1 }}
          >
            <a
              href={announcement.link ?? '#'}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{announcement.label}</span>
              {announcement.link && (
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              )}
            </a>
          </motion.div>
        )}

        <div className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          <motion.div
            whileHover={{
              textShadow:
                '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
              transition: { duration: 0.3 },
            }}
            className="inline-block cursor-default"
          >
            <TextSplit text={HERO_CONTENT.name} className="block" delay={0.1} />
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
          className="mb-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl"
          variants={VARIANTS_SECTION}
          transition={{ ...TRANSITION_SECTION, delay: 1.0 }}
        >
          {HERO_CONTENT.intro}
        </motion.p>

        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            className="mb-12 flex flex-wrap items-center justify-end gap-3"
            variants={VARIANTS_SECTION}
            transition={{ ...TRANSITION_SECTION, delay: 1.1 }}
          >
            {ctaPrimary && (
              <a
                href={ctaPrimary.link}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {ctaPrimary.label}
              </a>
            )}
            {ctaSecondary && (
              <a
                href={ctaSecondary.link}
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              >
                {ctaSecondary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </motion.div>
        )}

        {HERO_CONTENT.metrics && (
          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
            variants={VARIANTS_SECTION}
            transition={{ ...TRANSITION_SECTION, delay: 1.2 }}
          >
            {HERO_CONTENT.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="cursor-default text-right"
                variants={VARIANTS_METRIC}
                transition={{
                  ...TRANSITION_SECTION,
                  delay: 1.4 + index * 0.1,
                }}
              >
                <motion.div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
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
