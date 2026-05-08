'use client'
import { motion } from 'motion/react'
import { EMAIL } from '@/app/data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Legal() {
  return (
    <motion.main
      className="space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION}>
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Legal Information
        </h1>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} className="space-y-8">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Privacy Policy
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            This website does not collect personal data beyond standard web analytics. 
            We respect your privacy and follow GDPR guidelines.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Terms of Service
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            By using this website, you agree to these terms. The content is provided 
            for informational purposes only.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Contact
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            For any legal inquiries, please contact:{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </motion.section>
    </motion.main>
  )
} 