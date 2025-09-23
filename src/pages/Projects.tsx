import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Calendar, Users, Code2, Zap, Target, Award, ChevronRight, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GlowCard } from '../components/ui/GlowCard';
import { FloatingElements } from '../components/ui/FloatingElements';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gif?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'enterprise';
  status: 'completed' | 'ongoing' | 'planned';
  duration: string;
  teamSize: number;
  liveUrl?: string;
  githubUrl?: string;
  client: {
    name: string;
    logo?: string;
    testimonial: string;
    rating: number;
  };
  metrics: {
    performance?: string;
    users?: string;
    revenue?: string;
    satisfaction?: string;
  };
  challenges: string[];
  solutions: string[];
  featured: boolean;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'EcoCommerce Platform',
    description: 'Sustainable e-commerce platform with AI-powered recommendations and carbon footprint tracking.',
    longDescription: 'A comprehensive e-commerce solution that helps businesses and consumers make environmentally conscious choices. Features include AI-powered product recommendations based on sustainability metrics, real-time carbon footprint calculations, and integrated offset programs.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'Stripe', 'AWS'],
    category: 'web',
    status: 'completed',
    duration: '6 months',
    teamSize: 8,
    liveUrl: 'https://ecocommerce-demo.devneststudios.com',
    githubUrl: 'https://github.com/devneststudios/ecocommerce',
    client: {
      name: 'GreenTech Solutions',
      testimonial: 'DevNest delivered beyond our expectations. The platform increased our sustainable product sales by 340% within the first quarter.',
      rating: 5
    },
    metrics: {
      performance: '98% faster load times',
      users: '50K+ active users',
      revenue: '$2.3M generated',
      satisfaction: '96% customer satisfaction'
    },
    challenges: [
      'Complex sustainability scoring algorithm',
      'Real-time carbon footprint calculations',
      'Integration with multiple payment gateways'
    ],
    solutions: [
      'Machine learning model for sustainability scoring',
      'Optimized calculation engine with caching',
      'Unified payment abstraction layer'
    ],
    featured: true
  },
  {
    id: '2',
    title: 'HealthTracker AI',
    description: 'AI-powered health monitoring app with predictive analytics and personalized recommendations.',
    longDescription: 'Revolutionary health monitoring application that uses AI to predict health issues before they become serious. Integrates with wearable devices and provides personalized health recommendations based on individual patterns and medical history.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Python', 'TensorFlow', 'Firebase', 'HealthKit', 'Google Fit'],
    category: 'mobile',
    status: 'completed',
    duration: '8 months',
    teamSize: 12,
    liveUrl: 'https://apps.apple.com/app/healthtracker-ai',
    client: {
      name: 'MedTech Innovations',
      testimonial: 'The AI predictions have been remarkably accurate. Our users have prevented numerous health emergencies thanks to early warnings.',
      rating: 5
    },
    metrics: {
      performance: '99.2% uptime',
      users: '100K+ downloads',
      satisfaction: '94% user retention'
    },
    challenges: [
      'HIPAA compliance requirements',
      'Real-time health data processing',
      'Cross-platform wearable integration'
    ],
    solutions: [
      'End-to-end encryption with secure key management',
      'Edge computing for real-time processing',
      'Universal device abstraction layer'
    ],
    featured: true
  },
  {
    id: '3',
    title: 'DeFi Portfolio Manager',
    description: 'Decentralized finance portfolio management with automated rebalancing and yield optimization.',
    longDescription: 'Advanced DeFi portfolio management platform that automatically optimizes yield farming strategies and rebalances portfolios based on market conditions and risk preferences.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Solidity', 'Web3.js', 'Hardhat', 'The Graph', 'IPFS'],
    category: 'blockchain',
    status: 'ongoing',
    duration: '4 months',
    teamSize: 6,
    client: {
      name: 'CryptoVest Capital',
      testimonial: 'The automated strategies have consistently outperformed manual trading. ROI increased by 180% since implementation.',
      rating: 5
    },
    metrics: {
      performance: '$50M+ total value locked',
      users: '5K+ active wallets',
      revenue: '180% average ROI'
    },
    challenges: [
      'Gas optimization for transactions',
      'Multi-chain protocol integration',
      'Smart contract security auditing'
    ],
    solutions: [
      'Layer 2 scaling solutions',
      'Cross-chain bridge protocols',
      'Comprehensive security testing framework'
    ],
    featured: false
  },
  {
    id: '4',
    title: 'Enterprise Analytics Suite',
    description: 'Real-time business intelligence platform with advanced data visualization and predictive modeling.',
    longDescription: 'Comprehensive enterprise analytics platform that processes massive datasets in real-time, providing actionable insights through advanced visualizations and predictive models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Angular', 'Python', 'Apache Kafka', 'PostgreSQL', 'D3.js', 'Docker'],
    category: 'enterprise',
    status: 'completed',
    duration: '10 months',
    teamSize: 15,
    client: {
      name: 'Fortune Corp',
      testimonial: 'This platform transformed our decision-making process. We can now identify trends and opportunities weeks ahead of our competitors.',
      rating: 5
    },
    metrics: {
      performance: '10TB+ data processed daily',
      users: '1000+ enterprise users',
      satisfaction: '97% executive satisfaction'
    },
    challenges: [
      'Processing petabyte-scale datasets',
      'Real-time visualization requirements',
      'Multi-tenant security architecture'
    ],
    solutions: [
      'Distributed computing with Kafka streams',
      'WebGL-powered visualization engine',
      'Zero-trust security model'
    ],
    featured: true
  }
];

const techIcons: { [key: string]: string } = {
  'React': '⚛️',
  'Vue.js': '🟢',
  'Angular': '🔺',
  'Node.js': '🟩',
  'Python': '🐍',
  'MongoDB': '🍃',
  'PostgreSQL': '🐘',
  'TensorFlow': '🧠',
  'Firebase': '🔥',
  'AWS': '☁️',
  'Docker': '🐳',
  'Kubernetes': '⚓',
  'GraphQL': '📊',
  'TypeScript': '📘',
  'React Native': '📱',
  'Solidity': '💎',
  'Web3.js': '🌐'
};

const categories = [
  { id: 'all', name: 'All Projects', icon: '🚀' },
  { id: 'web', name: 'Web Applications', icon: '🌐' },
  { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
  { id: 'ai', name: 'AI/ML Projects', icon: '🤖' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
  { id: 'enterprise', name: 'Enterprise', icon: '🏢' }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              Our Projects
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Transforming ideas into digital reality through innovative solutions and cutting-edge technology
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>50+ Successful Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>200M+ Users Impacted</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span>98% Client Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Showcasing our most innovative and impactful work
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlowCard className="group cursor-pointer h-full" onClick={() => setSelectedProject(project)}>
                    <div className="aspect-video rounded-lg overflow-hidden mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <Button size="sm" variant="ghost" className="p-2">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button size="sm" variant="ghost" className="p-2">
                              <Github className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/20 rounded-full text-xs font-medium"
                          >
                            <span>{techIcons[tech] || '⚡'}</span>
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-1 bg-secondary/20 rounded-full text-xs font-medium">
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects, technologies, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all projects
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlowCard className="group cursor-pointer h-full" onClick={() => setSelectedProject(project)}>
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold line-clamp-2">{project.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {project.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {project.teamSize} people
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-lg" title={tech}>
                              {techIcons[tech] || '⚡'}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <span>View Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                  <div className="flex gap-2">
                    {selectedProject.liveUrl && (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button size="sm" variant="outline">
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">{selectedProject.longDescription}</p>
              </div>

              {/* Project Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-secondary/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{value}</div>
                    <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-lg text-sm font-medium"
                    >
                      <span className="text-lg">{techIcons[tech] || '⚡'}</span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-400" />
                    Key Challenges
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    Solutions Delivered
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-2xl">
                    🏢
                  </div>
                  <div>
                    <div className="font-semibold">{selectedProject.client.name}</div>
                    <div className="flex gap-1">
                      {Array.from({ length: selectedProject.client.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-lg italic">
                  "{selectedProject.client.testimonial}"
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}