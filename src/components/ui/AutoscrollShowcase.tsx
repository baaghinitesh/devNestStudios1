import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AutoscrollItem {
  id: string
  title: string
  subtitle: string
  image: string
  gradient: string
  description: string
}

interface AutoscrollShowcaseProps {
  items: AutoscrollItem[]
  direction?: 'left' | 'right'
  speed?: number
  className?: string
  pauseOnHover?: boolean
  showControls?: boolean
  itemWidth?: number
}

export function AutoscrollShowcase({
  items,
  direction = 'left',
  speed = 30,
  className,
  pauseOnHover = true,
  showControls = true,
  itemWidth = 320
}: AutoscrollShowcaseProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items]

  // Start continuous scroll animation
  useEffect(() => {
    if (!scrollRef.current || isPaused) return

    const scrollWidth = scrollRef.current.scrollWidth / 3 // Divide by 3 since we tripled items
    const duration = scrollWidth / speed

    controls.start({
      x: direction === 'left' ? -scrollWidth : scrollWidth,
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
      }
    })

    return () => controls.stop()
  }, [controls, direction, speed, isPaused])

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
      controls.stop()
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const scrollPosition = index * (itemWidth + 24) // 24px gap
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  return (
    <div 
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
            className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={togglePause}
            className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => scrollTo(Math.min(items.length - 1, currentIndex + 1))}
            className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
            aria-label="Next item"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Scrolling Container */}
      <motion.div
        ref={scrollRef}
        animate={controls}
        className="flex gap-6 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {duplicatedItems.map((item, index) => (
          <AutoscrollCard
            key={`${item.id}-${index}`}
            item={item}
            width={itemWidth}
            isActive={index % items.length === currentIndex}
          />
        ))}
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  )
}

interface AutoscrollCardProps {
  item: AutoscrollItem
  width: number
  isActive: boolean
}

function AutoscrollCard({ item, width, isActive }: AutoscrollCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ width, y, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group cursor-pointer transition-all duration-500',
        'hover:scale-105 hover:z-30',
        isActive && 'scale-105'
      )}
    >
      {/* Card Background */}
      <div className={cn(
        'relative overflow-hidden rounded-2xl h-96',
        'bg-gradient-to-br',
        item.gradient,
        'shadow-xl hover:shadow-2xl transition-shadow duration-500'
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Header */}
          <div className="mb-auto">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
              {item.title}
            </h3>
            <p className="text-white/80 text-sm font-medium">
              {item.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="mt-auto">
            <p className="text-white/90 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center"
          >
            <div className="text-center text-white">
              <div className="text-sm font-medium mb-2">Click to explore</div>
              <div className="w-8 h-8 border-2 border-white rounded-full mx-auto animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <div className={cn(
          'absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          'bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50',
          'blur-sm -z-10'
        )} />
      </div>

      {/* 3D Shadow Effect */}
      <div className={cn(
        'absolute inset-0 rounded-2xl transition-all duration-500',
        'bg-gradient-to-br from-black/10 to-black/30',
        'transform translate-y-2 translate-x-2 -z-20',
        'group-hover:translate-y-3 group-hover:translate-x-3',
        'group-hover:opacity-40'
      )} />
    </motion.div>
  )
}

// Elevated Scroll Showcase for premium products
export function ElevatedScrollShowcase({ 
  items, 
  className,
  title,
  subtitle 
}: {
  items: AutoscrollItem[]
  className?: string
  title?: string
  subtitle?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <div ref={containerRef} className={cn('relative py-24 overflow-hidden', className)}>
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"
      />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl"
        />
      </div>

      <motion.div style={{ y: contentY }} className="relative z-10">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Autoscroll Showcase */}
        <AutoscrollShowcase
          items={items}
          direction="left"
          speed={40}
          itemWidth={380}
          className="h-96"
        />
      </motion.div>
    </div>
  )
}