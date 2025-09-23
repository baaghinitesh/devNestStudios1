import { ArrowRight, Sparkles, Zap, Code2, GitBranch, Users, Coffee, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo3D } from '@/components/ui/Logo3D'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { GlowCard } from '@/components/ui/GlowCard'
import { FloatingElements } from '@/components/ui/FloatingElements'
import { CounterAnimation, LiveCounter } from '@/components/ui/CounterAnimation'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Testimonials } from '@/components/sections/Testimonials'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function Home() {
  const heroRef = useIntersectionObserver({ threshold: 0.1 })
  const statsRef = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div className="pt-16"> {/* Account for fixed navbar */}
      
      {/* Hero Section */}
      <section 
        ref={heroRef.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <ParticleBackground className="opacity-60" />
        <FloatingElements count={15} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${
            heroRef.isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            
            {/* 3D Logo Animation */}
            <div className="relative mx-auto mb-8">
              <Logo3D size="lg" animated />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Make Ideas Feel 
              </span>
              <br />
              <span className="text-gradient">
                Alive
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We bring concepts to life through product-grade engineering with delightful design 
              and human-first delivery.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button variant="primary" size="lg" asChild>
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">
                  View Our Work
                </Link>
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  <CounterAnimation end={50} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  <CounterAnimation end={95} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              
              <LiveCounter
                baseValue={2150}
                label="GitHub Commits"
                icon={GitBranch}
                updateInterval={45000}
              />
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  <CounterAnimation end={5} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section 
        ref={statsRef.ref}
        className="py-20 bg-gradient-to-b from-background to-muted/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            statsRef.isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Do Best
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to launch, we handle every aspect of your digital product journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Web Development',
                description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
                features: ['React & Next.js', 'Full-Stack Solutions', 'API Development', 'Performance Optimized']
              },
              {
                icon: Sparkles,
                title: 'UI/UX Design',
                description: 'Beautiful, intuitive designs that create memorable user experiences.',
                features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
              },
              {
                icon: Zap,
                title: 'Product Strategy',
                description: 'Strategic planning and consulting to bring your vision to market successfully.',
                features: ['Market Research', 'Technical Planning', 'MVP Development', 'Growth Strategy']
              }
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <GlowCard
                  key={service.title}
                  className={`p-8 transition-all duration-300 ${
                    statsRef.isIntersecting 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  intensity="medium"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="relative mb-6">
                    <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg" asChild>
              <Link to="/services">
                Explore All Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Testimonials */}
      <Testimonials />
    </div>
  )
}