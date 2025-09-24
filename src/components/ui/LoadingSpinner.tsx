import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  withLogo?: boolean
}

export function LoadingSpinner({ size = 'md', className, withLogo = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const logoSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }

  if (withLogo) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div
            className={cn(
              'animate-spin rounded-full border-2 border-primary/20 border-t-primary',
              logoSizeClasses[size],
              className
            )}
            role="status"
            aria-label="Loading"
          >
            <div className="absolute inset-2 flex items-center justify-center">
              <img 
                src="/favicon.ico" 
                alt="Loading" 
                className={cn(
                  'rounded-full opacity-80',
                  size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7'
                )}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div 
                className={cn(
                  'rounded-full bg-primary/20 flex items-center justify-center',
                  size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7'
                )}
                style={{display: 'none'}}
              >
                <div className={cn(
                  'w-1 h-1 bg-primary rounded-full',
                  size !== 'sm' && 'w-2 h-2'
                )} />
              </div>
            </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}