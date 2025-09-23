import React from 'react'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'default'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  asChild?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  asChild = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden'
  ]

  const variants = {
    default: [
      'bg-primary text-primary-foreground shadow-md',
      'hover:bg-primary/90 hover:shadow-lg',
      'focus:ring-primary/50',
      'active:scale-95'
    ],
    primary: [
      'bg-primary text-primary-foreground shadow-md',
      'hover:bg-primary/90 hover:shadow-lg',
      'focus:ring-primary/50',
      'active:scale-95'
    ],
    secondary: [
      'bg-secondary text-secondary-foreground shadow-sm',
      'hover:bg-secondary/80 hover:shadow-md',
      'focus:ring-secondary/50'
    ],
    outline: [
      'border-2 border-border bg-transparent',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:ring-primary/50'
    ],
    ghost: [
      'bg-transparent hover:bg-accent hover:text-accent-foreground',
      'focus:ring-primary/50'
    ],
    destructive: [
      'bg-destructive text-destructive-foreground shadow-md',
      'hover:bg-destructive/90 hover:shadow-lg',
      'focus:ring-destructive/50'
    ]
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12'
  }

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  )

  if (asChild) {
    try {
      const childElement = React.Children.only(children) as React.ReactElement<any>
      return React.cloneElement(childElement, {
        className: cn(childElement.props?.className, classes),
        disabled: disabled || loading,
        ...childElement.props,
        ...props,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          if (disabled || loading) {
            e.preventDefault()
            return
          }
          // Call both the original onClick and any passed onClick
          childElement.props?.onClick?.(e)
          props.onClick?.(e as any)
        }
      })
    } catch (error) {
      console.warn('Button asChild failed, falling back to regular button:', error)
      // Fallback to regular button if asChild fails
    }
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" />
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}