import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Zap,
  ArrowRight,
  Play,
  Pause,
  ExternalLink,
  Github,
  Star,
  Users,
  Download,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlowCard } from '@/components/ui/GlowCard'
import { CounterAnimation } from '@/components/ui/CounterAnimation'
import { ElevatedScrollShowcase } from '@/components/ui/AutoscrollShowcase'
import { InteractiveDemo } from '@/components/ui/InteractiveDemo'

interface Product {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<any>
  category: 'web' | 'mobile' | 'api' | 'desktop'
  techStack: string[]
  features: string[]
  demoUrl?: string
  githubUrl?: string
  liveDemo: boolean
  stats: {
    downloads?: number
    stars?: number
    users?: number
  }
  color: string
  gradient: string
}

const products: Product[] = [
  {
    id: 'nextsaas',
    title: 'NextSaaS Platform',
    subtitle: 'Complete SaaS Boilerplate',
    description: 'Production-ready SaaS platform with authentication, payments, multi-tenancy, and advanced dashboard analytics.',
    icon: Globe,
    category: 'web',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'NextAuth'],
    features: [
      'Multi-tenant architecture',
      'Stripe payment integration',
      'Role-based access control',
      'Real-time analytics dashboard',
      'API rate limiting',
      'Email automation'
    ],
    demoUrl: 'https://nextsaas-demo.devnest.com',
    githubUrl: 'https://github.com/devnest/nextsaas',
    liveDemo: true,
    stats: {
      downloads: 12500,
      stars: 890,
      users: 2400
    },
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'reactnative-kit',
    title: 'ReactNative Pro Kit',
    subtitle: 'Mobile App Development Suite',
    description: 'Cross-platform mobile development kit with 50+ pre-built components, navigation, and native integrations.',
    icon: Smartphone,
    category: 'mobile',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase'],
    features: [
      '50+ premium components',
      'Dark/Light theme support',
      'Push notifications',
      'Offline data sync',
      'Biometric authentication',
      'In-app purchases'
    ],
    demoUrl: 'https://reactnative-demo.devnest.com',
    githubUrl: 'https://github.com/devnest/rn-pro-kit',
    liveDemo: true,
    stats: {
      downloads: 8900,
      stars: 654,
      users: 1800
    },
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'graphql-engine',
    title: 'GraphQL Engine',
    subtitle: 'API Development Platform',
    description: 'High-performance GraphQL API engine with real-time subscriptions, caching, and auto-generated documentation.',
    icon: Database,
    category: 'api',
    techStack: ['GraphQL', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Auto-generated schemas',
      'Real-time subscriptions',
      'Advanced caching layers',
      'Rate limiting & security',
      'Monitoring & analytics',
      'Multi-database support'
    ],
    demoUrl: 'https://graphql-demo.devnest.com',
    githubUrl: 'https://github.com/devnest/graphql-engine',
    liveDemo: true,
    stats: {
      downloads: 15600,
      stars: 1200,
      users: 3200
    },
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'electron-suite',
    title: 'Electron Suite',
    subtitle: 'Desktop App Framework',
    description: 'Modern desktop application framework with auto-updates, native integrations, and cross-platform deployment.',
    icon: Code2,
    category: 'desktop',
    techStack: ['Electron', 'React', 'TypeScript', 'Webpack', 'Node.js'],
    features: [
      'Auto-update mechanism',
      'Native menu integration',
      'System tray support',
      'File system access',
      'Hardware acceleration',
      'Code signing & distribution'
    ],
    demoUrl: 'https://electron-demo.devnest.com',
    githubUrl: 'https://github.com/devnest/electron-suite',
    liveDemo: false,
    stats: {
      downloads: 7300,
      stars: 445,
      users: 950
    },
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20'
  },
  {
    id: 'cloud-deploy',
    title: 'CloudDeploy Pro',
    subtitle: 'Deployment Automation',
    description: 'One-click deployment platform for modern applications with CI/CD pipelines, monitoring, and scaling.',
    icon: Cloud,
    category: 'web',
    techStack: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform'],
    features: [
      'Zero-config deployments',
      'Auto-scaling capabilities',
      'Health monitoring',
      'Rollback mechanisms',
      'Environment management',
      'Cost optimization'
    ],
    demoUrl: 'https://clouddeploy-demo.devnest.com',
    githubUrl: 'https://github.com/devnest/cloud-deploy',
    liveDemo: true,
    stats: {
      downloads: 9800,
      stars: 720,
      users: 1600
    },
    color: 'from-indigo-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-blue-600/20'
  },
  {
    id: 'ai-toolkit',
    title: 'AI Development Toolkit',
    subtitle: 'Machine Learning Suite',
    description: 'Comprehensive AI/ML development toolkit with pre-trained models, data processing, and deployment utilities.',
    icon: Zap,
    category: 'api',
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI', 'MLflow'],
    features: [
      'Pre-trained AI models',
      'Data pipeline automation',
      'Model versioning',
      'A/B testing framework',
      'Performance monitoring',
      'Edge deployment'
    ],
    demoUrl: 'https://ai-toolkit-demo.devnest.com',
    githubUrl: 'https://github.com/devnest/ai-toolkit',
    liveDemo: true,
    stats: {
      downloads: 11200,
      stars: 980,
      users: 2100
    },
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
  }
]

