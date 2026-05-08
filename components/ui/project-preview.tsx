'use client'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ProjectPreviewProps {
  isVisible: boolean
  project: {
    name: string
    description: string
    link: string
    color: string
  } | null
}

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      // Check window width (768px is typical mobile breakpoint)
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Memoized component to prevent unnecessary re-renders that cause flickering  
function ProjectPreviewComponent({ isVisible, project }: ProjectPreviewProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useIsMobile()

  // Memoize mouse move handler to prevent re-renders
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    if (isVisible && project) {
      // Only reset state if it's a different project or first load
      if (!hasLoaded) {
        setIsLoading(true)
        setHasError(false)
      }
      
      // Extended timeout for animated content (5 seconds to ensure animations load)
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
      }
      
      loadTimeoutRef.current = setTimeout(() => {
        setIsLoading(false)
        setHasLoaded(true)
      }, 5000) // Increased from 3 to 5 seconds for animated content

      return () => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
        }
      }
    }
  }, [isVisible, project, hasLoaded])

  const handleIframeLoad = useCallback(() => {
    // Add a small delay to ensure animations have time to start
    setTimeout(() => {
      setIsLoading(false)
      setHasError(false)
      setHasLoaded(true)
    }, 1500) // Wait 1.5 seconds after load for animations
  }, [])

  const handleIframeError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
    setHasLoaded(true)
  }, [])

  // Memoize iframe src to prevent re-renders
  const iframeSrc = useMemo(() => {
    if (!project) return ''
    try {
      // Add parameters to reduce animations and improve loading
      const url = new URL(project.link)
      url.searchParams.set('preload', 'auto')
      return url.toString()
    } catch {
      // Fallback to original link if URL parsing fails
      return project.link
    }
  }, [project?.link])

  // Don't render on mobile devices
  if (isMobile) {
    return null
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={previewRef}
          className="pointer-events-none fixed z-50 select-none"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 160,
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          <div 
            className="relative overflow-hidden rounded-xl border border-white/20 bg-black/90 backdrop-blur-sm"
            style={{
              width: '307px', // Reduced by another 20%: 384 * 0.8 = 307px
              height: '173px', // Reduced by another 20%: 216 * 0.8 = 173px (maintaining 16:9 ratio)
            }}
          >
            {/* Desktop-scaled iframe preview */}
            <div className="relative w-full h-full overflow-hidden">
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                className="absolute top-0 left-0 origin-top-left"
                style={{
                  width: '1200px', // Desktop viewport width
                  height: '675px', // 16:9 ratio for 1200px
                  transform: 'scale(0.256)', // Reduced by another 20%: 0.32 * 0.8 = 0.256
                  pointerEvents: 'none',
                }}
                sandbox="allow-same-origin allow-scripts allow-forms"
                loading="lazy"
                title={`Preview of ${project.name}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                // Additional optimization attributes
                referrerPolicy="no-referrer-when-downgrade"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // Prevent multiple loads
                key={project.link}
              />
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
              />
              
              {/* Loading/Error overlay */}
              <AnimatePresence>
                {(isLoading || hasError) && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center text-white">
                      {hasError ? (
                        <>
                          <div className="mb-2 h-8 w-8 mx-auto text-red-400">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm opacity-70">Preview unavailable</p>
                        </>
                      ) : (
                        <>
                          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto"></div>
                          <p className="text-sm opacity-70">Loading preview...</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Project info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-white">
                    {project.name}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ProjectPreview = React.memo(ProjectPreviewComponent) 