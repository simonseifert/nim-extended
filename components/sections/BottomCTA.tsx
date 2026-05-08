'use client'
import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { BOTTOM_CTA } from '@/app/data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function BottomCTA() {
  if (!BOTTOM_CTA) return null

  const { chip, title, subtitle, primary, secondary, microcopy } = BOTTOM_CTA

  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 px-6 py-16 text-center dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
        {chip && (
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-100 dark:bg-zinc-50 dark:text-zinc-900"
            variants={VARIANTS_ITEM}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 dark:bg-emerald-500" />
            {chip}
          </motion.span>
        )}

        <motion.h3
          className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
          variants={VARIANTS_ITEM}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-base text-zinc-600 dark:text-zinc-400"
          variants={VARIANTS_ITEM}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
          variants={VARIANTS_ITEM}
        >
          <a
            href={primary.link}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {primary.label}
          </a>
          {secondary && (
            <a
              href={secondary.link}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              {secondary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </motion.div>

        {microcopy && (
          <motion.p
            className="text-xs text-zinc-500 dark:text-zinc-500"
            variants={VARIANTS_ITEM}
          >
            {microcopy}
          </motion.p>
        )}
      </div>
    </motion.section>
  )
}
