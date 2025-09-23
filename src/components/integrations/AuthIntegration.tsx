import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Key,
  Smartphone,
  Globe,
  Check,
  Settings,
  Zap,
  Lock,
  UserCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface AuthProvider {
  id: 'auth0' | 'clerk';
  name: string;
  logo: string;
  description: string;
  pricing: {
    free: string;
    paid: string;
  };
  features: string[];
  bestFor: string[];
  setupTime: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface AuthIntegrationProps {
  onProviderSelect?: (provider: AuthProvider) => void;
  selectedProvider?: 'auth0' | 'clerk';
  showDemo?: boolean;
}

const AuthIntegration: React.FC<AuthIntegrationProps> = ({
  onProviderSelect,
  selectedProvider,
  showDemo = false
}) => {
  const [demoAuth, setDemoAuth] = useState<'idle' | 'signing-up' | 'logging-in' | 'success'>('idle');

  const authProviders: AuthProvider[] = [
    {
      id: 'auth0',
      name: 'Auth0',
      logo: '🔐',
      description: 'Enterprise-grade authentication platform with extensive customization',
      pricing: {
        free: '7,000 free active users',
        paid: 'Starting at $23/month'
      },
      features: [
        'Universal Login with customizable UI',
        'Multi-factor authentication (MFA)',
        'Social login (Google, GitHub, etc.)',
        'Enterprise SSO (SAML, OIDC)',
        'Advanced user management',
        'Detailed analytics and logs',
        'Passwordless authentication',
        'Role-based access control (RBAC)'
      ],
      bestFor: [
        'Enterprise applications',
        'Complex user management needs',
        'High security requirements',
        'Multiple authentication methods'
      ],
      setupTime: '2-4 hours',
      complexity: 'Intermediate'
    },
    {
      id: 'clerk',
      name: 'Clerk',
      logo: '⚡',
      description: 'Modern authentication with beautiful pre-built UI components',
      pricing: {
        free: '10,000 monthly active users',
        paid: 'Starting at $25/month'
      },
      features: [
        'Pre-built authentication components',
        'Customizable sign-up/sign-in flows',
        'Social authentication',
        'Multi-factor authentication',
        'Session management',
        'User profiles and organizations',
        'Webhooks and API access',
        'Real-time user presence'
      ],
      bestFor: [
        'Modern web applications',
        'Rapid development',
        'Beautiful user experience',
        'Developer-friendly setup'
      ],
      setupTime: '30 minutes - 2 hours',
      complexity: 'Beginner'
    }
  ];

  const handleProviderSelection = (provider: AuthProvider) => {
    onProviderSelect?.(provider);
    
    // Track gamified action
    if ((window as any).trackGamifiedAction) {
      (window as any).trackGamifiedAction('auth_integration_setup');
    }
  };

  const runAuthDemo = (type: 'signup' | 'login') => {
    setDemoAuth(type === 'signup' ? 'signing-up' : 'logging-in');
    
    // Simulate authentication process
    setTimeout(() => {
      setDemoAuth('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setDemoAuth('idle');
      }, 3000);
    }, 2000);
  };

  const getAuthFlow = (provider: AuthProvider) => {
    const baseFlow = [
      'User clicks "Sign Up" or "Login"',
      'Authentication form appears',
      'User enters credentials or chooses social login',
      'Authentication provider validates credentials',
      'User is redirected back to your app',
      'Session is established and user data is available'
    ];

    if (provider.id === 'auth0') {
      return [
        ...baseFlow,
        'Auth0 Rules and Hooks can modify the flow',
        'User metadata and roles are applied',
        'Analytics and security events are logged'
      ];
    } else {
      return [
        ...baseFlow,
        'Clerk components handle UI automatically',
        'User profile and organization data synced',
        'Real-time session updates across tabs'
      ];
    }
  };

  const getIntegrationCode = (provider: AuthProvider) => {
    if (provider.id === 'auth0') {
      return `// Auth0 React Setup
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain="your-domain.auth0.com"
      clientId="your-client-id"
      redirectUri={window.location.origin}
    >
      <MyApp />
    </Auth0Provider>
  );
}

// Login Button
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};`;
    } else {
      return `// Clerk React Setup
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {
  return (
    <ClerkProvider publishableKey="your-publishable-key">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </ClerkProvider>
  );
}

// Pre-built Components
import { SignInButton, UserButton } from '@clerk/clerk-react';`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Authentication Integration
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Secure user authentication and management for your application
        </p>
      </div>

      {/* Provider Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {authProviders.map((provider) => (
          <motion.div
            key={provider.id}
            className={`border-2 rounded-xl p-6 transition-all duration-300 ${
              selectedProvider === provider.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
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

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Free Tier</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {provider.pricing.free}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Setup Time</span>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {provider.setupTime}
                </div>
              </div>
            </div>

            {/* Complexity & Pricing */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className={`w-4 h-4 ${
                  provider.complexity === 'Beginner' ? 'text-green-500' : 
                  provider.complexity === 'Intermediate' ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {provider.complexity}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {provider.pricing.paid}
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h5>
              <div className="space-y-1">
                {provider.features.slice(0, 5).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
                {provider.features.length > 5 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 ml-5">
                    +{provider.features.length - 5} more features
                  </div>
                )}
              </div>
            </div>

            {/* Best For */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Best For:</h5>
              <div className="flex flex-wrap gap-2">
                {provider.bestFor.map((use, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => handleProviderSelection(provider)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                } flex items-center justify-center gap-2`}
              >
                {selectedProvider === provider.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Selected
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Choose {provider.name}
                  </>
                )}
              </button>

              {showDemo && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => runAuthDemo('signup')}
                    disabled={demoAuth !== 'idle'}
                    className="py-2 px-3 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    {demoAuth === 'signing-up' ? (
                      <>
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                        Signing Up...
                      </>
                    ) : demoAuth === 'success' ? (
                      <>
                        <Check className="w-3 h-3" />
                        Success!
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3 h-3" />
                        Demo Signup
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => runAuthDemo('login')}
                    disabled={demoAuth !== 'idle'}
                    className="py-2 px-3 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    {demoAuth === 'logging-in' ? (
                      <>
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                        Logging In...
                      </>
                    ) : demoAuth === 'success' ? (
                      <>
                        <Check className="w-3 h-3" />
                        Success!
                      </>
                    ) : (
                      <>
                        <Key className="w-3 h-3" />
                        Demo Login
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Setup Guide */}
      {selectedProvider && (
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {authProviders.find(p => p.id === selectedProvider)?.name} Integration Guide
            </h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Authentication Flow */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Authentication Flow:</h5>
              <div className="space-y-2">
                {getAuthFlow(authProviders.find(p => p.id === selectedProvider)!).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Code Example */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Integration Code:</h5>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                {getIntegrationCode(authProviders.find(p => p.id === selectedProvider)!)}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h6 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Complete Authentication Setup Included
                </h6>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  We'll handle the entire authentication integration, including security best practices,
                  user management, and custom styling to match your brand.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                    <Check className="w-3 h-3" />
                    Secure setup
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                    <Check className="w-3 h-3" />
                    Custom styling
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                    <Check className="w-3 h-3" />
                    User management
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                    <Check className="w-3 h-3" />
                    Testing & deployment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AuthIntegration;