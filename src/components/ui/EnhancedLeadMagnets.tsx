import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Mail,
  FileText,
  Star,
  CheckCircle,
  X,
  Gift,
  Users,
  Clock,
  AlertCircle,
  Lock,
  Unlock,
  BookOpen,
  List,
  Code,
  Palette,
  Calculator,
  Zap,
  Target,
  Briefcase,
  Shield,
  TrendingUp,
  Calendar,
  Settings
} from 'lucide-react';

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'guide' | 'checklist' | 'toolkit' | 'webinar';
  category: 'development' | 'design' | 'business' | 'marketing' | 'strategy';
  icon: React.ComponentType<any>;
  size: string;
  downloadCount: number;
  rating: number;
  color: string;
  premium: boolean;
  tags: string[];
  previewItems?: string[];
}

interface NewsletterPreferences {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  interests: string[];
  role: string;
  companySize: string;
}

const EnhancedLeadMagnets: React.FC = () => {
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    frequency: 'weekly',
    interests: [],
    role: '',
    companySize: ''
  });
  const [subscriptionState, setSubscriptionState] = useState<'idle' | 'subscribing' | 'success' | 'error'>('idle');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const leadMagnets: LeadMagnet[] = [
    {
      id: 'product-brief-template',
      title: 'Product Brief Template',
      description: 'Professional product requirements template used by top companies to streamline development',
      type: 'template',
      category: 'development',
      icon: FileText,
      size: '2.4 MB',
      downloadCount: 12500,
      rating: 4.9,
      color: 'from-blue-500 to-blue-700',
      premium: false,
      tags: ['Product Management', 'Requirements', 'Planning'],
      previewItems: [
        'Executive Summary Template',
        'User Story Framework',
        'Technical Requirements Checklist',
        'Acceptance Criteria Guide'
      ]
    },
    {
      id: 'ui-design-system-kit',
      title: 'UI Design System Starter Kit',
      description: 'Complete design system with components, tokens, and documentation templates',
      type: 'toolkit',
      category: 'design',
      icon: Palette,
      size: '15.2 MB',
      downloadCount: 8300,
      rating: 4.8,
      color: 'from-purple-500 to-pink-500',
      premium: false,
      tags: ['Design System', 'UI Components', 'Figma'],
      previewItems: [
        '50+ UI Components',
        'Design Token System',
        'Documentation Template',
        'Figma & Sketch Files'
      ]
    },
    {
      id: 'project-estimation-calculator',
      title: 'Project Estimation Calculator',
      description: 'Advanced Excel calculator for accurate software project time and cost estimation',
      type: 'toolkit',
      category: 'business',
      icon: Calculator,
      size: '1.8 MB',
      downloadCount: 6700,
      rating: 4.7,
      color: 'from-green-500 to-emerald-500',
      premium: false,
      tags: ['Project Management', 'Estimation', 'Excel'],
      previewItems: [
        'Time Estimation Framework',
        'Cost Calculation Models',
        'Risk Assessment Matrix',
        'Client Proposal Template'
      ]
    },
    {
      id: 'development-checklist',
      title: 'Complete Development Checklist',
      description: '100+ point checklist covering every stage of the development lifecycle',
      type: 'checklist',
      category: 'development',
      icon: List,
      size: '856 KB',
      downloadCount: 15200,
      rating: 4.9,
      color: 'from-orange-500 to-red-500',
      premium: false,
      tags: ['Development', 'Quality Assurance', 'Best Practices'],
      previewItems: [
        'Pre-Development Setup',
        'Code Quality Standards',
        'Testing Protocols',
        'Deployment Checklist'
      ]
    },
    {
      id: 'api-documentation-guide',
      title: 'API Documentation Best Practices Guide',
      description: 'Comprehensive guide to creating clear, usable API documentation that developers love',
      type: 'guide',
      category: 'development',
      icon: Code,
      size: '3.1 MB',
      downloadCount: 4500,
      rating: 4.8,
      color: 'from-indigo-500 to-purple-500',
      premium: true,
      tags: ['API', 'Documentation', 'Developer Experience'],
      previewItems: [
        'Documentation Structure',
        'Code Example Templates',
        'Interactive API Explorer Setup',
        'Version Management Guide'
      ]
    },
    {
      id: 'startup-tech-strategy',
      title: 'Startup Technology Strategy Template',
      description: 'Strategic framework for making technology decisions in early-stage startups',
      type: 'template',
      category: 'strategy',
      icon: Target,
      size: '2.7 MB',
      downloadCount: 3200,
      rating: 4.6,
      color: 'from-teal-500 to-cyan-500',
      premium: true,
      tags: ['Strategy', 'Startups', 'Technology Planning'],
      previewItems: [
        'Technology Assessment Framework',
        'Scalability Planning Guide',
        'Team Structure Templates',
        'Budget Allocation Models'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: Gift },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'strategy', name: 'Strategy', icon: Target }
  ];

  const interests = [
    'Web Development', 'Mobile Apps', 'UI/UX Design', 'DevOps', 
    'AI/ML', 'Blockchain', 'E-commerce', 'SaaS', 'Startups', 'Enterprise'
  ];

  const roles = [
    'Developer', 'Designer', 'Product Manager', 'CTO', 'CEO', 
    'Startup Founder', 'Marketing Manager', 'Other'
  ];

  const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

  const filteredMagnets = activeCategory === 'all' 
    ? leadMagnets 
    : leadMagnets.filter(magnet => magnet.category === activeCategory);

  const handleDownload = async () => {
    if (!email || !name || !selectedMagnet) return;
    
    setSubscriptionState('subscribing');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track subscription
      if ((window as any).trackGamifiedAction) {
        (window as any).trackGamifiedAction('newsletter_subscribe');
      }
      
      setSubscriptionState('success');
      
      // Start download after short delay
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = `/resources/${selectedMagnet.id}.pdf`;
        link.download = selectedMagnet.title;
        link.click();
      }, 1500);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedMagnet(null);
        setSubscriptionState('idle');
        setEmail('');
        setName('');
      }, 5000);
      
    } catch (error) {
      setSubscriptionState('error');
      setTimeout(() => setSubscriptionState('idle'), 3000);
    }
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Free Resources Library
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Download professional templates, guides, and tools to accelerate your development projects
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Resources Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {filteredMagnets.map((magnet) => {
          const Icon = magnet.icon;
          return (
            <motion.div
              key={magnet.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
              whileHover={{ y: -4 }}
              onClick={() => setSelectedMagnet(magnet)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${magnet.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {magnet.premium && (
                  <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full">
                    PRO
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {magnet.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {magnet.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {magnet.tags.slice(0, 2).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {magnet.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                    +{magnet.tags.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{magnet.downloadCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{magnet.rating}</span>
                  </div>
                </div>
                <span className="text-xs">{magnet.size}</span>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                Download Free
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Newsletter Signup Modal */}
      <AnimatePresence>
        {selectedMagnet && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {subscriptionState === 'success' ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Success! 🎉
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your download will start automatically. Check your email for more exclusive resources!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Download starting...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Get {selectedMagnet.title}
                    </h2>
                    <button
                      onClick={() => setSelectedMagnet(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Resource Preview */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedMagnet.color}`}>
                          <selectedMagnet.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedMagnet.title}
                            </h3>
                            {selectedMagnet.premium && (
                              <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {selectedMagnet.description}
                          </p>
                          
                          {selectedMagnet.previewItems && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What's Included:</h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {selectedMagnet.previewItems.map((item, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subscription Form */}
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            disabled={subscriptionState === 'subscribing'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            disabled={subscriptionState === 'subscribing'}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Role
                          </label>
                          <select
                            value={preferences.role}
                            onChange={(e) => setPreferences(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="">Select role...</option>
                            {roles.map(role => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company Size
                          </label>
                          <select
                            value={preferences.companySize}
                            onChange={(e) => setPreferences(prev => ({ ...prev, companySize: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="">Select size...</option>
                            {companySizes.map(size => (
                              <option key={size} value={size}>{size} employees</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Interests (optional)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                preferences.interests.includes(interest)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Newsletter Frequency
                        </label>
                        <div className="flex gap-4">
                          {(['weekly', 'biweekly', 'monthly'] as const).map((freq) => (
                            <label key={freq} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="frequency"
                                value={freq}
                                checked={preferences.frequency === freq}
                                onChange={(e) => setPreferences(prev => ({ ...prev, frequency: e.target.value as any }))}
                                className="text-blue-600"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{freq}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleDownload}
                        disabled={!email || !name || subscriptionState === 'subscribing'}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {subscriptionState === 'subscribing' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Getting Your Download Ready...
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4" />
                            Get Free Download
                          </>
                        )}
                      </button>

                      {subscriptionState === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>Something went wrong. Please try again.</span>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        By downloading, you agree to receive our newsletter. No spam, unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Benefits */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Join 15,000+ Developers & Designers
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Weekly Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Latest trends, tools, and best practices delivered to your inbox
            </p>
          </div>
          <div className="text-center">
            <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Exclusive Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Premium templates and guides available only to subscribers
            </p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Early Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Be the first to access new tools, courses, and resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLeadMagnets;