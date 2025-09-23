import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import { 
  ArrowLeft,
  ExternalLink,
  Play,
  Users,
  Star,
  Download,
  Clock,
  CheckCircle,
  Globe,
  Smartphone,
  Database,
  Brain,
  Code2,
  Zap,
  Target,
  TrendingUp,
  Award,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CounterAnimation } from '@/components/ui/CounterAnimation'

// Detailed product information interface
interface DetailedProduct {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  icon: React.ComponentType<any>
  category: string
  tags: string[]
  
  // Hero section
  hero: {
    tagline: string
    description: string
    video: string
    backgroundImage: string
  }
  
  // Problem & Solution
  problemSolution: {
    problem: {
      title: string
      description: string
      painPoints: string[]
    }
    solution: {
      title: string
      description: string
      approach: string[]
    }
  }
  
  // Features & Specifications
  features: {
    title: string
    description: string
    items: {
      icon: React.ComponentType<any>
      title: string
      description: string
    }[]
  }
  
  // Tech Stack
  techStack: {
    frontend: string[]
    backend: string[]
    database: string[]
    deployment: string[]
  }
  
  // Metrics & Results
  metrics: {
    beforeAfter: {
      title: string
      metrics: {
        label: string
        before: string
        after: string
        improvement: string
      }[]
    }
    keyStats: {
      downloads: number
      users: number
      rating: number
      uptime: string
    }
  }
  
  // Team & Timeline
  development: {
    team: {
      size: number
      roles: string[]
    }
    timeline: {
      planning: string
      development: string
      testing: string
      launch: string
    }
    challenges: string[]
  }
  
  // Testimonials
  testimonials: {
    client: string
    role: string
    company: string
    quote: string
    avatar: string
    rating: number
  }[]
  
  // Pricing (if public)
  pricing?: {
    plans: {
      name: string
      price: string
      period: string
      features: string[]
      popular?: boolean
    }[]
  }
  
  // Demo & Links
  demo: {
    liveUrl: string
    videoUrl?: string
    githubUrl?: string
    caseStudyUrl?: string
  }
  
  // Media
  media: {
    screenshots: string[]
    videos: string[]
    logos: string[]
  }
}

