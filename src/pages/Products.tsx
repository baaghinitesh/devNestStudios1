import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Database, 
  Zap,
  Brain,
  ArrowRight,
  Play,
  ExternalLink,
  Star,
  Users,
  Download,
  Tag,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CounterAnimation } from '@/components/ui/CounterAnimation'

// Enhanced Product Interface with all required fields
interface Product {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  icon: React.ComponentType<any>
  category: 'All' | 'Web' | 'Mobile' | 'SaaS' | 'AI'
  tags: string[]
  features: string[]
  techStack: {
    name: string
    icon: string
  }[]
  images: {
    screenshots: string[]
    gif: string
    thumbnail: string
  }
  demoUrl: string
  detailsUrl: string
  pricing?: {
    type: 'Free' | 'Paid' | 'Freemium'
    startingPrice?: string
  }
  stats: {
    downloads?: number
    stars?: number
    users?: number
    rating?: number
  }
  gradient: string
  status: 'Live' | 'Beta' | 'Coming Soon'
}

// Enhanced product data with complete specifications
const products: Product[] = [
  {
    id: 'nextsaas-platform',
    title: 'NextSaaS Platform',
    subtitle: 'Complete SaaS Solution',
    description: 'Production-ready SaaS platform with multi-tenancy, payments, and analytics.',
    longDescription: 'A comprehensive Software-as-a-Service platform built with modern technologies, featuring multi-tenant architecture, integrated payment processing, advanced analytics dashboard, and enterprise-grade security.',
    icon: Globe,
    category: 'SaaS',
    tags: ['B2B', 'Enterprise', 'Fintech'],
    features: [
      'Multi-tenant architecture',
      'Integrated Stripe payments',
      'Real-time analytics',
      'Role-based access control'
    ],
    techStack: [
      { name: 'Next.js', icon: '⚡' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Prisma', icon: '🔺' },
      { name: 'Stripe', icon: '💳' }
    ],
    images: {
      screenshots: [
        '/api/placeholder/800/600?text=Dashboard+Overview',
        '/api/placeholder/800/600?text=Analytics+Panel',
        '/api/placeholder/800/600?text=User+Management'
      ],
      gif: '/api/placeholder/800/600?text=Platform+Demo+GIF',
      thumbnail: '/api/placeholder/400/300?text=NextSaaS+Platform'
    },
    demoUrl: 'https://nextsaas-demo.devnest.com',
    detailsUrl: '/products/nextsaas-platform',
    pricing: {
      type: 'Freemium',
      startingPrice: '$29/month'
    },
    stats: {
      downloads: 12500,
      stars: 890,
      users: 2400,
      rating: 4.8
    },
    gradient: 'from-blue-500 to-cyan-500',
    status: 'Live'
  },
  {
    id: 'mobile-pro-kit',
    title: 'Mobile Pro Kit',
    subtitle: 'React Native Suite',
    description: 'Cross-platform mobile development kit with 50+ components and native features.',
    longDescription: 'Professional mobile application development suite featuring pre-built components, native integrations, advanced navigation patterns, and deployment automation for iOS and Android platforms.',
    icon: Smartphone,
    category: 'Mobile',
    tags: ['Cross-platform', 'B2B', 'Mobile-first'],
    features: [
      '50+ premium components',
      'Native integrations',
      'Push notifications',
      'Offline synchronization'
    ],
    techStack: [
      { name: 'React Native', icon: '📱' },
      { name: 'Expo', icon: '🚀' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Redux', icon: '🔄' }
    ],
    images: {
      screenshots: [
        '/api/placeholder/800/600?text=Mobile+Components',
        '/api/placeholder/800/600?text=Navigation+System',
        '/api/placeholder/800/600?text=Native+Features'
      ],
      gif: '/api/placeholder/800/600?text=Mobile+Demo+GIF',
      thumbnail: '/api/placeholder/400/300?text=Mobile+Pro+Kit'
    },
    demoUrl: 'https://mobile-demo.devnest.com',
    detailsUrl: '/products/mobile-pro-kit',
    pricing: {
      type: 'Paid',
      startingPrice: '$199'
    },
    stats: {
      downloads: 8900,
      stars: 654,
      users: 1800,
      rating: 4.6
    },
    gradient: 'from-purple-500 to-pink-500',
    status: 'Live'
  },
  {
    id: 'ai-analytics-engine',
    title: 'AI Analytics Engine',
    subtitle: 'Machine Learning Platform',
    description: 'Advanced AI-powered analytics platform with predictive modeling and insights.',
    longDescription: 'Cutting-edge artificial intelligence platform that leverages machine learning algorithms to provide predictive analytics, automated insights, and intelligent decision-making capabilities for enterprise applications.',
    icon: Brain,
    category: 'AI',
    tags: ['AI/ML', 'Enterprise', 'Analytics'],
    features: [
      'Predictive analytics',
      'Automated insights',
      'Real-time processing',
      'Custom model training'
    ],
    techStack: [
      { name: 'Python', icon: '🐍' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Docker', icon: '🐳' }
    ],
    images: {
      screenshots: [
        '/api/placeholder/800/600?text=AI+Dashboard',
        '/api/placeholder/800/600?text=Model+Training',
        '/api/placeholder/800/600?text=Analytics+View'
      ],
      gif: '/api/placeholder/800/600?text=AI+Demo+GIF',
      thumbnail: '/api/placeholder/400/300?text=AI+Analytics+Engine'
    },
    demoUrl: 'https://ai-demo.devnest.com',
    detailsUrl: '/products/ai-analytics-engine',
    pricing: {
      type: 'Freemium',
      startingPrice: '$99/month'
    },
    stats: {
      downloads: 5600,
      stars: 423,
      users: 890,
      rating: 4.9
    },
    gradient: 'from-green-500 to-emerald-500',
    status: 'Live'
  },
  {
    id: 'web-builder-pro',
    title: 'WebBuilder Pro',
    subtitle: 'No-Code Website Builder',
    description: 'Professional website builder with drag-and-drop interface and advanced features.',
    longDescription: 'Revolutionary no-code website building platform that empowers users to create professional websites with advanced drag-and-drop functionality, custom animations, and enterprise-level hosting.',
    icon: Code2,
    category: 'Web',
    tags: ['No-code', 'SaaS', 'Website Builder'],
    features: [
      'Drag-and-drop builder',
      'Custom animations',
      'E-commerce integration',
      'SEO optimization'
    ],
    techStack: [
      { name: 'React', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'AWS', icon: '☁️' }
    ],
    images: {
      screenshots: [
        '/api/placeholder/800/600?text=Builder+Interface',
        '/api/placeholder/800/600?text=Template+Gallery',
        '/api/placeholder/800/600?text=Site+Preview'
      ],
      gif: '/api/placeholder/800/600?text=Builder+Demo+GIF',
      thumbnail: '/api/placeholder/400/300?text=WebBuilder+Pro'
    },
    demoUrl: 'https://webbuilder-demo.devnest.com',
    detailsUrl: '/products/web-builder-pro',
    pricing: {
      type: 'Freemium',
      startingPrice: '$19/month'
    },
    stats: {
      downloads: 15200,
      stars: 1100,
      users: 4200,
      rating: 4.7
    },
    gradient: 'from-orange-500 to-red-500',
    status: 'Live'
  }
]

// Filter categories
const categories = [
  { id: 'All', label: 'All Products', icon: Globe },
  { id: 'Web', label: 'Web Platforms', icon: Globe },
  { id: 'Mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'SaaS', label: 'SaaS Solutions', icon: Database },
  { id: 'AI', label: 'AI & ML', icon: Brain }
]

// Enhanced Product Card Component
interface ProductCardProps {
  product: Product
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
  onNavigate: (path: string) => void
}

function ProductCard({ product, index, isHovered, onHover, onNavigate }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  // Auto-scroll through images
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === product.images.screenshots.length - 1 ? 0 : prev + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoScrolling, product.images.screenshots.length])

  const handleMouseEnter = () => {
    onHover(product.id)
    setIsAutoScrolling(false)
  }

  const handleMouseLeave = () => {
    onHover(null)
    setIsAutoScrolling(true)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="relative h-full glass border backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
            ${product.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              product.status === 'Beta' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-orange-500/20 text-orange-400 border border-orange-500/30'
            }
          `}>
            {product.status}
          </span>
        </div>

        {/* Auto-scroll Image Carousel */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {product.images.screenshots.map((image, imgIndex) => (
              <div key={imgIndex} className="w-full h-48 flex-shrink-0">
                <img
                  src={image}
                  alt={`${product.title} screenshot ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-10`} />
          
          {/* Image Dots Indicator */}
          <div className="absolute bottom-4 left-4 flex gap-1">
            {product.images.screenshots.map((_, imgIndex) => (
              <div
                key={imgIndex}
                className={`w-2 h-2 rounded-full transition-colors ${
                  imgIndex === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Product Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`
                p-2 rounded-xl bg-gradient-to-br ${product.gradient} 
                shadow-lg group-hover:shadow-xl transition-shadow
              `}>
                <product.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-muted/50 rounded-md text-xs font-medium flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider">Key Features</h4>
            <ul className="grid grid-cols-2 gap-1 text-xs">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-center gap-1 text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Icons */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md text-xs"
                  title={tech.name}
                >
                  <span>{tech.icon}</span>
                  <span className="hidden sm:inline">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6 text-center">
            {product.stats.users && (
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-bold">
                    <CounterAnimation end={Math.floor(product.stats.users / 100)} suffix="k" />
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Users</div>
              </div>
            )}
            
            {product.stats.stars && (
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-bold">{product.stats.stars}</span>
                </div>
                <div className="text-xs text-muted-foreground">Stars</div>
              </div>
            )}
            
            {product.stats.rating && (
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-xs font-bold">{product.stats.rating}</span>
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="default" 
              className="flex-1 group text-sm h-9"
              onClick={() => window.open(product.demoUrl, '_blank')}
            >
              <ExternalLink className="mr-2 w-4 h-4" />
              Demo
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1 text-sm h-9"
              onClick={() => onNavigate(product.detailsUrl)}
            >
              <ArrowRight className="mr-2 w-4 h-4" />
              Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const navigate = useNavigate()

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover our comprehensive suite of software solutions designed to accelerate 
              your development workflow and transform your digital presence.
            </p>
            
            {/* Product Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={4} suffix="" />
                </div>
                <div className="text-sm text-muted-foreground">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={42} suffix="k+" />
                </div>
                <div className="text-sm text-muted-foreground">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={9} suffix="k+" />
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                  glass border backdrop-blur-sm
                  ${selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary/50'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border-border/50'
                  }
                `}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {selectedCategory === 'All' ? 'Complete Product Suite' : `${selectedCategory} Solutions`}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our {selectedCategory.toLowerCase() === 'all' ? 'full range of' : selectedCategory.toLowerCase()} 
              {' '}software products, each designed with precision and built for scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isHovered={hoveredProduct === product.id}
                onHover={setHoveredProduct}
                onNavigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get access to our entire product suite and start building your next big idea today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/contact">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/contact">
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}