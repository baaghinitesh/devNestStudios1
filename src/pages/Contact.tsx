import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  User,
  Building,
  MessageSquare,
  Calendar,
  Globe,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { FloatingElements } from '@/components/ui/FloatingElements';

interface FormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  company: string;
  phone: string;
  
  // Step 2: Project Details
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  
  // Step 3: Requirements
  services: string[];
  technologies: string[];
  goals: string;
  
  // Step 4: Additional Info
  referralSource: string;
  additionalInfo: string;
  preferredContact: string;
  meetingPreference: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  budget: '',
  timeline: '',
  description: '',
  services: [],
  technologies: [],
  goals: '',
  referralSource: '',
  additionalInfo: '',
  preferredContact: 'email',
  meetingPreference: 'flexible'
};

const projectTypes = [
  { id: 'web-app', name: 'Web Application', icon: '🌐' },
  { id: 'mobile-app', name: 'Mobile App', icon: '📱' },
  { id: 'ai-ml', name: 'AI/ML Solution', icon: '🤖' },
  { id: 'blockchain', name: 'Blockchain/Web3', icon: '⛓️' },
  { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' },
  { id: 'ecommerce', name: 'E-commerce Platform', icon: '🛒' },
  { id: 'other', name: 'Other', icon: '💡' }
];

const budgetRanges = [
  { id: '10k-25k', name: '$10K - $25K', desc: 'Small to medium projects' },
  { id: '25k-50k', name: '$25K - $50K', desc: 'Medium scale projects' },
  { id: '50k-100k', name: '$50K - $100K', desc: 'Large scale projects' },
  { id: '100k+', name: '$100K+', desc: 'Enterprise solutions' },
  { id: 'discuss', name: 'Let\'s Discuss', desc: 'Custom requirements' }
];

const services = [
  { id: 'frontend', name: 'Frontend Development', icon: '🎨' },
  { id: 'backend', name: 'Backend Development', icon: '⚙️' },
  { id: 'mobile', name: 'Mobile Development', icon: '📱' },
  { id: 'ai', name: 'AI/ML Integration', icon: '🧠' },
  { id: 'blockchain', name: 'Blockchain Development', icon: '⛓️' },
  { id: 'devops', name: 'DevOps & Cloud', icon: '☁️' },
  { id: 'ui-ux', name: 'UI/UX Design', icon: '✨' },
  { id: 'consulting', name: 'Technical Consulting', icon: '💡' }
];

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 4;

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'hello@devneststudios.com',
      description: 'Drop us a line anytime',
      action: 'mailto:hello@devneststudios.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm',
      action: 'tel:+15551234567'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      content: 'San Francisco, CA',
      description: 'Come say hello at our office',
      action: 'https://maps.google.com'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      content: 'Mon - Fri: 8AM - 6PM',
      description: 'Pacific Standard Time',
      action: null
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        break;
      case 2:
        if (!formData.projectType) newErrors.projectType = 'Project type is required';
        if (!formData.description.trim()) newErrors.description = 'Project description is required';
        break;
      case 3:
        if (formData.services.length === 0) newErrors.services = 'Please select at least one service' as any;
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <FloatingElements />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto p-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            We've received your project inquiry and will get back to you within 24 hours.
          </p>
          <Button onClick={() => window.location.reload()}>
            Submit Another Project
          </Button>
        </motion.div>
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
              Let's Build Something Amazing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Tell us about your project and we'll help you bring your vision to life with cutting-edge technology.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlowCard className="p-4 group cursor-pointer" onClick={() => info.action && window.open(info.action)}>
                      <div className="flex items-start gap-4">
                        <div className="text-primary">{info.icon}</div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-primary font-medium">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
              
              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <GlowCard className="p-0 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Interactive Map</p>
                      <p className="text-xs text-muted-foreground">San Francisco Office</p>
                    </div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  </div>
                </GlowCard>
              </motion.div>
            </motion.div>
          </div>

          {/* Smart Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlowCard className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Project Details</h2>
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep} of {totalSteps}
                    </span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Basic Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            placeholder="john@company.com"
                          />
                          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Company</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => updateFormData('company', e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            placeholder="Acme Inc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Project Details
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-3">Project Type *</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {projectTypes.map((type) => (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => updateFormData('projectType', type.id)}
                                className={`p-4 border rounded-lg text-left transition-all ${
                                  formData.projectType === type.id
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <div className="text-2xl mb-2">{type.icon}</div>
                                <div className="text-sm font-medium">{type.name}</div>
                              </button>
                            ))}
                          </div>
                          {errors.projectType && <p className="text-red-400 text-sm mt-1">{errors.projectType}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-3">Budget Range</label>
                          <div className="space-y-2">
                            {budgetRanges.map((budget) => (
                              <label
                                key={budget.id}
                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                  formData.budget === budget.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="budget"
                                  value={budget.id}
                                  checked={formData.budget === budget.id}
                                  onChange={(e) => updateFormData('budget', e.target.value)}
                                  className="sr-only"
                                />
                                <div className="flex-1">
                                  <div className="font-medium">{budget.name}</div>
                                  <div className="text-sm text-muted-foreground">{budget.desc}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Project Description *</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => updateFormData('description', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                            placeholder="Tell us about your project goals, requirements, and any specific features you have in mind..."
                          />
                          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Services & Requirements */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Services & Requirements
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-3">Services Needed *</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {services.map((service) => (
                              <label
                                key={service.id}
                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                  formData.services.includes(service.id)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.services.includes(service.id)}
                                  onChange={(e) => {
                                    const services = e.target.checked
                                      ? [...formData.services, service.id]
                                      : formData.services.filter(s => s !== service.id);
                                    updateFormData('services', services);
                                  }}
                                  className="sr-only"
                                />
                                <div className="text-2xl mr-3">{service.icon}</div>
                                <div className="text-sm font-medium">{service.name}</div>
                              </label>
                            ))}
                          </div>
                          {errors.services && <p className="text-red-400 text-sm mt-1">{errors.services}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Timeline</label>
                          <select
                            value={formData.timeline}
                            onChange={(e) => updateFormData('timeline', e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          >
                            <option value="">Select timeline</option>
                            <option value="asap">ASAP (Rush project)</option>
                            <option value="1-3months">1-3 months</option>
                            <option value="3-6months">3-6 months</option>
                            <option value="6months+">6+ months</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Project Goals</label>
                          <textarea
                            value={formData.goals}
                            onChange={(e) => updateFormData('goals', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                            placeholder="What do you hope to achieve with this project? Any specific metrics or outcomes you're targeting?"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Final Details */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Additional Information
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                          <select
                            value={formData.referralSource}
                            onChange={(e) => updateFormData('referralSource', e.target.value)}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          >
                            <option value="">Select source</option>
                            <option value="google">Google Search</option>
                            <option value="social">Social Media</option>
                            <option value="referral">Referral</option>
                            <option value="portfolio">Our Portfolio</option>
                            <option value="event">Conference/Event</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="preferredContact"
                                value="email"
                                checked={formData.preferredContact === 'email'}
                                onChange={(e) => updateFormData('preferredContact', e.target.value)}
                                className="mr-2"
                              />
                              Email
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="preferredContact"
                                value="phone"
                                checked={formData.preferredContact === 'phone'}
                                onChange={(e) => updateFormData('preferredContact', e.target.value)}
                                className="mr-2"
                              />
                              Phone Call
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="preferredContact"
                                value="meeting"
                                checked={formData.preferredContact === 'meeting'}
                                onChange={(e) => updateFormData('preferredContact', e.target.value)}
                                className="mr-2"
                              />
                              Video Meeting
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Additional Information</label>
                          <textarea
                            value={formData.additionalInfo}
                            onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                            placeholder="Any other details, requirements, or questions you'd like to share..."
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep} className="flex items-center gap-2">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Project
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
