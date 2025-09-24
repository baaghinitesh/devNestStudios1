import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Shield, 
  Star, 
  CheckCircle, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp,
  Code,
  Lock,
  Briefcase,
  Heart,
  Target,
  Clock,
  Lightbulb,
  BookOpen,
  Camera,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  ExternalLink
} from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  icon: React.ComponentType<any>;
  year: string;
  verificationUrl?: string;
  category: 'technical' | 'business' | 'security' | 'quality';
  level: 'expert' | 'professional' | 'certified';
  color: string;
}

interface Partnership {
  id: string;
  name: string;
  description: string;
  logo: string;
  partnershipLevel: 'platinum' | 'gold' | 'silver' | 'certified';
  category: 'technology' | 'cloud' | 'design' | 'marketing';
  since: string;
  benefits: string[];
  color: string;
}

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'innovation' | 'design' | 'development' | 'service';
  rank?: string;
  color: string;
}

const TrustBadges: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const certifications: Certification[] = [
    {
      id: 'aws-solutions-architect',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      description: 'Advanced certification for designing distributed applications on AWS platform with expertise in security, scalability, and cost optimization.',
      icon: Cloud,
      year: '2024',
      verificationUrl: 'https://aws.amazon.com/certification/',
      category: 'technical',
      level: 'expert',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 'google-cloud-architect',
      name: 'Google Cloud Professional Architect',
      issuer: 'Google Cloud',
      description: 'Professional-level certification demonstrating expertise in designing, developing, and managing robust, secure, scalable, and dynamic solutions.',
      icon: Database,
      year: '2024',
      verificationUrl: 'https://cloud.google.com/certification',
      category: 'technical',
      level: 'professional',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'react-certification',
      name: 'Advanced React Developer',
      issuer: 'Meta (Facebook)',
      description: 'Advanced certification in React ecosystem including hooks, context, performance optimization, and modern development practices.',
      icon: Code,
      year: '2024',
      category: 'technical',
      level: 'expert',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'cybersecurity-certification',
      name: 'Certified Information Security Manager',
      issuer: 'ISACA',
      description: 'Advanced cybersecurity certification focusing on information security management and governance frameworks.',
      icon: Shield,
      year: '2023',
      category: 'security',
      level: 'professional',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'agile-scrum-master',
      name: 'Certified Scrum Master (CSM)',
      issuer: 'Scrum Alliance',
      description: 'Professional certification in Agile methodologies and Scrum framework for effective project management.',
      icon: Target,
      year: '2023',
      category: 'business',
      level: 'certified',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001 Lead Implementer',
      issuer: 'PECB',
      description: 'Certification in implementing and managing Information Security Management Systems according to ISO 27001 standards.',
      icon: Lock,
      year: '2023',
      category: 'security',
      level: 'professional',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const partnerships: Partnership[] = [
    {
      id: 'microsoft-gold',
      name: 'Microsoft Gold Partner',
      description: 'Highest level Microsoft partnership with proven expertise in cloud solutions and enterprise applications.',
      logo: 'microsoft',
      partnershipLevel: 'gold',
      category: 'cloud',
      since: '2022',
      benefits: ['Priority Support', 'Advanced Training', 'Co-marketing Opportunities', 'Technical Previews'],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'aws-advanced',
      name: 'AWS Advanced Consulting Partner',
      description: 'Advanced tier AWS partnership demonstrating technical expertise and proven customer success.',
      logo: 'aws',
      partnershipLevel: 'platinum',
      category: 'cloud',
      since: '2021',
      benefits: ['Technical Support', 'Training Credits', 'Solution Architect Access', 'Marketing Development Funds'],
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 'google-premier',
      name: 'Google Cloud Premier Partner',
      description: 'Top-tier Google Cloud partnership with demonstrated expertise in cloud migration and modernization.',
      logo: 'google',
      partnershipLevel: 'platinum',
      category: 'cloud',
      since: '2022',
      benefits: ['Dedicated Support', 'Early Access Programs', 'Customer Success Manager', 'Joint Go-to-Market'],
      color: 'from-green-500 to-green-700'
    },
    {
      id: 'adobe-solution-partner',
      name: 'Adobe Solution Partner',
      description: 'Certified Adobe partner specializing in creative solutions and digital experience platforms.',
      logo: 'adobe',
      partnershipLevel: 'gold',
      category: 'design',
      since: '2023',
      benefits: ['Design Tools Access', 'Training Resources', 'Marketing Support', 'Technical Consultation'],
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'shopify-plus-partner',
      name: 'Shopify Plus Partner',
      description: 'Elite Shopify Plus partner with expertise in enterprise e-commerce solutions.',
      logo: 'shopify',
      partnershipLevel: 'gold',
      category: 'technology',
      since: '2022',
      benefits: ['Platform Access', 'Development Support', 'Merchant Referrals', 'Technical Training'],
      color: 'from-green-600 to-green-800'
    },
    {
      id: 'stripe-verified',
      name: 'Stripe Verified Partner',
      description: 'Verified Stripe integration partner with expertise in payment processing and financial technology.',
      logo: 'stripe',
      partnershipLevel: 'certified',
      category: 'technology',
      since: '2023',
      benefits: ['Integration Support', 'Developer Resources', 'Priority Review', 'Technical Documentation'],
      color: 'from-indigo-500 to-indigo-700'
    }
  ];

  const awards: Award[] = [
    {
      id: 'innovation-award-2024',
      title: 'Best Digital Innovation Agency',
      organization: 'Tech Excellence Awards',
      year: '2024',
      description: 'Recognized for outstanding innovation in digital solutions and cutting-edge technology implementation.',
      icon: Lightbulb,
      category: 'innovation',
      rank: 'Winner',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'design-excellence-2023',
      title: 'UI/UX Design Excellence Award',
      organization: 'International Design Awards',
      year: '2023',
      description: 'Awarded for exceptional user experience design and innovative interface solutions across multiple projects.',
      icon: Camera,
      category: 'design',
      rank: 'Gold Medal',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'client-satisfaction-2024',
      title: 'Outstanding Client Satisfaction',
      organization: 'Business Excellence Institute',
      year: '2024',
      description: 'Recognition for maintaining 98% client satisfaction rate and exceptional service delivery standards.',
      icon: Heart,
      category: 'service',
      rank: 'Platinum',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'mobile-development-2023',
      title: 'Mobile Development Excellence',
      organization: 'Mobile App Awards',
      year: '2023',
      description: 'Recognized for developing high-performance mobile applications with superior user experience.',
      icon: Smartphone,
      category: 'development',
      rank: 'Best in Category',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'web-development-2023',
      title: 'Web Development Innovation Award',
      organization: 'Web Excellence Awards',
      year: '2023',
      description: 'Awarded for innovative web development practices and technical excellence in modern web applications.',
      icon: Monitor,
      category: 'development',
      rank: 'Winner',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'startup-partner-2024',
      title: 'Best Technology Partner for Startups',
      organization: 'Startup Ecosystem Awards',
      year: '2024',
      description: 'Recognition for supporting startup growth through innovative technology solutions and strategic guidance.',
      icon: TrendingUp,
      category: 'service',
      rank: 'Gold Award',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Globe },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'partnerships', name: 'Partnerships', icon: Briefcase },
    { id: 'awards', name: 'Awards', icon: Star }
  ];

  const getFilteredItems = () => {
    switch (activeCategory) {
      case 'certifications':
        return { certifications, partnerships: [], awards: [] };
      case 'partnerships':
        return { certifications: [], partnerships, awards: [] };
      case 'awards':
        return { certifications: [], partnerships: [], awards };
      default:
        return { certifications, partnerships, awards };
    }
  };

  const { certifications: filteredCerts, partnerships: filteredPartnerships, awards: filteredAwards } = getFilteredItems();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Trust & Excellence
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Our certifications, partnerships, and awards demonstrate our commitment to excellence and industry leadership
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
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {category.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-12"
        >
          {/* Certifications Section */}
          {filteredCerts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="w-8 h-8 text-purple-600" />
                Professional Certifications
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCerts.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={cert.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedItem(cert)}
                    >
                      <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${cert.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cert.level === 'expert' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                          cert.level === 'professional' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                          'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                        }`}>
                          {cert.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{cert.issuer}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{cert.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Earned: {cert.year}</span>
                        {cert.verificationUrl && (
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Partnerships Section */}
          {filteredPartnerships.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Strategic Partnerships
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartnerships.map((partnership) => (
                  <motion.div
                    key={partnership.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedItem(partnership)}
                  >
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${partnership.color} mb-4`}>
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{partnership.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        partnership.partnershipLevel === 'platinum' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                        partnership.partnershipLevel === 'gold' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' :
                        partnership.partnershipLevel === 'silver' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' :
                        'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                      }`}>
                        {partnership.partnershipLevel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{partnership.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Since: {partnership.since}</span>
                      <span className="text-xs text-blue-600 capitalize">{partnership.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Awards Section */}
          {filteredAwards.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-600" />
                Industry Awards
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAwards.map((award) => {
                  const Icon = award.icon;
                  return (
                    <motion.div
                      key={award.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedItem(award)}
                    >
                      <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${award.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{award.title}</h3>
                        {award.rank && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">
                            {award.rank}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{award.organization}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{award.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Year: {award.year}</span>
                        <span className="text-xs text-yellow-600 capitalize">{award.category}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedItem.name || selectedItem.title}
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{selectedItem.description}</p>
                
                {selectedItem.issuer && (
                  <div>
                    <h3 className="font-semibold mb-2">Issued By:</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedItem.issuer}</p>
                  </div>
                )}

                {selectedItem.organization && (
                  <div>
                    <h3 className="font-semibold mb-2">Organization:</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedItem.organization}</p>
                  </div>
                )}

                {selectedItem.benefits && (
                  <div>
                    <h3 className="font-semibold mb-2">Partnership Benefits:</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      {selectedItem.benefits.map((benefit: string, index: number) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.verificationUrl && (
                  <div>
                    <a
                      href={selectedItem.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Certification
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Stats */}
      <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Commitment to Excellence</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">15+</div>
            <p className="text-gray-600 dark:text-gray-400">Professional Certifications</p>
          </div>
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10+</div>
            <p className="text-gray-600 dark:text-gray-400">Strategic Partnerships</p>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">8+</div>
            <p className="text-gray-600 dark:text-gray-400">Industry Awards</p>
          </div>
          <div className="text-center">
            <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5+</div>
            <p className="text-gray-600 dark:text-gray-400">Years of Excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;