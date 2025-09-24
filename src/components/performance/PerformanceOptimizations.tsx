import React, { useEffect, lazy, Suspense } from 'react'
import { LoadingSpinner } from '../ui/LoadingSpinner'

// Lazy load heavy components for better performance
const HeavyChart = lazy(() => import('../ui/InteractiveCalculators'))
const VideoPlayer = lazy(() => import('../ui/VideoWalkthroughs'))

// Performance monitoring and optimization utilities
class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Measure component render time
  measureRenderTime(componentName: string, renderFunction: () => void) {
    const startTime = performance.now()
    renderFunction()
    const endTime = performance.now()
    const renderTime = endTime - startTime

    if (!this.metrics.has(componentName)) {
      this.metrics.set(componentName, [])
    }
    this.metrics.get(componentName)!.push(renderTime)

    // Log slow renders (> 16ms for 60fps)
    if (renderTime > 16) {
      console.warn(`Slow render detected for ${componentName}: ${renderTime.toFixed(2)}ms`)
    }
  }

  // Get average render time for a component
  getAverageRenderTime(componentName: string): number {
    const times = this.metrics.get(componentName) || []
    return times.reduce((sum, time) => sum + time, 0) / times.length || 0
  }

  // Get performance metrics
  getMetrics() {
    const result: Record<string, { average: number; samples: number; max: number }> = {}
    
    for (const [componentName, times] of this.metrics.entries()) {
      result[componentName] = {
        average: this.getAverageRenderTime(componentName),
        samples: times.length,
        max: Math.max(...times)
      }
    }
    
    return result
  }

  // Clear metrics
  clearMetrics() {
    this.metrics.clear()
  }
}

// Image optimization component
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)
  const imgRef = React.useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Preload critical images
    if (priority) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [src, priority])

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    const ext = baseSrc.split('.').pop()
    const baseName = baseSrc.replace(`.${ext}`, '')
    
    return [
      `${baseName}-320w.${ext} 320w`,
      `${baseName}-640w.${ext} 640w`,
      `${baseName}-960w.${ext} 960w`,
      `${baseName}-1280w.${ext} 1280w`,
      `${baseName}-1920w.${ext} 1920w`
    ].join(', ')
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  if (error) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width: width || 'auto', height: height || 'auto' }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
          style={{ width: width || '100%', height: height || 'auto' }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        srcSet={generateSrcSet(src)}
        sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, (max-width: 960px) 920px, (max-width: 1280px) 1240px, 1920px"
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
    </div>
  )
}

// Code splitting wrapper
interface CodeSplitWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  error?: React.ReactNode
}

export const CodeSplitWrapper: React.FC<CodeSplitWrapperProps> = ({
  children,
  fallback = <LoadingSpinner />,
  error = <div>Something went wrong</div>
}) => {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary fallback={error}>
        {children}
      </ErrorBoundary>
    </Suspense>
  )
}

// Error boundary for better error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Report to monitoring service in production
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
      // analytics.track('error', { error: error.message, stack: error.stack })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Performance hook for monitoring component performance
export const usePerformanceMonitor = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance()
  
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      monitor.measureRenderTime(componentName, () => {})
    }
  }, [componentName, monitor])

  return {
    getMetrics: () => monitor.getMetrics(),
    clearMetrics: () => monitor.clearMetrics()
  }
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}

// Virtual scrolling for large lists
interface VirtualScrollProps {
  items: any[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: any, index: number) => React.ReactNode
  overscan?: number
}

export const VirtualScroll: React.FC<VirtualScrollProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3
}) => {
  const [scrollTop, setScrollTop] = React.useState(0)
  const scrollElementRef = React.useRef<HTMLDivElement>(null)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push({
      index: i,
      item: items[i]
    })
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      ref={scrollElementRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: index * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

// Web Vitals monitoring
export const WebVitalsMonitor: React.FC = () => {
  useEffect(() => {
    // Basic performance monitoring using Performance API
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        // Measure key performance metrics
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            connection: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.requestStart,
            domLoad: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            windowLoad: navigation.loadEventEnd - navigation.loadEventStart
          }
          console.log('Performance Metrics:', metrics)
        }
      }
    }

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
      return () => window.removeEventListener('load', measurePerformance)
    }
  }, [])

  return null
}

// Service Worker registration for PWA
export const ServiceWorkerManager: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }
  }, [])

  return null
}

// Main performance optimizations provider
interface PerformanceProviderProps {
  children: React.ReactNode
  enableMonitoring?: boolean
}

const PerformanceProvider: React.FC<PerformanceProviderProps> = ({
  children,
  enableMonitoring = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'
}) => {
  return (
    <>
      {enableMonitoring && <WebVitalsMonitor />}
      <ServiceWorkerManager />
      {children}
    </>
  )
}

export default PerformanceProvider