'use client'
import React from 'react'
import { motion } from 'motion/react'
import { EMAIL, SOCIAL_LINKS, CALENDLY_URL } from '@/app/data'
import { Magnetic } from '@/components/ui/magnetic'
import { LiquidButton } from '@/components/ui/liquid-button'

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic strength={0.3} range={80}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </Magnetic>
  )
}

export function Contact() {
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
        Let&apos;s Connect
      </motion.h3>
      
      <motion.div 
        className="space-y-6"
        variants={VARIANTS_CONTAINER}
      >
        <motion.p 
          className="text-lg text-zinc-700 dark:text-zinc-300"
          variants={VARIANTS_ITEM}
        >
          Interested in working together or discussing a project? 
          Feel free to reach out.
        </motion.p>
        
        {CALENDLY_URL && (
          <motion.div
            variants={VARIANTS_ITEM}
            transition={{ ...VARIANTS_ITEM, delay: 0.6 }}
          >
            <LiquidButton
              onClick={() => window.open(CALENDLY_URL, '_blank')}
              variant="minimal"
              className="text-sm px-4 py-2 text-center"
            >
              Schedule a Call
            </LiquidButton>
          </motion.div>
        )}

        <motion.div
          variants={VARIANTS_ITEM}
        >
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 text-lg font-medium text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            {EMAIL}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
              />
            </svg>
          </a>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={VARIANTS_ITEM}
        >
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
} 