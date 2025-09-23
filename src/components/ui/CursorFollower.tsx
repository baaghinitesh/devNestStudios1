import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CursorFollowerProps {
  className?: string
  size?: number
  delay?: number
}

export function CursorFollower({ 
  className, 
  size = 20, 
  delay = 0.1 
}: CursorFollowerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationId: number
    const targetPosition = { x: 0, y: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.x = e.clientX
      targetPosition.y = e.clientY
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * delay,
        y: prev.y + (targetPosition.y - prev.y) * delay
      }))
      animationId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [delay])

  return (
    <div
      className={cn(
        'fixed pointer-events-none z-50 transition-opacity duration-300',
        'bg-primary/20 rounded-full border border-primary/30 backdrop-blur-sm',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)'
      }}
    />
  )
}

// Enhanced cursor for navigation items
export function NavCursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let cleanup: (() => void) | null = null
    let observer: MutationObserver | null = null
    
    const setupEventListeners = () => {
      // Clear previous cleanup if exists
      if (cleanup) cleanup()
      
      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement
        if (target.hasAttribute('data-nav-item')) {
          const rect = target.getBoundingClientRect()
          setPosition({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          })
          setIsHovering(true)
        }
      }

      const handleMouseLeave = (e: Event) => {
        const target = e.target as HTMLElement
        if (target.hasAttribute('data-nav-item')) {
          setIsHovering(false)
        }
      }

      // Add event listeners to all nav items
      const navItems = document.querySelectorAll('[data-nav-item]')
      const cleanupFunctions: (() => void)[] = []
      
      navItems.forEach(item => {
        item.addEventListener('mouseenter', handleMouseEnter as EventListener)
        item.addEventListener('mouseleave', handleMouseLeave as EventListener)
        
        cleanupFunctions.push(() => {
          item.removeEventListener('mouseenter', handleMouseEnter as EventListener)
          item.removeEventListener('mouseleave', handleMouseLeave as EventListener)
        })
      })

      cleanup = () => {
        cleanupFunctions.forEach(fn => fn())
      }
    }

    // Initial setup with delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      setupEventListeners()
      
      // Watch for changes specifically in the navbar area
      const navbarElement = document.querySelector('nav')
      if (navbarElement) {
        observer = new MutationObserver((mutations) => {
          let shouldUpdate = false
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || 
                (mutation.type === 'attributes' && mutation.attributeName === 'data-nav-item')) {
              shouldUpdate = true
            }
          })
          
          if (shouldUpdate) {
            setTimeout(setupEventListeners, 50)
          }
        })

        observer.observe(navbarElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['data-nav-item']
        })
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (cleanup) cleanup()
      if (observer) observer.disconnect()
    }
  }, [])

  return (
    <div
      className={cn(
        'fixed pointer-events-none z-40 transition-all duration-300 ease-out',
        'bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-sm',
        isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      )}
      style={{
        left: position.x,
        top: position.y,
        width: position.width,
        height: position.height
      }}
    />
  )
}
