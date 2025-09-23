import { useState } from 'react'
import { Monitor, Moon, Sun, Sparkles, Zap } from 'lucide-react'
import { useTheme, themes } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themeIcons = {
    light: Sun,
    dark: Moon,
    aurora: Sparkles,
    matrix: Zap
  }

  const CurrentIcon = themeIcons[theme]

  const handleThemeChange = (newTheme: keyof typeof themes) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg',
          'bg-background/50 backdrop-blur-sm border border-border',
          'hover:bg-accent hover:text-accent-foreground',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/50'
        )}
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme menu */}
          <div className={cn(
            'absolute top-full right-0 mt-2 z-50',
            'bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg',
            'p-2 min-w-[160px]'
          )}>
            {Object.entries(themes).map(([key, themeConfig]) => {
              const Icon = themeIcons[key as keyof typeof themeIcons]
              const isActive = theme === key
              
              return (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key as keyof typeof themes)}
                  className={cn(
                    'flex items-center gap-3 w-full p-2 rounded-md text-left',
                    'hover:bg-accent hover:text-accent-foreground',
                    'transition-colors duration-150',
                    isActive && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{themeConfig.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-current ml-auto" />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}