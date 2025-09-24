import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Shield, 
  Star, 
  CheckCircle, 
  Briefcase,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

const TrustBadgesSection: React.FC = () => {
  const trustHighlights = [
    {
      icon: Award,
      title: 'AWS Solutions Architect',
      subtitle: 'Professional Certified',
      color: 'from-orange-500 to-yellow-500',
      type: 'certification'
    },
    {
      icon: Briefcase,
      title: 'Microsoft Gold Partner',
      subtitle: 'Elite Partnership',
      color: 'from-blue-500 to-blue-700',
      type: 'partnership'
    },
    {
      icon: Star,
      title: 'Best Digital Innovation',
      subtitle: '2024 Winner',
      color: 'from-yellow-500 to-orange-500',
      type: 'award'
    },
    {
      icon: Shield,
      title: 'ISO 27001 Certified',
      subtitle: 'Security Compliant',
      color: 'from-green-500 to-emerald-500',
      type: 'certification'
    }
  ];

  const stats = [
    { number: '15+', label: 'Certifications' },
    { number: '10+', label: 'Partnerships' },
    { number: '8+', label: 'Industry Awards' },
    { number: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our certifications, partnerships, and awards demonstrate our commitment to excellence and innovation
          </motion.p>
        </div>

        {/* Trust Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${item.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === 'certification' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                  item.type === 'partnership' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                  'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                }`}>
                  {item.type}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Partnership Logos Section */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Proud Partners Of
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {['AWS', 'Microsoft', 'Google Cloud', 'Adobe', 'Shopify', 'Stripe'].map((partner, index) => (
              <div 
                key={index}
                className="flex items-center justify-center w-20 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Security & Compliance</h3>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                ISO 27001 Information Security Management
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                GDPR Compliance & Data Protection
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                SOC 2 Type II Security Framework
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Enterprise-Grade Security Practices
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Excellence Recognition</h3>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Best Digital Innovation Agency 2024
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                UI/UX Design Excellence Award 2023
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Outstanding Client Satisfaction 2024
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Mobile Development Excellence 2023
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/trust-badges"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View All Credentials
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Explore our complete list of certifications, partnerships, and awards
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;