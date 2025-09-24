import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Shield,
  CheckCircle,
  ExternalLink,
  Play,
  Calendar,
  Award,
  Globe,
  Smartphone,
  Code2,
  Database,
  Cloud
} from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  projectType: string;
  duration: string;
  teamSize: number;
  investment: string;
  description: string;
  challenge: string;
  solution: string[];
  technologies: string[];
  results: {
    summary: string;
    metrics: Metric[];
    testimonial: {
      text: string;
      author: string;
      position: string;
      avatar: string;
    };
  };
  media: {
    thumbnail: string;
    images: string[];
    video?: string;
  };
  featured: boolean;
  roiCalculation: {
    investment: number;
    revenue: number;
    savings: number;
    roi: number;
    paybackMonths: number;
  };
}

const CaseStudyShowcase: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const caseStudies: CaseStudy[] = [
    {
      id: 'fintech-platform',
      title: 'Digital Banking Platform',
      client: 'NeoBank Solutions',
      industry: 'FinTech',
      projectType: 'SaaS Platform',
      duration: '8 months',
      teamSize: 6,
      investment: '$185,000',
      description: 'Revolutionary digital banking platform serving 50,000+ users with advanced security and seamless UX.',
      challenge: 'Traditional banks were losing customers to digital-first competitors. Client needed a complete digital transformation with enterprise-grade security, regulatory compliance, and scalable architecture.',
      solution: [
        'Built microservices architecture for scalability',
        'Implemented multi-layer security with biometric authentication',
        'Created real-time transaction processing system',
        'Developed comprehensive admin dashboard',
        'Integrated with 15+ third-party financial services'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis', 'Stripe'],
      results: {
        summary: 'Achieved 312% ROI within 18 months with significant user growth and operational savings.',
        metrics: [
          { label: 'User Growth', value: '50K+', change: '+340%', positive: true, icon: Users },
          { label: 'Revenue Increase', value: '$2.4M', change: '+285%', positive: true, icon: DollarSign },
          { label: 'Processing Speed', value: '< 2s', change: '85% faster', positive: true, icon: Zap },
          { label: 'Security Incidents', value: '0', change: '100% reduction', positive: true, icon: Shield },
          { label: 'Customer Satisfaction', value: '4.8/5', change: '+45%', positive: true, icon: Star },
          { label: 'Operational Costs', value: '-60%', change: '$480K saved', positive: true, icon: TrendingUp }
        ],
        testimonial: {
          text: "DevNest Studios transformed our vision into reality. The platform exceeded all expectations - from performance to security. Our user base grew 340% in the first year alone.",
          author: "Sarah Chen",
          position: "CEO, NeoBank Solutions",
          avatar: "/avatars/sarah-chen.jpg"
        }
      },
      media: {
        thumbnail: "/case-studies/fintech-thumb.jpg",
        images: ["/case-studies/fintech-1.jpg", "/case-studies/fintech-2.jpg"],
        video: "https://youtube.com/watch?v=example"
      },
      featured: true,
      roiCalculation: {
        investment: 185000,
        revenue: 2400000,
        savings: 480000,
        roi: 312,
        paybackMonths: 6
      }
    },
    {
      id: 'ecommerce-marketplace',
      title: 'Multi-Vendor E-commerce Platform',
      client: 'MarketPlace Pro',
      industry: 'E-commerce',
      projectType: 'Web Application',
      duration: '12 months',
      teamSize: 8,
      investment: '$240,000',
      description: 'Comprehensive marketplace connecting 1,000+ vendors with advanced analytics and automated logistics.',
      challenge: 'Client needed to compete with Amazon-scale platforms while maintaining personalized vendor relationships and ensuring seamless customer experience across multiple categories.',
      solution: [
        'Developed advanced vendor management system',
        'Built intelligent product recommendation engine',
        'Integrated automated inventory management',
        'Created comprehensive analytics dashboard',
        'Implemented multi-payment gateway support'
      ],
      technologies: ['Vue.js', 'Python', 'MongoDB', 'Elasticsearch', 'Kubernetes', 'Stripe', 'PayPal'],
      results: {
        summary: 'Generated $5.2M in GMV within first year with 1,000+ active vendors and 95% customer satisfaction.',
        metrics: [
          { label: 'GMV (Gross Merchandise Value)', value: '$5.2M', change: 'Launch year', positive: true, icon: DollarSign },
          { label: 'Active Vendors', value: '1,000+', change: 'Target achieved', positive: true, icon: Users },
          { label: 'Order Processing', value: '< 30s', change: '70% faster', positive: true, icon: Clock },
          { label: 'Platform Uptime', value: '99.9%', change: 'SLA exceeded', positive: true, icon: Shield },
          { label: 'Mobile Conversion', value: '8.2%', change: '+150%', positive: true, icon: Smartphone },
          { label: 'Vendor Retention', value: '94%', change: 'Industry leading', positive: true, icon: Award }
        ],
        testimonial: {
          text: "The platform DevNest built for us is incredible. We're processing thousands of orders daily with zero issues. The vendor onboarding system alone has saved us countless hours.",
          author: "Michael Rodriguez",
          position: "Founder, MarketPlace Pro",
          avatar: "/avatars/michael-rodriguez.jpg"
        }
      },
      media: {
        thumbnail: "/case-studies/ecommerce-thumb.jpg",
        images: ["/case-studies/ecommerce-1.jpg", "/case-studies/ecommerce-2.jpg"]
      },
      featured: true,
      roiCalculation: {
        investment: 240000,
        revenue: 5200000,
        savings: 720000,
        roi: 267,
        paybackMonths: 8
      }
    },
    {
      id: 'healthcare-saas',
      title: 'Healthcare Management System',
      client: 'MedTech Innovations',
      industry: 'Healthcare',
      projectType: 'Enterprise SaaS',
      duration: '10 months',
      teamSize: 7,
      investment: '$320,000',
      description: 'HIPAA-compliant healthcare management platform serving 200+ clinics with AI-powered diagnostics.',
      challenge: 'Healthcare providers needed digital transformation with strict compliance requirements, seamless EHR integration, and AI-powered tools to improve patient outcomes while reducing operational overhead.',
      solution: [
        'Built HIPAA-compliant infrastructure from ground up',
        'Integrated with major EHR systems (Epic, Cerner)',
        'Developed AI diagnostic assistance tools',
        'Created telehealth capabilities',
        'Implemented comprehensive audit trails'
      ],
      technologies: ['Angular', 'C# .NET', 'SQL Server', 'Azure', 'AI/ML', 'HL7 FHIR'],
      results: {
        summary: 'Improved patient outcomes by 35% while reducing administrative costs by 45% across 200+ clinics.',
        metrics: [
          { label: 'Clinics Using Platform', value: '200+', change: '400% growth', positive: true, icon: Globe },
          { label: 'Patient Satisfaction', value: '96%', change: '+28%', positive: true, icon: Star },
          { label: 'Administrative Savings', value: '45%', change: '$2.1M saved', positive: true, icon: DollarSign },
          { label: 'Diagnostic Accuracy', value: '94%', change: '+18%', positive: true, icon: Target },
          { label: 'Compliance Score', value: '100%', change: 'Perfect record', positive: true, icon: Shield },
          { label: 'Processing Time', value: '-60%', change: 'Faster workflows', positive: true, icon: Clock }
        ],
        testimonial: {
          text: "This system revolutionized our practice. Patient care has improved dramatically, and our staff can focus on what matters most - helping patients instead of paperwork.",
          author: "Dr. Jennifer Martinez",
          position: "Chief Medical Officer, Regional Health Network",
          avatar: "/avatars/dr-martinez.jpg"
        }
      },
      media: {
        thumbnail: "/case-studies/healthcare-thumb.jpg",
        images: ["/case-studies/healthcare-1.jpg", "/case-studies/healthcare-2.jpg"]
      },
      featured: false,
      roiCalculation: {
        investment: 320000,
        revenue: 3200000,
        savings: 2100000,
        roi: 256,
        paybackMonths: 9
      }
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects', count: caseStudies.length },
    { id: 'fintech', name: 'FinTech', count: caseStudies.filter(c => c.industry === 'FinTech').length },
    { id: 'ecommerce', name: 'E-commerce', count: caseStudies.filter(c => c.industry === 'E-commerce').length },
    { id: 'healthcare', name: 'Healthcare', count: caseStudies.filter(c => c.industry === 'Healthcare').length },
    { id: 'saas', name: 'SaaS', count: caseStudies.filter(c => c.projectType.includes('SaaS')).length }
  ];

  const filteredCaseStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => 
        cs.industry.toLowerCase() === activeFilter || 
        cs.projectType.toLowerCase().includes(activeFilter)
      );

  const selectedCaseStudy = selectedCase ? caseStudies.find(cs => cs.id === selectedCase) : null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Proven Success Stories
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Real results from real clients. See how we've delivered measurable business impact across industries.
        </motion.p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
              activeFilter === filter.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
            }`}
          >
            {filter.name}
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Case Studies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredCaseStudies.map((caseStudy, index) => (
          <motion.div
            key={caseStudy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group ${
              caseStudy.featured ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedCase(caseStudy.id)}
          >
            {/* Featured Badge */}
            {caseStudy.featured && (
              <div className="absolute top-4 right-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </div>
            )}

            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl font-bold opacity-50 mb-2">
                  {caseStudy.roiCalculation.roi}%
                </div>
                <div className="text-sm uppercase tracking-wide">ROI Achieved</div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  {caseStudy.industry}
                </span>
                <span className="text-sm text-gray-500">{caseStudy.duration}</span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                {caseStudy.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {caseStudy.description}
              </p>

              {/* Key Metrics Preview */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {caseStudy.results.metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="font-bold text-lg text-purple-600">{metric.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Investment: <span className="font-semibold text-gray-900 dark:text-white">{caseStudy.investment}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 border-b dark:border-gray-800">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedCaseStudy.title}</h2>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <span>{selectedCaseStudy.client}</span>
                      <span>•</span>
                      <span>{selectedCaseStudy.industry}</span>
                      <span>•</span>
                      <span>{selectedCaseStudy.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* ROI Summary */}
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-600">{selectedCaseStudy.roiCalculation.roi}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ROI Achieved</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-600">${(selectedCaseStudy.roiCalculation.revenue / 1000000).toFixed(1)}M</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-purple-600">{selectedCaseStudy.roiCalculation.paybackMonths}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Months to Payback</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                    <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-amber-600">${(selectedCaseStudy.roiCalculation.savings / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Challenge & Solution */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Challenge
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {selectedCaseStudy.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-500" />
                        Solution
                      </h3>
                      <ul className="space-y-2">
                        {selectedCaseStudy.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-purple-500" />
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseStudy.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-500" />
                      Key Results & Metrics
                    </h3>
                    <div className="space-y-4">
                      {selectedCaseStudy.results.metrics.map((metric, idx) => {
                        const Icon = metric.icon || TrendingUp;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                                <Icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-semibold">{metric.label}</div>
                                {metric.change && (
                                  <div className="text-sm text-green-600">{metric.change}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                              {metric.value}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedCaseStudy.results.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                        "{selectedCaseStudy.results.testimonial.text}"
                      </blockquote>
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-semibold">{selectedCaseStudy.results.testimonial.author}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedCaseStudy.results.testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 mx-auto">
                    Start Your Success Story
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overall Statistics */}
      <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Track Record</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">$8.8M+</div>
            <div className="text-gray-600 dark:text-gray-400">Revenue Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">278%</div>
            <div className="text-gray-600 dark:text-gray-400">Average ROI</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">7.2</div>
            <div className="text-gray-600 dark:text-gray-400">Avg Payback (months)</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyShowcase;