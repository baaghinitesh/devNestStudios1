import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: 'low' | 'medium' | 'high'
  animated?: boolean
}

export function GlowCard({ 
  children, 
  className, 
  glowColor = 'primary',
  intensity = 'medium',
  animated = true,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card || !animated) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
      setIsHovered(false)
      setMousePosition({ x: 0, y: 0 })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [animated])

  const intensityMap = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70'
  }

  const glowStyles = animated && isHovered ? {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--${glowColor})) 0%, transparent 40%)`
  } : {}

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative group',
        'bg-card/50 backdrop-blur-sm border border-border/50',
        'rounded-xl overflow-hidden',
        'transition-all duration-300',
        animated && 'hover:border-primary/50 hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {/* Glow effect */}
      {animated && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            isHovered ? intensityMap[intensity] : 'opacity-0'
          )}
          style={glowStyles}
        />
      )}
      
      {/* Border glow */}
      {animated && (
        <div 
          className={cn(
            'absolute inset-0 rounded-xl',
            'bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            '-m-[1px] -z-10'
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer effect */}
      {animated && (
        <div className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-gradient-to-r from-transparent via-white/10 to-transparent',
          'group-hover:translate-x-full transition-transform duration-1000',
          'skew-x-12'
        )} />
      )}
    </div>
  )
}