import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useParallax } from '@/hooks/useIntersectionObserver'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  direction: number
  opacity: number
  color: string
  shape: 'circle' | 'square' | 'triangle'
}

interface FloatingElementsProps {
  count?: number
  className?: string
  colors?: string[]
  shapes?: Array<'circle' | 'square' | 'triangle'>
  speed?: number
}

export function FloatingElements({
  count = 20,
  className,
  colors = ['bg-primary/10', 'bg-accent/10', 'bg-secondary/10'],
  shapes = ['circle', 'square', 'triangle'],
  speed = 0.5
}: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const parallaxOffset = useParallax()

  useEffect(() => {
    const newElements: FloatingElement[] = []
    
    for (let i = 0; i < count; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        speed: Math.random() * speed + 0.1,
        direction: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      })
    }
    
    setElements(newElements)
  }, [count, colors, shapes, speed])

  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev => prev.map(element => {
        let newX = element.x + Math.cos(element.direction) * element.speed
        let newY = element.y + Math.sin(element.direction) * element.speed
        
        // Wrap around edges
        if (newX < -5) newX = 105
        if (newX > 105) newX = -5
        if (newY < -5) newY = 105
        if (newY > 105) newY = -5
        
        return {
          ...element,
          x: newX,
          y: newY
        }
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [elements.length])

  const getShapeClasses = (shape: string, size: number) => {
    const baseClasses = 'absolute transition-all duration-1000'
    
    switch (shape) {
      case 'circle':
        return `${baseClasses} rounded-full`
      case 'square':
        return `${baseClasses} rounded-lg rotate-45`
      case 'triangle':
        return `${baseClasses} transform`
      default:
        return `${baseClasses} rounded-full`
    }
  }

  const getTriangleStyle = (size: number, color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-primary/10': 'border-primary/20',
      'bg-accent/10': 'border-accent/20', 
      'bg-secondary/10': 'border-secondary/20'
    }
    
    return {
      width: 0,
      height: 0,
      borderLeft: `${size/2}px solid transparent`,
      borderRight: `${size/2}px solid transparent`,
      borderBottom: `${size}px solid`,
      borderBottomColor: colorMap[color] || 'hsl(var(--primary) / 0.2)'
    }
  }

  return (
    <div 
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {elements.map((element) => {
        const style = {
          left: `${element.x}%`,
          top: `${element.y}%`,
          width: element.shape !== 'triangle' ? `${element.size}px` : undefined,
          height: element.shape !== 'triangle' ? `${element.size}px` : undefined,
          opacity: element.opacity,
          animationDelay: `${element.id * 0.1}s`,
          ...(element.shape === 'triangle' ? getTriangleStyle(element.size, element.color) : {})
        }

        return (
          <div
            key={element.id}
            className={cn(
              getShapeClasses(element.shape, element.size),
              element.shape !== 'triangle' ? element.color : '',
              'animate-pulse-slow'
            )}
            style={style}
          />
        )
      })}
    </div>
  )
}

// Enhanced floating animation component with physics
export function PhysicsFloatingElements({ className }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
            transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)`
          }}
        />
      ))}
    </div>
  )
}