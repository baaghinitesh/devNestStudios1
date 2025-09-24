import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  CheckCircle, 
  Info, 
  Clock, 
  Users, 
  Zap, 
  Target,
  TrendingUp,
  Shield,
  Award,
  ArrowRight,
  Minus,
  Plus,
  FileText,
  PieChart
} from 'lucide-react';

interface PricingBreakdown {
  category: string;
  hours: number;
  rate: number;
  total: number;
  description: string;
}

interface ProjectCalculator {
  projectType: string;
  complexity: 'simple' | 'standard' | 'complex' | 'enterprise';
  features: string[];
  timeline: number;
  teamSize: number;
  pricing: {
    development: number;
    design: number;
    management: number;
    testing: number;
    deployment: number;
  };
  breakdown: PricingBreakdown[];
}

const PricingTransparency: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [projectType, setProjectType] = useState('web-app');
  const [complexity, setComplexity] = useState<'simple' | 'standard' | 'complex' | 'enterprise'>('standard');
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeatures, setCustomFeatures] = useState(0);
  const [timeline, setTimeline] = useState(12);
  const [teamSize, setTeamSize] = useState(3);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [breakdown, setBreakdown] = useState<PricingBreakdown[]>([]);

  const projectTypes = {
    'web-app': { 
      name: 'Web Application', 
      basePrice: 15000, 
      complexity: { simple: 0.7, standard: 1, complex: 1.5, enterprise: 2.2 } 
    },
    'mobile-app': { 
      name: 'Mobile Application', 
      basePrice: 25000, 
      complexity: { simple: 0.8, standard: 1, complex: 1.4, enterprise: 2 } 
    },
    'ecommerce': { 
      name: 'E-commerce Platform', 
      basePrice: 20000, 
      complexity: { simple: 0.6, standard: 1, complex: 1.6, enterprise: 2.5 } 
    },
    'saas': { 
      name: 'SaaS Platform', 
      basePrice: 35000, 
      complexity: { simple: 0.8, standard: 1, complex: 1.3, enterprise: 1.8 } 
    },
    'enterprise': { 
      name: 'Enterprise Solution', 
      basePrice: 50000, 
      complexity: { simple: 0.9, standard: 1, complex: 1.2, enterprise: 1.5 } 
    }
  };

  const availableFeatures = {
    'web-app': [
      'User Authentication', 'Payment Integration', 'Real-time Chat', 'File Upload',
      'Advanced Analytics', 'API Integration', 'Third-party Services', 'Admin Panel'
    ],
    'mobile-app': [
      'Push Notifications', 'Offline Support', 'Camera Integration', 'GPS/Maps',
      'In-App Purchases', 'Social Login', 'Biometric Auth', 'Background Sync'
    ],
    'ecommerce': [
      'Inventory Management', 'Multi-vendor Support', 'Wishlist', 'Reviews & Ratings',
      'Discount Coupons', 'Multi-currency', 'Tax Calculation', 'Shipping Integration'
    ],
    'saas': [
      'Multi-tenancy', 'Role-based Access', 'Billing System', 'Usage Analytics',
      'API Management', 'White Labeling', 'Integrations Hub', 'Advanced Reporting'
    ],
    'enterprise': [
      'SSO Integration', 'Advanced Security', 'Compliance Tools', 'Audit Trails',
      'Custom Workflows', 'Data Migration', 'Legacy Integration', 'Training Materials'
    ]
  };

  const featurePricing = {
    basic: 500,
    standard: 1500,
    complex: 3000,
    enterprise: 5000
  };

  useEffect(() => {
    calculatePricing();
  }, [projectType, complexity, features, customFeatures, timeline, teamSize]);

  const calculatePricing = () => {
    const basePrice = projectTypes[projectType as keyof typeof projectTypes].basePrice;
    const complexityMultiplier = projectTypes[projectType as keyof typeof projectTypes].complexity[complexity];
    
    // Base calculation
    const adjustedBase = basePrice * complexityMultiplier;
    
    // Feature pricing
    const featuresCost = features.reduce((total, feature) => {
      const featureComplexity = getFeatureComplexity(feature);
      return total + featurePricing[featureComplexity as keyof typeof featurePricing];
    }, 0);
    
    // Custom features
    const customFeaturesCost = customFeatures * featurePricing.standard;
    
    // Timeline adjustment (rush jobs cost more, longer timelines cost less)
    const timelineMultiplier = timeline < 8 ? 1.3 : timeline > 16 ? 0.9 : 1;
    
    // Team size adjustment
    const teamMultiplier = teamSize > 5 ? 1.2 : teamSize < 2 ? 0.8 : 1;
    
    const totalPrice = (adjustedBase + featuresCost + customFeaturesCost) * timelineMultiplier * teamMultiplier;
    
    setCalculatedPrice(Math.round(totalPrice));
    
    // Generate breakdown
    const newBreakdown: PricingBreakdown[] = [
      {
        category: 'Development',
        hours: Math.round(timeline * 40 * 0.6),
        rate: 125,
        total: Math.round(totalPrice * 0.6),
        description: 'Core development work including backend and frontend'
      },
      {
        category: 'Design & UX',
        hours: Math.round(timeline * 40 * 0.15),
        rate: 100,
        total: Math.round(totalPrice * 0.15),
        description: 'UI/UX design, wireframes, and user experience optimization'
      },
      {
        category: 'Project Management',
        hours: Math.round(timeline * 40 * 0.1),
        rate: 95,
        total: Math.round(totalPrice * 0.1),
        description: 'Project coordination, client communication, and delivery'
      },
      {
        category: 'Testing & QA',
        hours: Math.round(timeline * 40 * 0.1),
        rate: 85,
        total: Math.round(totalPrice * 0.1),
        description: 'Quality assurance, testing, and bug fixes'
      },
      {
        category: 'Deployment & DevOps',
        hours: Math.round(timeline * 40 * 0.05),
        rate: 140,
        total: Math.round(totalPrice * 0.05),
        description: 'Server setup, deployment, and infrastructure configuration'
      }
    ];
    
    setBreakdown(newBreakdown);
  };

  const getFeatureComplexity = (feature: string): string => {
    const complexFeatures = ['Multi-tenancy', 'Advanced Security', 'SSO Integration', 'Legacy Integration'];
    const standardFeatures = ['Payment Integration', 'Real-time Chat', 'Push Notifications', 'API Management'];
    
    if (complexFeatures.includes(feature)) return 'enterprise';
    if (standardFeatures.includes(feature)) return 'complex';
    return 'standard';
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const pricingFactors = [
    {
      icon: Clock,
      title: 'Timeline Flexibility',
      description: 'Rush projects (< 8 weeks): +30% | Extended timeline (> 16 weeks): -10%'
    },
    {
      icon: Users,
      title: 'Team Size',
      description: 'Larger teams enable faster delivery but increase coordination overhead'
    },
    {
      icon: Zap,
      title: 'Feature Complexity',
      description: 'Each feature is priced based on development complexity and integration requirements'
    },
    {
      icon: Target,
      title: 'Project Scope',
      description: 'Clear requirements reduce costs. Scope changes are billed at hourly rates'
    }
  ];

  const transparencyPrinciples = [
    {
      icon: DollarSign,
      title: 'No Hidden Costs',
      description: 'Every charge is itemized and explained upfront. What you see is what you pay.',
      details: ['All third-party service costs disclosed', 'Change requests priced transparently', 'No surprise fees at project end']
    },
    {
      icon: FileText,
      title: 'Detailed Breakdown',
      description: 'Complete visibility into how your investment is allocated across the project.',
      details: ['Hour-by-hour tracking available', 'Weekly financial reports', 'Resource allocation transparency']
    },
    {
      icon: Shield,
      title: 'Fixed-Price Guarantee',
      description: 'Your quoted price is locked in for the agreed scope. No budget overruns.',
      details: ['Scope protection included', 'Change request process', 'Budget cap guarantees']
    },
    {
      icon: TrendingUp,
      title: 'Value-Based Pricing',
      description: 'Pricing aligned with business outcomes and measurable value delivered.',
      details: ['ROI-focused approach', 'Success metrics defined', 'Performance bonuses available']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Transparent Pricing
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          No hidden fees. No surprise costs. Just honest, transparent pricing that aligns with your success.
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          { id: 'calculator', name: 'Price Calculator', icon: Calculator },
          { id: 'breakdown', name: 'Cost Breakdown', icon: PieChart },
          { id: 'transparency', name: 'Our Promise', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Calculator Controls */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Project Calculator
                </h3>

                {/* Project Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  >
                    {Object.entries(projectTypes).map(([key, type]) => (
                      <option key={key} value={key}>{type.name}</option>
                    ))}
                  </select>
                </div>

                {/* Complexity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Complexity Level</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['simple', 'standard', 'complex', 'enterprise'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setComplexity(level)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          complexity === level
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Features ({features.length} selected)
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                    {availableFeatures[projectType as keyof typeof availableFeatures]?.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Custom Features */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Additional Custom Features</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCustomFeatures(Math.max(0, customFeatures - 1))}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg font-medium">
                      {customFeatures}
                    </span>
                    <button
                      onClick={() => setCustomFeatures(customFeatures + 1)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Timeline: {timeline} weeks
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="52"
                    value={timeline}
                    onChange={(e) => setTimeline(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4 weeks</span>
                    <span>52 weeks</span>
                  </div>
                </div>

                {/* Team Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">
                    Team Size: {teamSize} people
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 person</span>
                    <span>10+ people</span>
                  </div>
                </div>
              </div>

              {/* Pricing Factors */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Pricing Factors
                </h4>
                <div className="space-y-4">
                  {pricingFactors.map((factor, index) => {
                    const Icon = factor.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{factor.title}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {factor.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Estimated Investment</h3>
                <div className="text-6xl font-bold text-blue-600 mb-4">
                  ${calculatedPrice.toLocaleString()}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Based on your requirements • Fixed price guarantee
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="font-semibold">Timeline</div>
                    <div className="text-gray-600 dark:text-gray-400">{timeline} weeks</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="font-semibold">Team Size</div>
                    <div className="text-gray-600 dark:text-gray-400">{teamSize} people</div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  Get Detailed Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Breakdown */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <h4 className="text-lg font-semibold mb-4">Quick Breakdown</h4>
                <div className="space-y-3">
                  {breakdown.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.category}</span>
                      <span className="font-semibold">${item.total.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center font-semibold">
                    <span>Total Estimate</span>
                    <span className="text-blue-600">${calculatedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'breakdown' && (
          <motion.div
            key="breakdown"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Detailed Breakdown */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <PieChart className="w-6 h-6 text-blue-600" />
                Detailed Cost Breakdown
              </h3>
              <div className="space-y-4">
                {breakdown.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-r-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{item.category}</h4>
                      <span className="text-xl font-bold text-blue-600">
                        ${item.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {item.hours} hours × ${item.rate}/hour
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Investment Breakdown Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6">Investment Allocation</h3>
              <div className="space-y-4">
                {breakdown.map((item, index) => {
                  const percentage = ((item.total / calculatedPrice) * 100).toFixed(1);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                  What's Included
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Unlimited revisions during development</li>
                  <li>• 3 months post-launch support</li>
                  <li>• Complete source code ownership</li>
                  <li>• Documentation and training</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'transparency' && (
          <motion.div
            key="transparency"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {transparencyPrinciples.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">{principle.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {principle.description}
                    </p>
                    <ul className="space-y-2">
                      {principle.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* ROI Calculator Preview */}
            <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">ROI Calculator</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See how your investment translates to business value
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-600">312%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average ROI</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-600">6 months</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingTransparency;