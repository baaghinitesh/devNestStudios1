import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { 
  Code2, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Calendar,
  MessageSquare,
  Shield,
  Cpu,
  Palette,
  Search,
  BarChart3,
  Headphones
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlowCard } from '@/components/ui/GlowCard'
import { CounterAnimation } from '@/components/ui/CounterAnimation'
import { MicroDemo } from '@/components/ui/MicroDemo'
import { cn } from '@/lib/utils'

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<any>
  features: string[]
  pricing: {
    starter: number
    professional: number
    enterprise: string
  }
  deliveryTime: string
  techStack: string[]
  color: string
  gradient: string
}

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
}

const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Modern Web Applications',
    description: 'Full-stack web development using cutting-edge technologies. From responsive websites to complex web applications with real-time features.',
    icon: Globe,
    features: [
      'Responsive Design & Mobile-First Approach',
      'Progressive Web App (PWA) Development',
      'Real-time Features & WebSocket Integration',
      'SEO Optimization & Performance Tuning',
      'API Integration & Backend Development',
      'E-commerce & Payment Gateway Integration'
    ],
    pricing: {
      starter: 2999,
      professional: 7999,
      enterprise: 'Custom'
    },
    deliveryTime: '2-8 weeks',
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    subtitle: 'Native & Cross-Platform Apps',
    description: 'High-performance mobile applications for iOS and Android using React Native and native technologies with seamless user experiences.',
    icon: Smartphone,
    features: [
      'Cross-Platform Development (iOS & Android)',
      'Native Performance Optimization',
      'Push Notifications & Deep Linking',
      'Offline Functionality & Data Sync',
      'Biometric Authentication Integration',
      'App Store Deployment & Maintenance'
    ],
    pricing: {
      starter: 4999,
      professional: 12999,
      enterprise: 'Custom'
    },
    deliveryTime: '3-12 weeks',
    techStack: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'api-development',
    title: 'API Development',
    subtitle: 'Scalable Backend Solutions',
    description: 'Robust and scalable API development with microservices architecture, real-time capabilities, and comprehensive documentation.',
    icon: Database,
    features: [
      'RESTful & GraphQL API Development',
      'Microservices Architecture Design',
      'Real-time Data Synchronization',
      'API Security & Authentication',
      'Auto-generated Documentation',
      'Load Testing & Performance Optimization'
    ],
    pricing: {
      starter: 3999,
      professional: 9999,
      enterprise: 'Custom'
    },
    deliveryTime: '3-10 weeks',
    techStack: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker'],
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'cloud-deployment',
    title: 'Cloud & DevOps',
    subtitle: 'Deployment & Infrastructure',
    description: 'Complete cloud deployment solutions with CI/CD pipelines, monitoring, scaling, and infrastructure management for modern applications.',
    icon: Cloud,
    features: [
      'AWS/GCP/Azure Cloud Setup',
      'CI/CD Pipeline Configuration',
      'Containerization with Docker & Kubernetes',
      'Auto-scaling & Load Balancing',
      'Monitoring & Logging Solutions',
      'Backup & Disaster Recovery'
    ],
    pricing: {
      starter: 1999,
      professional: 5999,
      enterprise: 'Custom'
    },
    deliveryTime: '1-6 weeks',
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    color: 'from-indigo-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-blue-600/20'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'User Experience Design',
    description: 'Comprehensive design solutions from user research to interactive prototypes, ensuring exceptional user experiences across all platforms.',
    icon: Palette,
    features: [
      'User Research & Persona Development',
      'Wireframing & Interactive Prototyping',
      'Visual Design & Brand Identity',
      'Usability Testing & Optimization',
      'Design System Creation',
      'Accessibility & Inclusive Design'
    ],
    pricing: {
      starter: 2499,
      professional: 6999,
      enterprise: 'Custom'
    },
    deliveryTime: '2-8 weeks',
    techStack: ['Figma', 'Adobe XD', 'Principle', 'Framer', 'InVision'],
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
  },
  {
    id: 'ai-ml-solutions',
    title: 'AI/ML Solutions',
    subtitle: 'Artificial Intelligence Integration',
    description: 'Custom AI and machine learning solutions including chatbots, recommendation systems, predictive analytics, and automation tools.',
    icon: Zap,
    features: [
      'Custom AI Model Development',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Recognition',
      'Predictive Analytics & Forecasting',
      'Chatbot & Virtual Assistant Development',
      'AI Integration & Deployment'
    ],
    pricing: {
      starter: 5999,
      professional: 15999,
      enterprise: 'Custom'
    },
    deliveryTime: '4-16 weeks',
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face'],
    color: 'from-red-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
  }
]

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$2,999',
    period: 'starting from',
    description: 'Perfect for small projects and startups looking to establish their digital presence.',
    features: [
      'Single Service Focus',
      '4-8 Week Delivery',
      'Basic Support (Email)',
      'Standard Documentation',
      '2 Revisions Included',
      '30-day Bug Fix Warranty'
    ],
    cta: 'Start Project'
  },
  {
    name: 'Professional',
    price: '$7,999',
    period: 'starting from',
    description: 'Comprehensive solutions for growing businesses requiring advanced features and integrations.',
    features: [
      'Multiple Service Integration',
      'Priority Development Queue',
      'Dedicated Project Manager',
      'Advanced Documentation',
      'Unlimited Revisions',
      '90-day Support & Maintenance',
      'Performance Optimization',
      'Security Audit Included'
    ],
    popular: true,
    cta: 'Get Started'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored pricing',
    description: 'Large-scale solutions with custom requirements, dedicated teams, and ongoing partnerships.',
    features: [
      'Custom Solution Architecture',
      'Dedicated Development Team',
      '24/7 Priority Support',
      'SLA Guarantees',
      'Ongoing Maintenance',
      'Training & Consultation',
      'Scalability Planning',
      'White-label Options',
      'Custom Integrations'
    ],
    cta: 'Contact Sales'
  }
]

