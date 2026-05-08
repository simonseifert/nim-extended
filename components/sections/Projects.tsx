'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PROJECTS } from '@/app/data'
import { ProjectPreview } from '@/components/ui/project-preview'
import { TiltCard } from '@/components/ui/tilt-card'
import { TextScramble } from '@/components/ui/text-scramble'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_PROJECT = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<typeof PROJECTS[0] | null>(null)
  const [showAll, setShowAll] = useState(false)
  
  // Show first 3 projects initially, all when expanded
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3)
  const hasMoreProjects = PROJECTS.length > 3

  return (
    <>
      <motion.section
        className="space-y-8"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="flex items-center justify-between"
          variants={VARIANTS_PROJECT}
        >
          <h3 className="text-3xl font-medium text-zinc-900 dark:text-zinc-50">
            Key Projects
          </h3>
          
          {hasMoreProjects && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              {showAll ? 'Show Less' : 'View All'}
              <svg
                className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          variants={VARIANTS_CONTAINER}
        >
          <AnimatePresence>
            {visibleProjects.map((project) => (
              <TiltCard
                key={project.id}
                className="group cursor-pointer"
                tiltStrength={8}
              >
                <motion.div
                  className="block rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-white/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-lg dark:hover:shadow-white/5"
                  variants={VARIANTS_PROJECT}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                            <TextScramble trigger="hover">
                              {project.name}
                            </TextScramble>
                          </h4>
                          {project.role && (
                            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                              {project.role}
                            </span>
                          )}
                        </div>
                        
                        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.metrics.map((metric, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <svg
                        className="ml-4 h-5 w-5 flex-shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </a>
                </motion.div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      <ProjectPreview 
        isVisible={hoveredProject !== null}
        project={hoveredProject}
      />
    </>
  )
} 