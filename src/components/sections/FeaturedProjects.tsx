import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

// Mock data - this will come from API later
const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management and payment processing.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    category: 'Web App',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    slug: 'ecommerce-platform'
  },
  {
    id: '2', 
    title: 'Mobile Health Tracker',
    description: 'Cross-platform mobile app for health monitoring with AI-powered insights and recommendations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Express', 'MongoDB', 'TensorFlow'],
    category: 'Mobile App',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    slug: 'health-tracker'
  },
  {
    id: '3',
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics platform with interactive charts and customizable reporting features.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    techStack: ['Vue.js', 'Python', 'Redis', 'D3.js'],
    category: 'SaaS',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    slug: 'analytics-dashboard'
  },
  {
    id: '4',
    title: 'AI Content Generator',
    description: 'AI-powered content creation tool with natural language processing and automated optimization.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    techStack: ['Next.js', 'OpenAI API', 'Supabase', 'TypeScript'],
    category: 'AI Tool',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/project',
    slug: 'ai-content-generator'
  }
]

export function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  // Auto-scroll functionality
  useEffect(() => {
    if (!isIntersecting) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mockProjects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isIntersecting])

  const techStackColors = {
    'React': 'bg-blue-500/20 text-blue-300',
    'Node.js': 'bg-green-500/20 text-green-300',
    'PostgreSQL': 'bg-purple-500/20 text-purple-300',
    'Stripe': 'bg-indigo-500/20 text-indigo-300',
    'React Native': 'bg-cyan-500/20 text-cyan-300',
    'Express': 'bg-gray-500/20 text-gray-300',
    'MongoDB': 'bg-green-600/20 text-green-400',
    'TensorFlow': 'bg-orange-500/20 text-orange-300',
    'Vue.js': 'bg-emerald-500/20 text-emerald-300',
    'Python': 'bg-yellow-500/20 text-yellow-300',
    'Redis': 'bg-red-500/20 text-red-300',
    'D3.js': 'bg-orange-600/20 text-orange-400',
    'Next.js': 'bg-black/20 text-white',
    'OpenAI API': 'bg-green-500/20 text-green-300',
    'Supabase': 'bg-green-500/20 text-green-300',
    'TypeScript': 'bg-blue-600/20 text-blue-400'
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our latest work and see how we bring ideas to life with cutting-edge technology.
          </p>
        </div>

        {/* Auto-scrolling project showcase */}
        <div className="relative overflow-hidden rounded-2xl mb-12">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {mockProjects.map((project, index) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <GlowCard className="mx-4 overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-sm rounded-full border border-primary/30">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className={cn(
                              'px-3 py-1 rounded-full text-sm font-medium',
                              techStackColors[tech as keyof typeof techStackColors] || 'bg-muted text-foreground'
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button variant="primary" size="sm" asChild>
                          <Link to={`/projects/${project.slug}`}>
                            View Case Study
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        </Button>
                        
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>

        {/* Project indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {mockProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" asChild>
            <Link to="/projects">
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}