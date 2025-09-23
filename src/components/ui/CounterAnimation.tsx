import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

interface CounterAnimationProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CounterAnimation({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  suffix = '',
  prefix = '',
  className
}: CounterAnimationProps) {
  const [count, setCount] = useState(start)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (!isIntersecting) return

    const timer = setTimeout(() => {
      const startTime = Date.now()
      const startValue = start
      const endValue = end
      
      const updateCounter = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
        
        setCount(currentValue)
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }
      
      updateCounter()
    }, delay)

    return () => clearTimeout(timer)
  }, [isIntersecting, start, end, duration, delay])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Live counter that simulates real-time updates (like GitHub commits)
export function LiveCounter({ 
  baseValue, 
  label, 
  icon: Icon, 
  updateInterval = 30000,
  className 
}: {
  baseValue: number
  label: string
  icon?: React.ComponentType<any>
  updateInterval?: number
  className?: string
}) {
  const [value, setValue] = useState(baseValue)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    if (!isIntersecting) return

    // Simulate real-time updates
    const interval = setInterval(() => {
      setValue(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, updateInterval)

    return () => clearInterval(interval)
  }, [isIntersecting, updateInterval])

  return (
    <div ref={ref as any} className={cn('text-center', className)}>
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      )}
      <div className="text-3xl font-bold text-primary mb-2 tabular-nums">
        <CounterAnimation end={value} />
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}