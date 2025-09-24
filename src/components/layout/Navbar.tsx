import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/useIntersectionObserver'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { NavCursorFollower } from '@/components/ui/CursorFollower'
import { useTheme } from '@/contexts/ThemeContext'

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
  const { theme } = useTheme()
  
  // Use white logo for dark themes (dark, aurora, matrix)
  const useWhiteLogo = theme === 'dark' || theme === 'aurora' || theme === 'matrix'

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
          <div className="flex h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group mr-8">
              <div className="relative">
                <img 
                  src={useWhiteLogo ? "/devnest-logo-white.png" : "/devnest-logo.png"}
                  alt="DevNest Studios" 
                  className="h-10 w-auto transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>

            {/* Desktop Navigation - Large screens (1280px+) */}
            <div className="hidden xl:flex items-center justify-center flex-1">
              <div className="flex items-center gap-8">
                <div className="relative nav-links">
                  <div className="flex items-center gap-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        data-nav-link={item.href}
                        data-nav-item

                        className={cn(
                          'px-4 py-2 text-base font-medium rounded-lg transition-colors relative z-10',
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
            </div>

            {/* Large Tablet Navigation - Compact menu (1024px-1279px) */}
            <div className="hidden lg:flex xl:hidden items-center justify-center flex-1">
              <div className="flex items-center gap-6">
                <div className="relative nav-links">
                  <div className="flex items-center gap-1">
                    {navigation.slice(0, 5).map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        data-nav-link={item.href}
                        data-nav-item
                        className={cn(
                          'px-3 py-2 text-sm font-medium rounded-md transition-colors relative z-10',
                          'hover:text-primary cursor-pointer',
                          location.pathname === item.href
                            ? 'text-primary'
                            : 'text-foreground/80'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {/* Dropdown for remaining items */}
                    <div className="relative group">
                      <button className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary cursor-pointer flex items-center gap-1">
                        More
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px]">
                        {navigation.slice(5).map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-3 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                        <Link
                          to="/trust-badges"
                          className="block px-3 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          Trust & Credentials
                        </Link>
                        <Link
                          to="/video-walkthroughs"
                          className="block px-3 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          Video Walkthroughs
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button variant="outline" size="sm" className="px-3 py-1.5 text-sm" asChild>
                    <Link to="/client-portal">Portal</Link>
                  </Button>
                  <Button variant="primary" size="sm" className="px-3 py-1.5 text-sm" asChild>
                    <Link to="/contact">Quote</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Medium Tablet Navigation - Buttons only (768px-1023px) */}
            <div className="hidden md:flex lg:hidden items-center justify-end flex-1">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="outline" size="sm" className="btn-tablet-compact btn-nowrap min-w-[80px]" asChild>
                  <Link to="/client-portal">Portal</Link>
                </Button>
                <Button variant="primary" size="sm" className="btn-tablet-compact btn-nowrap min-w-[70px]" asChild>
                  <Link to="/contact">Quote</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button - only show on small screens */}
            <div className="md:hidden flex items-center justify-end flex-1">
              <div className="flex items-center gap-2">
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
                
                <Link
                  to="/trust-badges"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-lg transition-colors cursor-pointer',
                    'hover:text-primary hover:bg-primary/10',
                    location.pathname === '/trust-badges'
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80'
                  )}
                >
                  Trust & Credentials
                </Link>
                
                <Link
                  to="/video-walkthroughs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-lg transition-colors cursor-pointer',
                    'hover:text-primary hover:bg-primary/10',
                    location.pathname === '/video-walkthroughs'
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80'
                  )}
                >
                  Video Walkthroughs
                </Link>
                
                <div className="pt-4 mt-4 border-t border-border/50 space-y-3">
                  <Button variant="outline" size="md" className="w-full" asChild>
                    <Link to="/client-portal" onClick={() => setMobileMenuOpen(false)}>
                      Client Portal
                    </Link>
                  </Button>
                  <Button variant="primary" size="md" className="w-full" asChild>
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