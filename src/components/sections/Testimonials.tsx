import { useState, useEffect } from 'react'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import { GlowCard } from '@/components/ui/GlowCard'
import { Button } from '@/components/ui/Button'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

// Mock testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechStart Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'DevNestStudios transformed our vision into a stunning reality. Their attention to detail and technical expertise exceeded our expectations. The final product not only looks amazing but performs flawlessly.',
    rating: 5,
    project: 'E-commerce Platform'
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Product Manager',
    company: 'HealthTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Working with DevNestStudios was an absolute pleasure. They understood our complex requirements and delivered a solution that our users love. The development process was smooth and collaborative.',
    rating: 5,
    project: 'Health Tracker App'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Founder',
    company: 'DataViz Pro',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The team\'s expertise in both design and development is remarkable. They created a beautiful, intuitive interface for our complex analytics platform. Our customers frequently compliment the user experience.',
    rating: 5,
    project: 'Analytics Dashboard'
  },
  {
    id: '4',
    name: 'David Kim',
    position: 'CTO',
    company: 'AI Innovations',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'DevNestStudios delivered beyond our wildest expectations. Their technical prowess and creative approach resulted in an AI tool that\'s both powerful and user-friendly. Highly recommended!',
    rating: 5,
    project: 'AI Content Generator'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    position: 'Marketing Director',
    company: 'Growth Labs',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    content: 'Professional, responsive, and incredibly talented. The DevNestStudios team took our outdated website and transformed it into a modern, conversion-optimized masterpiece. ROI increased by 300%!',
    rating: 5,
    project: 'Marketing Website'
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  // Auto-play functionality
  useEffect(() => {
    if (!isIntersecting || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isIntersecting, isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          'w-5 h-5',
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        )}
      />
    ))
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'text-center mb-16 transition-all duration-1000',
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don\'t just take our word for it. Here\'s what our amazing clients have to say about working with us.
          </p>
        </div>

        {/* Main testimonial display */}
        <div className={cn(
          'relative max-w-4xl mx-auto transition-all duration-1000 delay-200',
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <GlowCard className="p-8 md:p-12 text-center">
            <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-60" />
            
            <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 font-medium">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex justify-center mb-6">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <img 
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
              />
              <div className="text-left">
                <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                </p>
                <p className="text-sm text-primary">{testimonials[currentIndex].project}</p>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={prevTestimonial}
            className="rounded-full w-10 h-10 p-0"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={nextTestimonial}
            className="rounded-full w-10 h-10 p-0"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* All testimonials preview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={cn(
                'p-4 rounded-xl border transition-all duration-300 text-left',
                'hover:shadow-lg hover:border-primary/50',
                index === currentIndex 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-border bg-card/50'
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h5 className="font-medium text-sm truncate">{testimonial.name}</h5>
                  <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {renderStars(testimonial.rating).slice(0, 5).map((star, i) => (
                  <div key={i} className="w-3 h-3">{star}</div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}