export function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

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
                Services
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              End-to-end software development services that transform your ideas into powerful digital solutions.
              From concept to deployment, we've got you covered.
            </p>
            
            {/* Service Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-12">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Code2 className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={6} suffix="" />
                </div>
                <div className="text-sm text-muted-foreground">Core Services</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={150} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={98} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">On-time Delivery</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <CounterAnimation end={4.9} suffix="/5" />
                </div>
                <div className="text-sm text-muted-foreground">Client Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What We{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Build
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive software development services tailored to your business needs and growth objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isSelected={selectedService === service.id}
                isHovered={hoveredService === service.id}
                onSelect={setSelectedService}
                onHover={setHoveredService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Transparent{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your project. All plans include our standard quality guarantees and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery from concept to launch.
            </p>
          </div>

          <ProcessTimeline />
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
              Ready to Start Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Project?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your requirements and create a custom solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <MessageSquare className="mr-2 w-5 h-5" />
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

interface ServiceCardProps {
  service: Service
  index: number
  isSelected: boolean
  isHovered: boolean
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
}

function ServiceCard({ service, index, isSelected, isHovered, onSelect, onHover }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative"
    >
      <GlowCard className={cn(
        "h-full p-8 cursor-pointer transition-all duration-300",
        isSelected && "ring-2 ring-primary"
      )}>
        {/* Service Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={cn(
            "p-3 rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300",
            service.color,
            isHovered && "scale-110 shadow-xl"
          )}>
            <service.icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
            <p className="text-muted-foreground">{service.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Key Features</h4>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Preview */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Starting from</div>
          <div className="text-2xl font-bold text-primary">
            ${service.pricing.starter.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Delivery: {service.deliveryTime}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full group"
          onClick={() => onSelect(isSelected ? null : service.id)}
        >
          {isSelected ? 'Hide Details' : 'Learn More'}
          <ArrowRight className={cn(
            "ml-2 w-4 h-4 transition-transform",
            isSelected && "rotate-90"
          )} />
        </Button>

        {/* Micro Demo */}
        <MicroDemo
          serviceId={service.id}
          isActive={isSelected}
        />

        {/* Expanded Details */}
        <motion.div
          initial={false}
          animate={{ 
            height: isSelected ? 'auto' : 0,
            opacity: isSelected ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {isSelected && (
            <div className="pt-6 mt-6 border-t border-border">
              {/* All Features */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Complete Feature List</h4>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Pricing Options</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Starter Package:</span>
                    <span className="font-semibold">${service.pricing.starter.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Package:</span>
                    <span className="font-semibold">${service.pricing.professional.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enterprise Package:</span>
                    <span className="font-semibold">{service.pricing.enterprise}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </GlowCard>
    </motion.div>
  )
}

interface PricingCardProps {
  tier: PricingTier
  index: number
}

function PricingCard({ tier, index }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative",
        tier.popular && "scale-105"
      )}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary to-accent px-4 py-1 rounded-full text-white text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <GlowCard className={cn(
        "h-full p-8 text-center",
        tier.popular && "ring-2 ring-primary"
      )}>
        <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary">{tier.price}</span>
          <span className="text-muted-foreground ml-2">{tier.period}</span>
        </div>
        <p className="text-muted-foreground mb-8">{tier.description}</p>

        <ul className="space-y-3 mb-8 text-left">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Button 
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
        >
          {tier.cta}
        </Button>
      </GlowCard>
    </motion.div>
  )
}

function ProcessTimeline() {
  const steps = [
    {
      title: 'Discovery & Planning',
      description: 'We understand your requirements, goals, and technical needs through detailed consultation.',
      icon: Search,
      duration: '1-2 weeks'
    },
    {
      title: 'Design & Architecture',
      description: 'Creating wireframes, mockups, and technical architecture for your solution.',
      icon: Palette,
      duration: '1-3 weeks'
    },
    {
      title: 'Development & Testing',
      description: 'Agile development with regular updates and comprehensive testing throughout.',
      icon: Code2,
      duration: '2-12 weeks'
    },
    {
      title: 'Deployment & Launch',
      description: 'Production deployment with performance optimization and launch support.',
      icon: Cloud,
      duration: '1-2 weeks'
    },
    {
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and maintenance to keep your solution running smoothly.',
      icon: Headphones,
      duration: 'Ongoing'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={cn(
            "flex items-center gap-8 mb-12",
            index % 2 === 1 && "flex-row-reverse"
          )}
        >
          {/* Content */}
          <div className="flex-1">
            <GlowCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <span className="text-sm text-muted-foreground">{step.duration}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </GlowCard>
          </div>

          {/* Timeline Connector */}
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full z-10 relative">
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-primary to-primary/20" />
            )}
          </div>

          {/* Step Number */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
            {index + 1}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Services