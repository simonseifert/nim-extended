'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { TIMELINE_ITEMS } from '@/app/data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export function Timeline() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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
        My Journey
      </motion.h3>
      
      <motion.div 
        className="relative"
        variants={VARIANTS_CONTAINER}
      >
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-amber-500 to-purple-500 opacity-30" />
        
        <div className="space-y-8">
          {TIMELINE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex gap-6 group cursor-pointer"
              variants={VARIANTS_ITEM}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Timeline dot */}
              <div className="relative flex-shrink-0">
                <motion.div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 border-white dark:border-zinc-900 shadow-lg"
                  style={{ backgroundColor: item.color }}
                  animate={{
                    scale: hoveredItem === item.id ? 1.2 : 1,
                    boxShadow: hoveredItem === item.id 
                      ? `0 0 20px ${item.color}80, 0 0 40px ${item.color}40`
                      : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
              </div>
              
              {/* Content */}
              <motion.div 
                className="flex-1 min-w-0"
                animate={{
                  y: hoveredItem === item.id ? -4 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.company}
                  </h4>
                  <span 
                    className="px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.year}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  {item.title}
                </p>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  {item.description}
                </p>
                
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  animate={{
                    backgroundColor: hoveredItem === item.id 
                      ? `${item.color}20` 
                      : undefined
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs">🎉</span>
                  {item.achievement}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
} 