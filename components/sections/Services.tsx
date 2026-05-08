'use client'
import React from 'react'
import { motion } from 'motion/react'
import { SERVICES } from '@/app/data'
import { Magnetic } from '@/components/ui/magnetic'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_CARD = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Services() {
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
        variants={VARIANTS_CARD}
      >
        How I Can Help
      </motion.h3>
      
      <motion.div 
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        variants={VARIANTS_CONTAINER}
        style={{ perspective: '1000px' }}
      >
        {SERVICES.map((service, index) => (
          <Magnetic
            key={service.id}
            className="group"
            strength={0.3}
            range={120}
          >
            <motion.div
              key={service.id}
              className="group cursor-pointer"
              variants={VARIANTS_CARD}
              whileHover={{ 
                y: -8,
                scale: 1.03,
                transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center'
              }}
            >
              <div className="relative rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-500 hover:border-zinc-300 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-2xl dark:hover:shadow-zinc-900/20 overflow-hidden">
                {/* Enhanced background glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 transition-all duration-500 group-hover:opacity-100 dark:from-blue-950/20 dark:to-purple-950/20" />
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                
                <div className="relative z-10">
                  {/* Emoji icon */}
                  <div className="mb-4 text-3xl">
                    {service.icon}
                  </div>
                  <h4 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50 transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                    {service.title}
                  </h4>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500 dark:group-hover:text-zinc-300">
                    {service.description}
                  </p>
                  
                  {/* Deliverables */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        What you get:
                      </div>
                      <ul className="space-y-1">
                        {service.deliverables.map((deliverable, index) => (
                          <li 
                            key={index}
                            className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <div className="mr-2 h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 transition-colors duration-300 group-hover:bg-blue-500 dark:group-hover:bg-blue-400" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Magnetic>
        ))}
      </motion.div>
    </motion.section>
  )
} 