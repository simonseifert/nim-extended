'use client'

import { useEffect, useState } from 'react'
import { CursorFollower } from '@/components/ui/cursor-follower'
import { Spotlight } from '@/components/ui/spotlight'
import { FloatingParticles } from '@/components/ui/floating-particles'

export function ClientEffects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Spotlight />
      <CursorFollower />
      <FloatingParticles count={15} />
    </>
  )
}
