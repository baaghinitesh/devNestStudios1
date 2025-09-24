import { Link } from 'react-router-dom'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
  ],
  services: [
    { name: 'Web Development', href: '/services#web' },
    { name: 'Mobile Apps', href: '/services#mobile' },
    { name: 'UI/UX Design', href: '/services#design' },
    { name: 'Consulting', href: '/services#consulting' },
  ],
  resources: [
    { name: 'Case Studies', href: '/projects' },
    { name: 'Insights', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Get Quote', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/devneststudios' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/devneststudios' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/devneststudios' },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              {/* Light mode logo */}
              <img 
                src="/devnest-logo.png" 
                alt="DevNest Studios Logo" 
                className="h-12 w-auto hover:scale-105 transition-all duration-200 dark:hidden"
              />
              {/* Dark mode logo */}
              <img 
                src="/devnest-logo-white.png" 
                alt="DevNest Studios Logo" 
                className="h-12 w-auto hover:scale-105 transition-all duration-200 hidden dark:block"
              />
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              We bring ideas to life through product-grade engineering with delightful design 
              and human-first delivery. Let's build something amazing together.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:hello@devneststudios.com" className="hover:text-primary transition-colors">
                  hello@devneststudios.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">
                Get insights on design, development, and digital trends.
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button variant="primary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© 2024 DevNestStudios. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}