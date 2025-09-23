import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-50 transition-all duration-300',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <Button
        variant="primary"
        size="sm"
        onClick={scrollToTop}
        className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </Button>
    </div>
  )
}