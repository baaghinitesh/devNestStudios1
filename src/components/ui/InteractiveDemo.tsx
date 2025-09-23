import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Code2,
  Terminal,
  Smartphone,
  Monitor
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveDemoProps {
  isOpen: boolean
  onClose: () => void
  product: {
    title: string
    category: 'web' | 'mobile' | 'api' | 'desktop'
    demoUrl?: string
    features: string[]
  }
}

export function InteractiveDemo({ isOpen, onClose, product }: InteractiveDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [demoStep, setDemoStep] = useState(0)

  // Auto-cycle through features when playing
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % product.features.length)
      setDemoStep((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, product.features.length])

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentFeature(0)
      setDemoStep(0)
      setIsPlaying(false)
    }
  }, [isOpen])

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'web': return Monitor
      case 'mobile': return Smartphone  
      case 'api': return Code2
      case 'desktop': return Terminal
      default: return Monitor
    }
  }

  const CategoryIcon = getCategoryIcon()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              'bg-card rounded-2xl shadow-2xl relative overflow-hidden',
              isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl h-[80vh]'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CategoryIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {product.category} Demo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Demo Controls */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isPlaying 
                      ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                      : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                  )}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    setCurrentFeature(0)
                    setDemoStep(0)
                    setIsPlaying(false)
                  }}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Demo Content */}
            <div className="flex h-full">
              {/* Feature List */}
              <div className="w-1/3 border-r border-border p-6 overflow-y-auto">
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                  Features Demo
                </h4>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <motion.button
                      key={feature}
                      onClick={() => {
                        setCurrentFeature(index)
                        setIsPlaying(false)
                      }}
                      className={cn(
                        'w-full text-left p-3 rounded-lg transition-all text-sm',
                        'hover:bg-muted/50',
                        currentFeature === index
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground'
                      )}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full transition-colors',
                          currentFeature === index ? 'bg-primary' : 'bg-muted-foreground/30'
                        )} />
                        {feature}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Demo Progress */}
                <div className="mt-8">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Demo Progress</span>
                    <span>{Math.round((currentFeature / (product.features.length - 1)) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentFeature / (product.features.length - 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Demo Viewport */}
              <div className="flex-1 p-6 bg-muted/10">
                <div className="h-full rounded-xl overflow-hidden bg-background border">
                  <DemoViewport 
                    feature={product.features[currentFeature]}
                    category={product.category}
                    step={demoStep}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface DemoViewportProps {
  feature: string
  category: 'web' | 'mobile' | 'api' | 'desktop'
  step: number
  isPlaying: boolean
}

function DemoViewport({ feature, category, step, isPlaying }: DemoViewportProps) {
  return (
    <div className="h-full relative">
      {/* Browser/App Frame */}
      <div className="h-full flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center gap-2 p-3 border-b bg-muted/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <div className="bg-muted rounded px-3 py-1 text-xs text-muted-foreground inline-block">
              {category === 'web' && 'https://demo.devnest.com'}
              {category === 'mobile' && 'DevNest App'}
              {category === 'api' && 'GraphQL Playground'}
              {category === 'desktop' && 'DevNest Suite'}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="mb-6">
              {/* Animated Feature Icon */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <CategoryIcon className="w-8 h-8 text-primary" />
              </motion.div>
            </div>

            <h4 className="text-lg font-semibold mb-3">{feature}</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Interactive demonstration of {feature.toLowerCase()} functionality.
            </p>

            {/* Simulated Interface Elements */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ 
                    width: isPlaying ? "100%" : `${(i + 1) * 30}%`,
                    opacity: 1
                  }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="h-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
                />
              ))}
            </div>

            {/* Step Counter */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-xs text-muted-foreground"
              >
                Step {step + 1}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary/5 pointer-events-none"
        />
      )}
    </div>
  )
}

const CategoryIcon = ({ className }: { className?: string }) => (
  <Code2 className={className} />
)