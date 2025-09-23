import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Code2, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Zap 
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MicroDemoProps {
  serviceId: string
  isActive: boolean
  className?: string
}

export function MicroDemo({ serviceId, isActive, className }: MicroDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const demos = {
    'web-development': {
      icon: Globe,
      title: 'Web App Demo',
      steps: [
        { action: 'Loading components...', progress: 20 },
        { action: 'Rendering UI...', progress: 50 },
        { action: 'Connecting APIs...', progress: 80 },
        { action: 'App ready!', progress: 100 }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    'mobile-development': {
      icon: Smartphone,
      title: 'Mobile App Demo',
      steps: [
        { action: 'Initializing app...', progress: 25 },
        { action: 'Loading native modules...', progress: 55 },
        { action: 'Setting up navigation...', progress: 85 },
        { action: 'Mobile app launched!', progress: 100 }
      ],
      color: 'from-purple-500 to-pink-500'
    },
    'api-development': {
      icon: Database,
      title: 'API Demo',
      steps: [
        { action: 'Connecting to database...', progress: 30 },
        { action: 'Processing request...', progress: 60 },
        { action: 'Validating data...', progress: 90 },
        { action: 'Response sent!', progress: 100 }
      ],
      color: 'from-green-500 to-emerald-500'
    },
    'cloud-deployment': {
      icon: Cloud,
      title: 'Deployment Demo',
      steps: [
        { action: 'Building container...', progress: 25 },
        { action: 'Pushing to registry...', progress: 50 },
        { action: 'Deploying to cloud...', progress: 75 },
        { action: 'Service live!', progress: 100 }
      ],
      color: 'from-indigo-500 to-blue-600'
    },
    'ui-ux-design': {
      icon: Code2,
      title: 'Design Demo',
      steps: [
        { action: 'Creating wireframes...', progress: 25 },
        { action: 'Applying design system...', progress: 50 },
        { action: 'Adding interactions...', progress: 75 },
        { action: 'Design complete!', progress: 100 }
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    'ai-ml-solutions': {
      icon: Zap,
      title: 'AI Model Demo',
      steps: [
        { action: 'Loading model...', progress: 20 },
        { action: 'Processing input...', progress: 60 },
        { action: 'Generating output...', progress: 90 },
        { action: 'AI prediction ready!', progress: 100 }
      ],
      color: 'from-red-500 to-pink-500'
    }
  }

  const demo = demos[serviceId as keyof typeof demos] || demos['web-development']
  const DemoIcon = demo.icon

  useEffect(() => {
    if (!isPlaying || !isActive) return

    const interval = setInterval(() => {
      setStep(prev => {
        const nextStep = (prev + 1) % demo.steps.length
        setProgress(demo.steps[nextStep].progress)
        return nextStep
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying, isActive, demo.steps])

  useEffect(() => {
    if (!isActive) {
      setIsPlaying(false)
      setStep(0)
      setProgress(0)
    }
  }, [isActive])

  const handleTogglePlay = () => {
    if (!isPlaying) {
      setStep(0)
      setProgress(demo.steps[0].progress)
    }
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setStep(0)
    setProgress(0)
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={cn('mt-6 p-6 bg-muted/30 rounded-xl border', className)}
        >
          {/* Demo Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-lg bg-gradient-to-br',
                demo.color
              )}>
                <DemoIcon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold">{demo.title}</h4>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
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
                onClick={handleReset}
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Demo Viewport */}
          <div className="relative bg-background rounded-lg p-4 border min-h-[120px]">
            {/* Terminal-like Header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {demo.title}
              </span>
            </div>

            {/* Demo Content */}
            <div className="space-y-3">
              {/* Progress Bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={cn(
                      'h-full bg-gradient-to-r rounded-full',
                      demo.color
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10">
                  {progress}%
                </span>
              </div>

              {/* Current Action */}
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                {isPlaying && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full"
                  />
                )}
                <span className="text-sm font-mono">
                  {demo.steps[step]?.action || 'Ready to start...'}
                </span>
              </motion.div>

              {/* Simulated Output */}
              <div className="bg-muted/50 rounded p-3 font-mono text-xs">
                <div className="space-y-1">
                  {Array.from({ length: Math.min(step + 1, 3) }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: i * 0.2 }}
                      className="text-muted-foreground"
                    >
                      {i === 0 && '> Initializing service...'}
                      {i === 1 && '> Running processes...'}
                      {i === 2 && '> Service ready ✓'}
                    </motion.div>
                  ))}
                  {isPlaying && (
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-primary"
                    >
                      ▊
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <motion.div
                animate={isPlaying ? { 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  'w-16 h-16 rounded-full bg-gradient-to-br',
                  demo.color
                )}
              />
            </div>
          </div>

          {/* Demo Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="text-xs">
              <div className="text-primary font-semibold">
                {Math.round(progress)}%
              </div>
              <div className="text-muted-foreground">Complete</div>
            </div>
            <div className="text-xs">
              <div className="text-primary font-semibold">
                {step + 1}/{demo.steps.length}
              </div>
              <div className="text-muted-foreground">Steps</div>
            </div>
            <div className="text-xs">
              <div className="text-primary font-semibold">
                {isPlaying ? 'Running' : 'Stopped'}
              </div>
              <div className="text-muted-foreground">Status</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}