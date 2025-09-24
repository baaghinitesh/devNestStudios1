import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Code2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/useIntersectionObserver'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { NavCursorFollower } from '@/components/ui/CursorFollower'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 })
  const { scrollDirection, scrollY } = useScrollDirection()
  const location = useLocation()

  // Hide navbar on scroll down, show on scroll up
  const shouldHideNavbar = scrollDirection === 'down' && scrollY > 100

  // Update active indicator position
  useEffect(() => {
    const activeLink = document.querySelector(`[data-nav-link="${location.pathname}"]`) as HTMLElement
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect()
      const navbar = activeLink.closest('.nav-links') as HTMLElement
      const navbarRect = navbar?.getBoundingClientRect()
      
      if (navbarRect) {
        setActiveIndicator({
          left: rect.left - navbarRect.left,
          width: rect.width
        })
      }
    }
  }, [location.pathname])

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        shouldHideNavbar ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <nav className={cn(
        'w-full px-4 sm:px-6 lg:px-8',
        'glass-navbar'
      )}>
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Code2 className="w-8 h-8 text-primary transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              DevNestStudios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative nav-links">
              <div className="flex items-center gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    data-nav-link={item.href}
                    data-nav-item

                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors relative z-10',
                      'hover:text-primary cursor-pointer',
                      location.pathname === item.href
                        ? 'text-primary'
                        : 'text-foreground/80'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Active indicator */}
              <div
                className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 rounded-full"
                style={{
                  left: activeIndicator.left,
                  width: activeIndicator.width
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <Link to="/client-portal">Client Portal</Link>
              </Button>
              <Button variant="primary" size="sm" asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          </div>

          {/* Cursor Follower for Desktop Navigation */}
          <NavCursorFollower />

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 text-base font-medium rounded-lg transition-colors cursor-pointer',
                      'hover:text-primary hover:bg-primary/10',
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/80'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 mt-4 border-t border-border/50">
                  <Button variant="primary" size="sm" className="w-full" asChild>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}