// Mock detailed product data
const detailedProducts: Record<string, DetailedProduct> = {
  'nextsaas-platform': {
    id: 'nextsaas-platform',
    title: 'NextSaaS Platform',
    subtitle: 'Complete SaaS Solution',
    description: 'Production-ready SaaS platform with multi-tenancy, payments, and analytics.',
    longDescription: 'A comprehensive Software-as-a-Service platform built with modern technologies.',
    icon: Globe,
    category: 'SaaS',
    tags: ['B2B', 'Enterprise', 'Fintech'],
    
    hero: {
      tagline: 'Build and Scale Your SaaS Business Faster Than Ever',
      description: 'Complete SaaS platform with everything you need: multi-tenancy, payments, analytics, and enterprise-grade security. Launch in days, not months.',
      video: '/api/placeholder/800/450?text=Hero+Video',
      backgroundImage: '/api/placeholder/1920/1080?text=Hero+Background'
    },
    
    problemSolution: {
      problem: {
        title: 'The SaaS Development Challenge',
        description: 'Building a SaaS platform from scratch takes 6-12 months and requires extensive expertise in multiple domains.',
        painPoints: [
          'Complex multi-tenant architecture',
          'Payment processing integration',
          'User management and permissions',
          'Scalable infrastructure setup',
          'Security and compliance requirements'
        ]
      },
      solution: {
        title: 'Our Complete SaaS Solution',
        description: 'Pre-built, production-ready platform that handles all the complex parts so you can focus on your core business logic.',
        approach: [
          'Plug-and-play multi-tenant architecture',
          'Integrated Stripe payment processing',
          'Advanced RBAC system',
          'Auto-scaling cloud infrastructure',
          'Built-in security and compliance features'
        ]
      }
    },
    
    features: {
      title: 'Enterprise-Grade Features',
      description: 'Everything you need to build, launch, and scale your SaaS business.',
      items: [
        {
          icon: Users,
          title: 'Multi-Tenant Architecture',
          description: 'Isolated tenant data with shared infrastructure for optimal performance and security.'
        },
        {
          icon: DollarSign,
          title: 'Payment Integration',
          description: 'Stripe integration with subscription management, invoicing, and dunning workflows.'
        },
        {
          icon: TrendingUp,
          title: 'Analytics Dashboard',
          description: 'Real-time insights into user behavior, revenue metrics, and business KPIs.'
        },
        {
          icon: CheckCircle,
          title: 'Role-Based Access',
          description: 'Granular permissions system with customizable roles and access controls.'
        }
      ]
    },
    
    techStack: {
      frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'GraphQL', 'JWT Authentication'],
      database: ['PostgreSQL', 'Prisma ORM', 'Redis Cache', 'Elasticsearch'],
      deployment: ['Vercel', 'AWS RDS', 'Docker', 'GitHub Actions']
    },
    
    metrics: {
      beforeAfter: {
        title: 'Transformation Results',
        metrics: [
          { label: 'Development Time', before: '6-12 months', after: '2-4 weeks', improvement: '90% faster' },
          { label: 'Infrastructure Cost', before: '$5000/month', after: '$500/month', improvement: '90% reduction' },
          { label: 'Time to Market', before: '12 months', after: '1 month', improvement: '92% faster' },
          { label: 'Developer Productivity', before: 'Baseline', after: '5x faster', improvement: '400% increase' }
        ]
      },
      keyStats: {
        downloads: 12500,
        users: 2400,
        rating: 4.8,
        uptime: '99.9%'
      }
    },
    
    development: {
      team: {
        size: 8,
        roles: ['Full-Stack Developers', 'DevOps Engineers', 'UI/UX Designers', 'Product Managers']
      },
      timeline: {
        planning: '2 weeks',
        development: '16 weeks',
        testing: '4 weeks',
        launch: '2 weeks'
      },
      challenges: [
        'Implementing secure multi-tenancy at scale',
        'Optimizing database queries for large datasets',
        'Building flexible payment workflows',
        'Ensuring 99.9% uptime requirements'
      ]
    },
    
    testimonials: [
      {
        client: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechFlow Inc',
        quote: 'NextSaaS Platform reduced our development time by 10 months. The multi-tenant architecture is robust and the payment integration works flawlessly.',
        avatar: '/api/placeholder/64/64?text=SJ',
        rating: 5
      },
      {
        client: 'Michael Chen',
        role: 'Founder',
        company: 'DataSync Pro',
        quote: 'Incredible platform. We launched our SaaS product in just 3 weeks instead of the projected 8 months. The ROI has been phenomenal.',
        avatar: '/api/placeholder/64/64?text=MC',
        rating: 5
      }
    ],
    
    pricing: {
      plans: [
        {
          name: 'Starter',
          price: '$29',
          period: 'per month',
          features: ['Up to 100 users', 'Basic analytics', 'Email support', 'Standard integrations']
        },
        {
          name: 'Professional',
          price: '$99',
          period: 'per month',
          features: ['Up to 1000 users', 'Advanced analytics', 'Priority support', 'Custom integrations', 'API access'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: 'contact us',
          features: ['Unlimited users', 'Custom features', '24/7 support', 'On-premise deployment', 'SLA guarantee']
        }
      ]
    },
    
    demo: {
      liveUrl: 'https://nextsaas-demo.devnest.com',
      videoUrl: 'https://youtube.com/watch?v=demo',
      githubUrl: 'https://github.com/devnest/nextsaas',
      caseStudyUrl: '/case-studies/nextsaas-platform'
    },
    
    media: {
      screenshots: [
        '/api/placeholder/800/600?text=Dashboard+Overview',
        '/api/placeholder/800/600?text=Analytics+Panel',
        '/api/placeholder/800/600?text=User+Management',
        '/api/placeholder/800/600?text=Payment+Settings'
      ],
      videos: [
        '/api/placeholder/800/450?text=Feature+Demo+1',
        '/api/placeholder/800/450?text=Feature+Demo+2'
      ],
      logos: [
        '/api/placeholder/120/60?text=Client+Logo+1',
        '/api/placeholder/120/60?text=Client+Logo+2'
      ]
    }
  }
  // Add more detailed products as needed
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState('overview')
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  
  const product = slug ? detailedProducts[slug] : null
  
  if (!product) {
    return <Navigate to="/products" replace />
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={product.hero.backgroundImage} 
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="outline" asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Products
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`
                  p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 
                  shadow-lg
                `}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">{product.title}</h1>
                  <p className="text-xl text-muted-foreground">{product.subtitle}</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {product.hero.tagline}
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.hero.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => window.open(product.demo.liveUrl, '_blank')}>
                  <ExternalLink className="mr-2 w-5 h-5" />
                  Live Demo
                </Button>
                {product.demo.videoUrl && (
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Video
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Hero Media */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={product.hero.video}
                  alt={`${product.title} Demo`}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <Button size="lg" className="opacity-90 hover:opacity-100">
                    <Play className="mr-2 w-6 h-6" />
                    Play Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto py-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'metrics', label: 'Results' },
              { id: 'tech', label: 'Tech Stack' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'pricing', label: 'Pricing' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all mr-2
                  ${activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12">
        {/* Overview Section */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Problem & Solution */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-red-500" />
                  {product.problemSolution.problem.title}
                </h3>
                <p className="text-muted-foreground mb-4">{product.problemSolution.problem.description}</p>
                <ul className="space-y-2">
                  {product.problemSolution.problem.painPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  {product.problemSolution.solution.title}
                </h3>
                <p className="text-muted-foreground mb-4">{product.problemSolution.solution.description}</p>
                <ul className="space-y-2">
                  {product.problemSolution.solution.approach.map((point, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Product Screenshots</h3>
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={product.media.screenshots[currentScreenshot]}
                    alt={`Screenshot ${currentScreenshot + 1}`}
                    className="w-full h-auto"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.media.screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`
                        relative rounded-lg overflow-hidden border-2 transition-colors
                        ${index === currentScreenshot ? 'border-primary' : 'border-border hover:border-primary/50'}
                      `}
                    >
                      <img 
                        src={screenshot}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Section */}
        {activeTab === 'features' && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{product.features.title}</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {product.features.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {product.features.items.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass border backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Metrics Section */}
        {activeTab === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{product.metrics.beforeAfter.title}</h2>
              <p className="text-xl text-muted-foreground">
                Measurable impact and transformation results
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {product.metrics.beforeAfter.metrics.map((metric, index) => (
                <div key={index} className="glass border backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="font-bold mb-4">{metric.label}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Before</div>
                      <div className="text-lg font-bold text-red-600">{metric.before}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">After</div>
                      <div className="text-lg font-bold text-green-600">{metric.after}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm font-medium text-primary">
                      {metric.improvement}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Stats */}
            <div className="glass border backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Key Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    <CounterAnimation end={Math.floor(product.metrics.keyStats.downloads / 1000)} suffix="k+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    <CounterAnimation end={Math.floor(product.metrics.keyStats.users / 100)} suffix="k+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {product.metrics.keyStats.rating}
                  </div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {product.metrics.keyStats.uptime}
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tech Stack Section */}
        {activeTab === 'tech' && (
          <motion.div
            key="tech"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
              <p className="text-xl text-muted-foreground">
                Modern, scalable technologies powering the platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {Object.entries(product.techStack).map(([category, technologies]) => (
                <div key={category} className="glass border backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="font-bold mb-4 capitalize">{category}</h3>
                  <div className="space-y-2">
                    {technologies.map((tech) => (
                      <div key={tech} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonials Section */}
        {activeTab === 'testimonials' && (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground">
                Real feedback from satisfied customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {product.testimonials.map((testimonial, index) => (
                <div key={index} className="glass border backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.client}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.client}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pricing Section */}
        {activeTab === 'pricing' && product.pricing && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Flexible Pricing Plans</h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that fits your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {product.pricing.plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`
                    glass border backdrop-blur-sm rounded-2xl p-6 relative
                    ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''}
                  `}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}