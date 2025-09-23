import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, Map } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlowCard } from '../components/ui/GlowCard';
import { FloatingElements } from '../components/ui/FloatingElements';

const popularPages = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Services', path: '/services', icon: '⚡' },
  { name: 'Projects', path: '/projects', icon: '💼' },
  { name: 'About Us', path: '/about', icon: '👥' },
  { name: 'Blog', path: '/blog', icon: '📝' },
  { name: 'Contact', path: '/contact', icon: '📞' }
];

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <FloatingElements />
      
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Animated 404 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-none">
              404
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              But don't worry, we can help you find your way back.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
              <Map className="w-5 h-5" />
              Popular Pages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularPages.map((page, index) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <GlowCard 
                    className="p-4 cursor-pointer group hover:scale-105 transition-transform"
                    onClick={() => navigate(page.path)}
                  >
                    <div className="text-2xl mb-2">{page.icon}</div>
                    <div className="text-sm font-medium group-hover:text-primary transition-colors">
                      {page.name}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12"
          >
            <div className="text-4xl">🚀</div>
            <p className="text-sm text-muted-foreground mt-2">
              While you're here, our rockets are still launching amazing projects!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