const categories = [
  { id: 'all', label: 'All Products', icon: Globe },
  { id: 'web', label: 'Web Platforms', icon: Globe },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'api', label: 'API & Backend', icon: Database },
  { id: 'desktop', label: 'Desktop Apps', icon: Code2 }
]

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<Product | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div ref={containerRef} className="min-h-screen pt-20">
      {/* Parallax Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="relative py-20 overflow-hidden"
      >
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
              Cutting-edge software solutions that power the next generation of digital experiences.
              From SaaS platforms to AI toolkits, we build products that scale.
            </p>
            
            {/* Product Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={6} suffix="" />
                </div>
                <div className="text-sm text-muted-foreground">Active Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={65} suffix="k+" />
                </div>
                <div className="text-sm text-muted-foreground">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={12} suffix="k+" />
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <section className="py-12">
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
                  ${selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
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

      {/* Elevated Autoscroll Showcase */}
      <section className="py-20">
        <ElevatedScrollShowcase
          title="Premium Product Showcase"
          subtitle="Experience our flagship products with interactive demonstrations and live previews"
          items={products.map(product => ({
            id: product.id,
            title: product.title,
            subtitle: product.subtitle,
            description: product.description,
            image: `/api/placeholder/400/300?text=${encodeURIComponent(product.title)}`,
            gradient: product.color
          }))}
        />
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Product Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our full range of software products, each designed to accelerate your development workflow and enhance your digital presence.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isHovered={hoveredProduct === product.id}
                onHover={setHoveredProduct}
                onDemoClick={setSelectedDemo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
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
              <Button size="lg" className="text-lg px-8">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Modal */}
      <InteractiveDemo
        isOpen={selectedDemo !== null}
        onClose={() => setSelectedDemo(null)}
        product={selectedDemo || products[0]}
      />
    </div>
  )
}

interface ProductCardProps {
  product: Product
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
  onDemoClick: (product: Product) => void
}

function ProductCard({ product, index, isHovered, onHover, onDemoClick }: ProductCardProps) {
  const [isDemoPlaying, setIsDemoPlaying] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative"
    >
      <GlowCard className="h-full p-8 overflow-hidden">
        {/* Product Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`
              p-3 rounded-2xl bg-gradient-to-br ${product.color} 
              shadow-lg group-hover:shadow-xl transition-shadow
            `}>
              <product.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">{product.title}</h3>
              <p className="text-muted-foreground">{product.subtitle}</p>
            </div>
          </div>
          
          {product.liveDemo && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDemoPlaying(!isDemoPlaying)}
              className={`
                p-2 rounded-full transition-colors
                ${isDemoPlaying 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white hover:bg-green-600'
                }
              `}
            >
              {isDemoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
          )}
        </div>

        {/* Product Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Key Features</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {product.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {product.stats.downloads && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Download className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-bold">
                  <CounterAnimation end={Math.floor(product.stats.downloads / 1000)} suffix="k" />
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Downloads</div>
            </div>
          )}
          
          {product.stats.stars && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-sm font-bold">
                  <CounterAnimation end={product.stats.stars} suffix="" />
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Stars</div>
            </div>
          )}
          
          {product.stats.users && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-bold">
                  <CounterAnimation end={Math.floor(product.stats.users / 100)} suffix="k" />
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Users</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="default" 
            className="flex-1 group"
            onClick={() => onDemoClick(product)}
          >
            Interactive Demo
            <Play className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>
          
          {product.githubUrl && (
            <Button 
              variant="outline" 
              className="flex-1"
              asChild
            >
              <a href={product.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-4 h-4" />
                Code
              </a>
            </Button>
          )}
        </div>

        {/* Demo Preview Overlay */}
        {isDemoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 flex items-center justify-center z-10"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
              <p className="text-white">Loading Interactive Demo...</p>
            </div>
          </motion.div>
        )}
      </GlowCard>
    </motion.div>
  )
}

export default Products