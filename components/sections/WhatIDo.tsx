'use client'
import React from 'react'
import { motion } from 'motion/react'
import { WHAT_I_DO } from '@/app/data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function WhatIDo() {
  return (
    <motion.section
      className="space-y-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h3 
        className="text-3xl font-medium text-zinc-900 dark:text-zinc-50"
        variants={VARIANTS_ITEM}
      >
        What I Do
      </motion.h3>
      
      <motion.ul 
        className="space-y-4"
        variants={VARIANTS_CONTAINER}
      >
        {WHAT_I_DO.map((item) => (
          <motion.li
            key={item.id}
            className="text-lg text-zinc-700 dark:text-zinc-300"
            variants={VARIANTS_ITEM}
          >
            • {item.title}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
} 