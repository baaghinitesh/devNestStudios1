import React, { useState } from 'react';
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
  Unlock
} from 'lucide-react';

interface NewsletterGatedResourceProps {
  showInline?: boolean;
  onSubscribe?: (email: string) => void;
}

const NewsletterGatedResource: React.FC<NewsletterGatedResourceProps> = ({
  showInline = false,
  onSubscribe
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionState, setSubscriptionState] = useState<'idle' | 'subscribing' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    
    setSubscriptionState('subscribing');
    
    setTimeout(() => {
      const success = Math.random() > 0.1;
      
      if (success) {
        setSubscriptionState('success');
        onSubscribe?.(email);
        
        if ((window as any).trackGamifiedAction) {
          (window as any).trackGamifiedAction('newsletter_subscribe');
        }
        
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/resources/product-brief-template.pdf';
          link.download = 'Product Brief Template';
          link.click();
        }, 1500);
      } else {
        setSubscriptionState('error');
      }
      
      setTimeout(() => {
        if (success) {
          setIsOpen(false);
        }
        setSubscriptionState('idle');
      }, 3000);
    }, 2000);
  };

  const openModal = () => {
    setIsOpen(true);
    
    if ((window as any).trackGamifiedAction) {
      (window as any).trackGamifiedAction('resource_modal_open');
    }
  };

  if (showInline) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Free Product Brief Template
              </h3>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                FREE
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Professional product requirements template used by top companies
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>2.4 MB</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>10,000+ downloads</span>
              </div>
            </div>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Get Free Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        <Gift className="w-5 h-5" />
        Free Product Brief Template
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Product Brief Template
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  {subscriptionState === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Success! 🎉
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Check your email for the download link. Your template will start downloading shortly.
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Download starting automatically...</span>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Unlock Your Free Template
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Join 10,000+ professionals getting our weekly insights on product development
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@company.com"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            disabled={subscriptionState === 'subscribing'}
                          />
                        </div>

                        <button
                          onClick={handleSubscribe}
                          disabled={!email || !email.includes('@') || subscriptionState === 'subscribing'}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {subscriptionState === 'subscribing' ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Subscribing...
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4" />
                              Get Free Template
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
                          No spam, unsubscribe anytime. We respect your privacy.
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            4.9/5 from 2,500+ users
                          </span>
                        </div>
                        
                        <blockquote className="text-sm text-gray-600 dark:text-gray-400 italic">
                          "This template saved us weeks of back-and-forth with stakeholders."
                          <footer className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            — Sarah Chen, TechStart Inc.
                          </footer>
                        </blockquote>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsletterGatedResource;