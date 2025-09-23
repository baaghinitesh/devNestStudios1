import { useRef, useEffect, useState } from 'react'
import { Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Logo3DProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function Logo3D({ className, size = 'md', animated = true }: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref: observerRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1
  })

  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container || !animated) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
      setMousePosition({ x, y })
    }

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [animated])

  const transform3D = animated ? {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg) translateZ(${isIntersecting ? '50px' : '0px'})`,
    transition: 'transform 0.3s ease-out'
  } : {}

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        observerRef.current = el
      }}
      className={cn(
        'relative flex items-center justify-center',
        sizes[size],
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow effect */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full bg-primary/20 blur-2xl',
          animated && 'animate-pulse',
          isIntersecting ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transition: 'opacity 0.5s ease-in-out',
          animationDuration: '3s'
        }}
      />
      
      {/* Main logo */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={transform3D}
      >
        <Code2 
          className={cn(
            'text-primary drop-shadow-lg',
            animated && 'transition-all duration-300',
            isIntersecting && animated ? 'animate-float' : '',
            size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'
          )}
        />
        
        {/* Additional 3D layers */}
        {animated && (
          <>
            <Code2 
              className={cn(
                'absolute text-primary/30',
                size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'
              )}
              style={{
                transform: 'translateZ(-10px)',
                filter: 'blur(1px)'
              }}
            />
            <Code2 
              className={cn(
                'absolute text-primary/20',
                size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'
              )}
              style={{
                transform: 'translateZ(-20px)',
                filter: 'blur(2px)'
              }}
            />
          </>
        )}
      </div>
      
      {/* Orbiting elements */}
      {animated && isIntersecting && (
        <>
          <div 
            className="absolute w-2 h-2 bg-accent rounded-full animate-spin"
            style={{
              animation: 'spin 8s linear infinite',
              transformOrigin: '60px center'
            }}
          />
          <div 
            className="absolute w-1.5 h-1.5 bg-secondary rounded-full"
            style={{
              animation: 'spin 12s linear infinite reverse',
              transformOrigin: '80px center'
            }}
          />
          <div 
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              animation: 'spin 6s linear infinite',
              transformOrigin: '40px center'
            }}
          />
        </>
      )}
    </div>
  )
}