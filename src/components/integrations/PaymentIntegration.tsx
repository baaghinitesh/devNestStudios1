import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Shield,
  Check,
  AlertTriangle,
  Loader2,
  Lock,
  Globe,
  Smartphone
} from 'lucide-react';

interface PaymentProvider {
  id: 'stripe' | 'payu';
  name: string;
  logo: string;
  description: string;
  regions: string[];
  fees: string;
  features: string[];
  setupComplexity: 'Easy' | 'Medium' | 'Advanced';
}

interface PaymentIntegrationProps {
  onProviderSelect?: (provider: PaymentProvider) => void;
  selectedProvider?: 'stripe' | 'payu';
  showDemo?: boolean;
}

const PaymentIntegration: React.FC<PaymentIntegrationProps> = ({
  onProviderSelect,
  selectedProvider,
  showDemo = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [demoPayment, setDemoPayment] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const paymentProviders: PaymentProvider[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      logo: '💳',
      description: 'Global payment processing with excellent developer experience',
      regions: ['Global', 'US', 'EU', 'Asia-Pacific'],
      fees: '2.9% + 30¢ per transaction',
      features: [
        'Accept 135+ currencies',
        'Built-in fraud protection',
        'Subscription billing',
        'Mobile payments (Apple Pay, Google Pay)',
        'Comprehensive API documentation',
        'Real-time webhooks'
      ],
      setupComplexity: 'Easy'
    },
    {
      id: 'payu',
      name: 'PayU',
      logo: '🇮🇳',
      description: 'Leading payment gateway for India and emerging markets',
      regions: ['India', 'Poland', 'Romania', 'Turkey', 'Latin America'],
      fees: '2.0% + ₹2 per transaction (India)',
      features: [
        'UPI, Net Banking, Wallets',
        'EMI and Buy Now Pay Later',
        'Local payment methods',
        'Risk management suite',
        'Easy checkout experience',
        'Multi-currency support'
      ],
      setupComplexity: 'Medium'
    }
  ];

  const handleProviderSelection = (provider: PaymentProvider) => {
    setIsLoading(true);
    
    // Simulate API call to configure payment provider
    setTimeout(() => {
      setIsLoading(false);
      onProviderSelect?.(provider);
      
      // Track gamified action
      if ((window as any).trackGamifiedAction) {
        (window as any).trackGamifiedAction('payment_integration_setup');
      }
    }, 2000);
  };

  const runPaymentDemo = (providerId: 'stripe' | 'payu') => {
    setDemoPayment('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo
      setDemoPayment(success ? 'success' : 'error');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setDemoPayment('idle');
      }, 3000);
    }, 2500);
  };

  const getSetupSteps = (provider: PaymentProvider) => {
    if (provider.id === 'stripe') {
      return [
        'Create Stripe account and get API keys',
        'Install Stripe SDK in your project',
        'Configure webhook endpoints',
        'Set up payment forms and checkout',
        'Test with Stripe test cards',
        'Go live with real transactions'
      ];
    } else {
      return [
        'Register with PayU and get merchant credentials',
        'Integrate PayU SDK or API',
        'Configure payment methods (UPI, cards, wallets)',
        'Set up success/failure URLs',
        'Test with PayU test environment',
        'Complete KYC and go live'
      ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Integration
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose the best payment provider for your project's needs
        </p>
      </div>

      {/* Provider Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paymentProviders.map((provider) => (
          <motion.div
            key={provider.id}
            className={`border-2 rounded-xl p-6 transition-all duration-300 ${
              selectedProvider === provider.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            layout
          >
            {/* Provider Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{provider.logo}</div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {provider.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {provider.description}
                </p>
              </div>
            </div>

            {/* Key Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Regions: {provider.regions.join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Fees: {provider.fees}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Setup: {provider.setupComplexity}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h5>
              <div className="space-y-1">
                {provider.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
                {provider.features.length > 4 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 ml-5">
                    +{provider.features.length - 4} more features
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => handleProviderSelection(provider)}
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Setting up...
                  </>
                ) : selectedProvider === provider.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Selected
                  </>
                ) : (
                  `Choose ${provider.name}`
                )}
              </button>

              {showDemo && (
                <button
                  onClick={() => runPaymentDemo(provider.id)}
                  disabled={demoPayment === 'processing'}
                  className="w-full py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {demoPayment === 'processing' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Demo Payment...
                    </>
                  ) : demoPayment === 'success' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Demo Payment Successful!
                    </>
                  ) : demoPayment === 'error' ? (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      Demo Payment Failed
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      Try Demo Payment
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Setup Guide */}
      {selectedProvider && (
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Setup Guide for {paymentProviders.find(p => p.id === selectedProvider)?.name}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Setup Steps:</h5>
              <div className="space-y-2">
                {getSetupSteps(paymentProviders.find(p => p.id === selectedProvider)!).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">What We'll Handle:</h5>
              <div className="space-y-2">
                {[
                  'Complete integration setup',
                  'Security and compliance implementation',
                  'Custom payment flow design',
                  'Testing and quality assurance',
                  'Production deployment',
                  'Ongoing maintenance and support'
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h6 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Ready to Integrate?
                </h6>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Our team will handle the complete payment integration setup for your project. 
                  This includes security compliance, testing, and production deployment.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentIntegration;