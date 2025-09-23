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
  Headphones,
  Lightbulb,
  FileText,
  Cog,
  TestTube,
  Rocket,
  Target,
  Briefcase,
  Monitor,
  Settings,
  BookOpen,
  CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlowCard } from '@/components/ui/GlowCard'
import { CounterAnimation } from '@/components/ui/CounterAnimation'
import { MicroDemo } from '@/components/ui/MicroDemo'
import PaymentIntegration from '@/components/integrations/PaymentIntegration'
import AuthIntegration from '@/components/integrations/AuthIntegration'
import { cn } from '@/lib/utils'

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  elevatorPitch: string
  icon: React.ComponentType<any>
  features: string[]
  deliverables: string[]
  process: {
    title: string
    description: string
    duration: string
    icon: React.ComponentType<any>
  }[]
  pricing: {
    starter: number
    professional: number
    enterprise: string
  }
  deliveryTime: string
  investmentRange: string
  targetClients: string[]
  caseStudyLink?: string
  demoLink?: string
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
    id: 'product-strategy',
    title: 'Product Strategy & Discovery',
    subtitle: 'Strategic Product Planning',
    description: 'Comprehensive product strategy and discovery process to validate ideas and create winning product roadmaps.',
    elevatorPitch: 'Transform your vision into a validated, market-ready product strategy with data-driven insights and clear execution roadmap.',
    icon: Lightbulb,
    features: [
      'Market Research & Competitive Analysis',
      'User Persona Development & Journey Mapping',
      'Business Model Canvas & Value Proposition',
      'Technical Feasibility Assessment',
      'MVP Definition & Feature Prioritization',
      'Go-to-Market Strategy Development'
    ],
    deliverables: [
      'Product Strategy Document',
      'Market Research Report',
      'User Personas & Journey Maps',
      'Technical Architecture Plan',
      'MVP Specification',
      'Project Roadmap & Timeline',
      'Budget & Resource Planning'
    ],
    process: [
      {
        title: 'Discovery Workshop',
        description: 'Deep dive into your vision, goals, and market landscape through collaborative workshops.',
        duration: '3-5 days',
        icon: Search
      },
      {
        title: 'Market & User Research',
        description: 'Comprehensive market analysis, competitor research, and user interviews to validate assumptions.',
        duration: '1-2 weeks',
        icon: Target
      },
      {
        title: 'Strategy Development',
        description: 'Create detailed product strategy, roadmap, and technical architecture recommendations.',
        duration: '1-2 weeks',
        icon: FileText
      },
      {
        title: 'Validation & Refinement',
        description: 'Test and refine strategy through stakeholder feedback and market validation.',
        duration: '3-5 days',
        icon: CheckCircle
      }
    ],
    pricing: {
      starter: 4999,
      professional: 12999,
      enterprise: 'Custom'
    },
    deliveryTime: '3-5 weeks',
    investmentRange: '$5K - $25K',
    targetClients: [
      'Startups with innovative ideas',
      'Enterprises launching new products',
      'Companies pivoting their business model',
      'Investors evaluating opportunities'
    ],
    caseStudyLink: '/case-studies/fintech-strategy',
    techStack: ['Figma', 'Miro', 'Notion', 'Google Analytics', 'Hotjar'],
    color: 'from-amber-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'ux-ui-prototyping',
    title: 'UX/UI & Prototyping',
    subtitle: 'User Experience Design',
    description: 'Comprehensive design solutions from user research to interactive prototypes, ensuring exceptional user experiences across all platforms.',
    elevatorPitch: 'Create intuitive, beautiful, and conversion-focused designs that users love and businesses profit from.',
    icon: Palette,
    features: [
      'User Research & Persona Development',
      'Wireframing & Information Architecture',
      'Visual Design & Brand Integration',
      'Interactive Prototyping & Animation',
      'Usability Testing & Optimization',
      'Design System & Component Library'
    ],
    deliverables: [
      'User Research Report & Personas',
      'Wireframes & User Flow Diagrams',
      'High-Fidelity UI Designs',
      'Interactive Prototypes',
      'Design System & Style Guide',
      'Usability Testing Report',
      'Developer Handoff Documentation'
    ],
    process: [
      {
        title: 'User Research',
        description: 'Conduct user interviews, surveys, and competitive analysis to understand user needs and behaviors.',
        duration: '1-2 weeks',
        icon: Users
      },
      {
        title: 'Wireframing & Architecture',
        description: 'Create wireframes and information architecture to establish the foundation of user experience.',
        duration: '1 week',
        icon: Monitor
      },
      {
        title: 'Visual Design',
        description: 'Design high-fidelity interfaces that align with brand identity and user expectations.',
        duration: '2-3 weeks',
        icon: Palette
      },
      {
        title: 'Prototyping & Testing',
        description: 'Build interactive prototypes and conduct usability testing to validate design decisions.',
        duration: '1-2 weeks',
        icon: TestTube
      },
      {
        title: 'Design System & Handoff',
        description: 'Create comprehensive design system and prepare developer-ready assets.',
        duration: '3-5 days',
        icon: Settings
      }
    ],
    pricing: {
      starter: 3999,
      professional: 9999,
      enterprise: 'Custom'
    },
    deliveryTime: '4-8 weeks',
    investmentRange: '$4K - $20K',
    targetClients: [
      'SaaS companies needing user-friendly interfaces',
      'E-commerce businesses optimizing conversion',
      'Startups building their first product',
      'Enterprises modernizing legacy systems'
    ],
    caseStudyLink: '/case-studies/saas-redesign',
    demoLink: '/demo/design-system',
    techStack: ['Figma', 'Adobe XD', 'Principle', 'Framer', 'InVision', 'Maze'],
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'SPAs, PWAs & Modern Web Apps',
    description: 'Full-stack web development using cutting-edge technologies. From responsive websites to complex Progressive Web Applications.',
    elevatorPitch: 'Build fast, scalable, and modern web applications that deliver exceptional user experiences across all devices and platforms.',
    icon: Globe,
    features: [
      'Single Page Applications (SPAs)',
      'Progressive Web Apps (PWAs)',
      'Responsive Design & Mobile-First Approach',
      'Real-time Features & WebSocket Integration',
      'SEO Optimization & Performance Tuning',
      'API Integration & Backend Development',
      'E-commerce & Payment Gateway Integration'
    ],
    deliverables: [
      'Fully Functional Web Application',
      'Responsive UI/UX Implementation',
      'PWA with Offline Capabilities',
      'API Integration & Backend Setup',
      'Performance Optimization Report',
      'SEO Implementation & Analytics',
      'Deployment & Hosting Setup',
      'Documentation & Training Materials'
    ],
    process: [
      {
        title: 'Planning & Architecture',
        description: 'Define technical requirements, architecture, and technology stack for optimal performance.',
        duration: '3-5 days',
        icon: FileText
      },
      {
        title: 'Frontend Development',
        description: 'Build responsive, interactive user interfaces using modern frameworks and best practices.',
        duration: '2-4 weeks',
        icon: Monitor
      },
      {
        title: 'Backend Integration',
        description: 'Develop APIs, integrate databases, and implement business logic and authentication.',
        duration: '1-3 weeks',
        icon: Database
      },
      {
        title: 'Testing & Optimization',
        description: 'Comprehensive testing, performance optimization, and cross-browser compatibility.',
        duration: '1 week',
        icon: TestTube
      },
      {
        title: 'Deployment & Launch',
        description: 'Deploy to production, configure hosting, and provide launch support.',
        duration: '2-3 days',
        icon: Rocket
      }
    ],
    pricing: {
      starter: 5999,
      professional: 15999,
      enterprise: 'Custom'
    },
    deliveryTime: '4-10 weeks',
    investmentRange: '$6K - $35K',
    targetClients: [
      'Startups needing scalable web platforms',
      'E-commerce businesses expanding online',
      'SaaS companies building customer portals',
      'Enterprises modernizing web presence'
    ],
    caseStudyLink: '/case-studies/ecommerce-platform',
    demoLink: '/demo/web-app',
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    subtitle: 'React Native Development',
    description: 'High-performance mobile applications for iOS and Android using React Native. Native feel with cross-platform efficiency.',
    elevatorPitch: 'Build beautiful, native-quality mobile apps for both iOS and Android with a single codebase, reducing development time and cost by 50%.',
    icon: Smartphone,
    features: [
      'Cross-Platform Development (iOS & Android)',
      'Native Performance Optimization',
      'Push Notifications & Deep Linking',
      'Offline Functionality & Data Sync',
      'Biometric Authentication Integration',
      'App Store & Play Store Deployment',
      'Real-time Features & WebSocket Support'
    ],
    deliverables: [
      'iOS & Android Mobile Applications',
      'App Store Ready Builds',
      'Push Notification System',
      'Offline Data Synchronization',
      'User Authentication & Security',
      'App Store Deployment Support',
      'Analytics & Crash Reporting Setup',
      'Maintenance & Update Documentation'
    ],
    process: [
      {
        title: 'App Architecture & Planning',
        description: 'Define app architecture, navigation flow, and technical requirements for optimal performance.',
        duration: '3-5 days',
        icon: FileText
      },
      {
        title: 'UI/UX Implementation',
        description: 'Build pixel-perfect, responsive mobile interfaces following platform guidelines.',
        duration: '2-4 weeks',
        icon: Smartphone
      },
      {
        title: 'Feature Development',
        description: 'Implement core features, API integration, and platform-specific functionality.',
        duration: '3-6 weeks',
        icon: Cog
      },
      {
        title: 'Testing & Optimization',
        description: 'Comprehensive testing on real devices, performance optimization, and bug fixes.',
        duration: '1-2 weeks',
        icon: TestTube
      },
      {
        title: 'App Store Deployment',
        description: 'Prepare app store listings, handle submission process, and launch support.',
        duration: '3-5 days',
        icon: Rocket
      }
    ],
    pricing: {
      starter: 8999,
      professional: 19999,
      enterprise: 'Custom'
    },
    deliveryTime: '6-14 weeks',
    investmentRange: '$9K - $45K',
    targetClients: [
      'Startups launching mobile-first products',
      'E-commerce brands expanding to mobile',
      'Service providers needing customer apps',
      'Enterprises building internal tools'
    ],
    caseStudyLink: '/case-studies/fitness-app',
    demoLink: '/demo/mobile-app',
    techStack: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript', 'Native Modules'],
    color: 'from-indigo-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-blue-600/20'
  },
  {
    id: 'saas-product-engineering',
    title: 'SaaS Product Engineering',
    subtitle: 'Complete SaaS Solutions',
    description: 'End-to-end SaaS product development with multi-tenant architecture, subscription management, and scalable infrastructure.',
    elevatorPitch: 'Launch your SaaS product faster with our proven architecture, handling everything from user management to billing and analytics.',
    icon: Cloud,
    features: [
      'Multi-Tenant SaaS Architecture',
      'User Authentication & Role Management',
      'Subscription & Billing Integration',
      'Analytics & Reporting Dashboard',
      'API-First Development Approach',
      'Scalable Cloud Infrastructure',
      'Security & Compliance (SOC2, GDPR)'
    ],
    deliverables: [
      'Complete SaaS Platform',
      'Multi-Tenant Database Architecture',
      'User Management & Authentication',
      'Subscription & Billing System',
      'Admin Dashboard & Analytics',
      'REST/GraphQL API Documentation',
      'Cloud Infrastructure Setup',
      'Security Audit & Compliance Report'
    ],
    process: [
      {
        title: 'SaaS Architecture Design',
        description: 'Design scalable multi-tenant architecture and define technical requirements for your SaaS.',
        duration: '1 week',
        icon: FileText
      },
      {
        title: 'Core Platform Development',
        description: 'Build the foundation with user management, authentication, and multi-tenancy support.',
        duration: '3-4 weeks',
        icon: Database
      },
      {
        title: 'Business Logic & Features',
        description: 'Implement core business features, workflows, and user-specific functionality.',
        duration: '4-6 weeks',
        icon: Cog
      },
      {
        title: 'Billing & Subscriptions',
        description: 'Integrate payment processing, subscription management, and billing automation.',
        duration: '2 weeks',
        icon: Briefcase
      },
      {
        title: 'Analytics & Deployment',
        description: 'Set up analytics, monitoring, and deploy to scalable cloud infrastructure.',
        duration: '1-2 weeks',
        icon: BarChart3
      }
    ],
    pricing: {
      starter: 15999,
      professional: 35999,
      enterprise: 'Custom'
    },
    deliveryTime: '10-16 weeks',
    investmentRange: '$16K - $80K',
    targetClients: [
      'Entrepreneurs building SaaS businesses',
      'Companies digitizing their services',
      'Startups with B2B software ideas',
      'Enterprises launching internal SaaS tools'
    ],
    caseStudyLink: '/case-studies/project-management-saas',
    demoLink: '/demo/saas-platform',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS/GCP', 'Docker', 'Redis'],
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'ai-integrations-automation',
    title: 'AI / Integrations / Automation',
    subtitle: 'Intelligent Automation Solutions',
    description: 'Custom AI and automation solutions including chatbots, workflow automation, API integrations, and intelligent data processing.',
    elevatorPitch: 'Automate repetitive tasks and add intelligence to your workflows with custom AI solutions that save time and increase efficiency.',
    icon: Zap,
    features: [
      'AI Chatbots & Virtual Assistants',
      'Workflow Automation & Process Optimization',
      'Third-Party API Integrations',
      'Natural Language Processing (NLP)',
      'Predictive Analytics & Forecasting',
      'Computer Vision & Image Recognition',
      'Custom AI Model Development'
    ],
    deliverables: [
      'AI-Powered Chatbot or Assistant',
      'Automated Workflow Systems',
      'API Integration & Data Sync',
      'Custom AI Models & Algorithms',
      'Analytics & Reporting Dashboard',
      'Process Automation Documentation',
      'Training Materials & Support',
      'Performance Monitoring Setup'
    ],
    process: [
      {
        title: 'Process Analysis & Planning',
        description: 'Analyze current workflows and identify automation opportunities and AI integration points.',
        duration: '3-5 days',
        icon: Search
      },
      {
        title: 'AI Model Development',
        description: 'Develop and train custom AI models or configure existing AI services for your needs.',
        duration: '2-4 weeks',
        icon: Cpu
      },
      {
        title: 'Integration & Automation',
        description: 'Build automation workflows and integrate AI capabilities with existing systems.',
        duration: '2-3 weeks',
        icon: Settings
      },
      {
        title: 'Testing & Optimization',
        description: 'Test AI accuracy, optimize performance, and fine-tune automation workflows.',
        duration: '1 week',
        icon: TestTube
      },
      {
        title: 'Deployment & Training',
        description: 'Deploy solutions, provide team training, and set up monitoring systems.',
        duration: '3-5 days',
        icon: Rocket
      }
    ],
    pricing: {
      starter: 7999,
      professional: 19999,
      enterprise: 'Custom'
    },
    deliveryTime: '6-12 weeks',
    investmentRange: '$8K - $45K',
    targetClients: [
      'Businesses with repetitive manual processes',
      'Customer service teams needing chatbots',
      'Companies requiring data analysis automation',
      'Enterprises seeking workflow optimization'
    ],
    caseStudyLink: '/case-studies/customer-service-ai',
    demoLink: '/demo/ai-chatbot',
    techStack: ['Python', 'OpenAI GPT', 'TensorFlow', 'Zapier', 'Node.js', 'AWS Lambda'],
    color: 'from-red-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
  },
  {
    id: 'devops-cloud-engineering',
    title: 'DevOps & Cloud Engineering',
    subtitle: 'Infrastructure & Deployment',
    description: 'Complete cloud infrastructure setup, CI/CD pipelines, monitoring, and scalable deployment solutions.',
    elevatorPitch: 'Scale your applications reliably with modern DevOps practices, automated deployments, and cloud-native infrastructure.',
    icon: Cloud,
    features: [
      'AWS/GCP/Azure Cloud Architecture',
      'CI/CD Pipeline Setup & Automation',
      'Containerization (Docker & Kubernetes)',
      'Infrastructure as Code (Terraform)',
      'Monitoring, Logging & Alerting',
      'Auto-scaling & Load Balancing',
      'Security & Backup Solutions'
    ],
    deliverables: [
      'Cloud Infrastructure Setup',
      'Automated CI/CD Pipelines',
      'Container Orchestration',
      'Monitoring & Alerting Systems',
      'Security Configuration',
      'Backup & Disaster Recovery',
      'Infrastructure Documentation',
      'Team Training & Handover'
    ],
    process: [
      {
        title: 'Infrastructure Assessment',
        description: 'Analyze current infrastructure and define cloud migration or optimization strategy.',
        duration: '2-3 days',
        icon: Search
      },
      {
        title: 'Cloud Setup & Migration',
        description: 'Set up cloud infrastructure, configure services, and migrate applications if needed.',
        duration: '1-2 weeks',
        icon: Cloud
      },
      {
        title: 'CI/CD Implementation',
        description: 'Build automated deployment pipelines and integrate with development workflows.',
        duration: '1 week',
        icon: Settings
      },
      {
        title: 'Monitoring & Security',
        description: 'Configure monitoring, logging, security measures, and backup solutions.',
        duration: '3-5 days',
        icon: Shield
      },
      {
        title: 'Optimization & Handover',
        description: 'Optimize performance, provide documentation, and train the team.',
        duration: '2-3 days',
        icon: BookOpen
      }
    ],
    pricing: {
      starter: 4999,
      professional: 12999,
      enterprise: 'Custom'
    },
    deliveryTime: '3-8 weeks',
    investmentRange: '$5K - $30K',
    targetClients: [
      'Startups scaling their infrastructure',
      'Companies moving to the cloud',
      'Development teams needing automation',
      'Enterprises modernizing DevOps practices'
    ],
    caseStudyLink: '/case-studies/scalable-infrastructure',
    techStack: ['AWS/GCP/Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'],
    color: 'from-cyan-500 to-blue-500',
    gradient: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
  },
  {
    id: 'ongoing-support-growth',
    title: 'Ongoing Product Support & Growth',
    subtitle: 'Continuous Development',
    description: 'Ongoing maintenance, feature development, performance optimization, and growth support for your digital products.',
    elevatorPitch: 'Keep your product competitive and growing with continuous improvements, new features, and dedicated technical support.',
    icon: Headphones,
    features: [
      '24/7 Technical Support & Monitoring',
      'Feature Development & Enhancements',
      'Performance Optimization & Scaling',
      'Security Updates & Maintenance',
      'User Analytics & Growth Insights',
      'Bug Fixes & Emergency Response',
      'Technology Stack Upgrades'
    ],
    deliverables: [
      'Monthly Feature Releases',
      'Performance Reports & Analytics',
      'Security Audits & Updates',
      'Bug Fix & Maintenance Log',
      'Growth Strategy Recommendations',
      'Technical Documentation Updates',
      'Priority Support Response',
      'Quarterly Business Reviews'
    ],
    process: [
      {
        title: 'Product Assessment',
        description: 'Evaluate current product state, identify improvement opportunities and growth potential.',
        duration: '1 week',
        icon: Search
      },
      {
        title: 'Support Setup',
        description: 'Establish monitoring, support channels, and maintenance procedures.',
        duration: '3-5 days',
        icon: Settings
      },
      {
        title: 'Ongoing Development',
        description: 'Continuous feature development, improvements, and optimization based on user feedback.',
        duration: 'Ongoing',
        icon: Cog
      },
      {
        title: 'Growth Analysis',
        description: 'Regular analysis of user behavior, performance metrics, and growth opportunities.',
        duration: 'Monthly',
        icon: BarChart3
      },
      {
        title: 'Strategic Planning',
        description: 'Quarterly reviews and strategic planning for product evolution and growth.',
        duration: 'Quarterly',
        icon: Target
      }
    ],
    pricing: {
      starter: 2999,
      professional: 7999,
      enterprise: 'Custom'
    },
    deliveryTime: 'Ongoing Partnership',
    investmentRange: '$3K - $15K/month',
    targetClients: [
      'Growing startups needing technical support',
      'Established businesses with digital products',
      'Companies without in-house tech teams',
      'SaaS businesses requiring continuous development'
    ],
    caseStudyLink: '/case-studies/growth-partnership',
    techStack: ['Full Stack Support', 'Analytics Tools', 'Monitoring Solutions', 'CI/CD', 'Cloud Services'],
    color: 'from-yellow-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
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
                  <CounterAnimation end={8} suffix="" />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
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

      {/* Process Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-6">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Our Development{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
                A proven methodology that ensures successful project delivery from concept to launch. 
                Every step is designed to maximize value and minimize risk.
              </p>
              
              {/* Process Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    <CounterAnimation end={98} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">On-time Delivery</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    <CounterAnimation end={5} suffix=" Steps" />
                  </div>
                  <div className="text-sm text-muted-foreground">Proven Process</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    <CounterAnimation end={150} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Projects Delivered</div>
                </div>
              </div>
            </motion.div>
          </div>

          <ProcessTimeline />
          
          {/* Process Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <GlowCard className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Why Our Process Works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Transparent Communication</h4>
                      <p className="text-sm text-muted-foreground">Regular updates and clear milestone tracking</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Agile Methodology</h4>
                      <p className="text-sm text-muted-foreground">Flexible approach that adapts to your needs</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Quality Assurance</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive testing at every stage</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>
          </motion.div>
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

      {/* Partner Integrations Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Partner{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Integrations
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Seamlessly integrate with industry-leading payment and authentication providers.
              We handle the complex setup so you can focus on your business.
            </p>
          </div>

          {/* Integration Tabs */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Payment Integration */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Solutions</h3>
                    <p className="text-gray-600 dark:text-gray-400">Secure payment processing</p>
                  </div>
                </div>
                <PaymentIntegration showDemo={true} />
              </div>

              {/* Authentication Integration */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication & Security</h3>
                    <p className="text-gray-600 dark:text-gray-400">User management made simple</p>
                  </div>
                </div>
                <AuthIntegration showDemo={true} />
              </div>
            </div>
          </div>

          {/* Integration Benefits */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Why Choose Our Integration Services?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We make complex integrations simple and secure
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Security First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Industry-standard security practices and compliance
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Setup</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rapid integration with comprehensive testing
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Configuration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tailored to your specific business requirements
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ongoing Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Continuous monitoring and maintenance
                </p>
              </div>
            </div>
          </div>
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
        "h-full p-6 lg:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl",
        isSelected && "ring-2 ring-primary shadow-2xl scale-105"
      )}>
        {/* Service Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={cn(
            "p-3 rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300 flex-shrink-0",
            service.color,
            isHovered && "scale-110 shadow-xl"
          )}>
            <service.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 line-clamp-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm lg:text-base mb-2">{service.subtitle}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{service.deliveryTime}</span>
              <span>•</span>
              <span>{service.investmentRange}</span>
            </div>
          </div>
        </div>

        {/* Elevator Pitch */}
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-l-4 border-primary/30">
          <p className="text-sm lg:text-base font-medium text-foreground leading-relaxed">
            {service.elevatorPitch}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            What's Included
          </h4>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{feature}</span>
              </li>
            ))}
          </ul>
          {service.features.length > 4 && (
            <p className="text-xs text-muted-foreground mt-2">
              +{service.features.length - 4} more features
            </p>
          )}
        </div>

        {/* Target Clients */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Perfect For
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.targetClients.slice(0, 2).map((client) => (
              <span
                key={client}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium line-clamp-1"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Starting from</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>Most Popular</span>
            </div>
          </div>
          <div className="text-xl lg:text-2xl font-bold text-primary">
            ${service.pricing.starter.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Professional: ${service.pricing.professional.toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full group"
            onClick={() => onSelect(isSelected ? null : service.id)}
          >
            {isSelected ? 'Hide Details' : 'View Full Details'}
            <ArrowRight className={cn(
              "ml-2 w-4 h-4 transition-transform",
              isSelected && "rotate-90"
            )} />
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            {service.demoLink && (
              <Button size="sm" variant="outline" className="text-xs" asChild>
                <a href={service.demoLink} target="_blank" rel="noopener noreferrer">
                  <Monitor className="w-3 h-3 mr-1" />
                  Demo
                </a>
              </Button>
            )}
            {service.caseStudyLink && (
              <Button size="sm" variant="outline" className="text-xs" asChild>
                <a href={service.caseStudyLink}>
                  <BookOpen className="w-3 h-3 mr-1" />
                  Case Study
                </a>
              </Button>
            )}
            {!service.demoLink && !service.caseStudyLink && (
              <Button size="sm" variant="outline" className="col-span-2 text-xs" asChild>
                <a href="/contact">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Start a Project
                </a>
              </Button>
            )}
          </div>
        </div>

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
            <div className="pt-6 mt-6 border-t border-border space-y-6">
              {/* Process Steps */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Cog className="w-4 h-4 text-primary" />
                  Our Process ({service.process.length} Steps)
                </h4>
                <div className="space-y-4">
                  {service.process.map((step, idx) => (
                    <div key={step.title} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <step.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-sm">{step.title}</h5>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  What You'll Receive
                </h4>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* All Features */}
              <div>
                <h4 className="font-semibold mb-3">Complete Feature List</h4>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Technologies Used
                </h4>
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

              {/* Target Clients Expanded */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Ideal For These Clients
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {service.targetClients.map((client) => (
                    <div key={client} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="w-3 h-3 text-primary flex-shrink-0" />
                      <span>{client}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Investment Options
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Starter Package</span>
                      <span className="font-bold text-primary">${service.pricing.starter.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Perfect for small projects and MVPs</p>
                  </div>
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Professional Package</span>
                      <span className="font-bold text-primary">${service.pricing.professional.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Comprehensive solution with advanced features</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Enterprise Package</span>
                      <span className="font-bold text-primary">{service.pricing.enterprise}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Tailored solutions for large-scale projects</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <a href="/contact">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start a Project
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href="/contact">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Call
                    </a>
                  </Button>
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
      duration: '1-2 weeks',
      details: 'Requirements analysis, stakeholder interviews, technical feasibility assessment, and project scope definition.'
    },
    {
      title: 'Design & Architecture',
      description: 'Creating wireframes, mockups, and technical architecture for your solution.',
      icon: Palette,
      duration: '1-3 weeks',
      details: 'User experience design, visual mockups, system architecture planning, and technology stack selection.'
    },
    {
      title: 'Development & Testing',
      description: 'Agile development with regular updates and comprehensive testing throughout.',
      icon: Code2,
      duration: '2-12 weeks',
      details: 'Sprint-based development, continuous integration, automated testing, and regular client feedback cycles.'
    },
    {
      title: 'Deployment & Launch',
      description: 'Production deployment with performance optimization and launch support.',
      icon: Cloud,
      duration: '1-2 weeks',
      details: 'Production setup, performance optimization, security configuration, and go-live support.'
    },
    {
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and maintenance to keep your solution running smoothly.',
      icon: Headphones,
      duration: 'Ongoing',
      details: '24/7 monitoring, regular updates, bug fixes, and continuous improvement based on user feedback.'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Mobile Step Card */}
            <div className="relative">
              {/* Step Number Badge */}
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
                {index + 1}
              </div>
              
              <GlowCard className="p-6 pt-8 ml-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{step.description}</p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{step.details}</p>
              </GlowCard>
              
              {/* Mobile Timeline Connector */}
              {index < steps.length - 1 && (
                <div className="absolute top-16 left-3 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/20" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Layout - Enhanced Responsive Design */}
      <div className="hidden lg:block">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={cn(
              "relative flex items-center mb-16 last:mb-0",
              "gap-8 xl:gap-12",
              index % 2 === 1 && "flex-row-reverse"
            )}
          >
            {/* Content Side */}
            <div className="flex-1 max-w-lg">
              <GlowCard className={cn(
                "p-8 transform transition-all duration-300 hover:scale-[1.02]",
                index % 2 === 0 ? "ml-8" : "mr-8"
              )}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{step.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{step.duration}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed text-base">{step.description}</p>
                
                {/* Additional Details */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-l-4 border-primary/30">
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                </div>
              </GlowCard>
            </div>

            {/* Center Timeline */}
            <div className="relative flex flex-col items-center">
              {/* Timeline Connector */}
              {index < steps.length - 1 && (
                <div className="absolute top-16 w-0.5 h-20 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
              )}
              
              {/* Main Node */}
              <div className="relative w-6 h-6 bg-primary rounded-full z-20 shadow-lg">
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-40" />
                <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
              </div>
            </div>

            {/* Step Number Side */}
            <div className="flex-1 max-w-32 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl transform transition-all duration-300 hover:scale-110">
                <span className="drop-shadow-lg">{index + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Services