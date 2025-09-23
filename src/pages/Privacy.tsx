import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Database, Globe, Mail, Phone } from 'lucide-react';
import { GlowCard } from '../components/ui/GlowCard';
import { FloatingElements } from '../components/ui/FloatingElements';

const sections = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    icon: <Database className="w-6 h-6" />,
    content: `
      <p>We collect information you provide directly to us, such as when you:</p>
      <ul>
        <li>Create an account or use our services</li>
        <li>Subscribe to our newsletter</li>
        <li>Contact us for support</li>
        <li>Participate in surveys or promotions</li>
      </ul>
      <p>This may include your name, email address, phone number, company information, and any other information you choose to provide.</p>
    `
  },
  {
    id: 'usage',
    title: 'How We Use Your Information',
    icon: <Eye className="w-6 h-6" />,
    content: `
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and send related information</li>
        <li>Send technical notices and support messages</li>
        <li>Communicate with you about products, services, and events</li>
        <li>Monitor and analyze trends and usage</li>
        <li>Detect and prevent fraudulent transactions</li>
      </ul>
    `
  },
  {
    id: 'sharing',
    title: 'Information Sharing',
    icon: <Users className="w-6 h-6" />,
    content: `
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:</p>
      <ul>
        <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
        <li><strong>Business Transfers:</strong> Information may be transferred in connection with mergers, acquisitions, or other business transactions</li>
        <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
      </ul>
    `
  },
  {
    id: 'security',
    title: 'Data Security',
    icon: <Lock className="w-6 h-6" />,
    content: `
      <p>We implement appropriate technical and organizational measures to protect your personal information against:</p>
      <ul>
        <li>Unauthorized access or disclosure</li>
        <li>Alteration or destruction</li>
        <li>Loss or misuse</li>
      </ul>
      <p>However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
    `
  },
  {
    id: 'rights',
    title: 'Your Rights',
    icon: <Shield className="w-6 h-6" />,
    content: `
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Update or correct your personal information</li>
        <li>Delete your personal information</li>
        <li>Object to or restrict our use of your personal information</li>
        <li>Data portability</li>
      </ul>
      <p>To exercise these rights, please contact us using the information below.</p>
    `
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    icon: <Globe className="w-6 h-6" />,
    content: `
      <p>We use cookies and similar tracking technologies to:</p>
      <ul>
        <li>Remember your preferences and settings</li>
        <li>Analyze website traffic and usage patterns</li>
        <li>Personalize content and advertisements</li>
        <li>Improve our services</li>
      </ul>
      <p>You can control cookies through your browser settings, but some features of our service may not function properly if you disable cookies.</p>
    `
  }
];

export default function Privacy() {
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
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: March 15, 2024 • Effective date: March 15, 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <GlowCard className="p-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                DevNest Studios ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                website, use our services, or interact with us. Please read this privacy policy carefully. If you do not agree 
                with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </GlowCard>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <GlowCard className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-primary">{section.icon}</div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">privacy@devneststudios.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Mailing Address:</strong><br />
                  DevNest Studios<br />
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
