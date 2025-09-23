import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Scale, Users, Globe, Mail, Phone } from 'lucide-react';
import { GlowCard } from '../components/ui/GlowCard';
import { FloatingElements } from '../components/ui/FloatingElements';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: <FileText className="w-6 h-6" />,
    content: `
      <p>By accessing and using DevNest Studios' website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
      <p>If you do not agree to abide by the above, please do not use this service.</p>
    `
  },
  {
    id: 'services',
    title: 'Description of Services',
    icon: <Globe className="w-6 h-6" />,
    content: `
      <p>DevNest Studios provides software development, consulting, and related technology services including:</p>
      <ul>
        <li>Custom software development</li>
        <li>Web and mobile application development</li>
        <li>AI and machine learning solutions</li>
        <li>Technical consulting and advisory services</li>
        <li>Cloud infrastructure and DevOps services</li>
      </ul>
      <p>We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.</p>
    `
  },
  {
    id: 'user-obligations',
    title: 'User Obligations',
    icon: <Users className="w-6 h-6" />,
    content: `
      <p>When using our services, you agree to:</p>
      <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Use our services only for lawful purposes</li>
        <li>Respect intellectual property rights</li>
        <li>Not interfere with or disrupt our services</li>
        <li>Comply with all applicable laws and regulations</li>
      </ul>
    `
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: <Shield className="w-6 h-6" />,
    content: `
      <p>All content, features, and functionality of our services are owned by DevNest Studios and are protected by intellectual property laws.</p>
      <p><strong>Client Work:</strong> Work product created specifically for clients under contract belongs to the client upon full payment, unless otherwise specified in the contract.</p>
      <p><strong>Pre-existing IP:</strong> DevNest Studios retains ownership of pre-existing intellectual property, tools, and methodologies.</p>
      <p><strong>Open Source:</strong> Any open source components used in projects remain subject to their respective licenses.</p>
    `
  },
  {
    id: 'limitations',
    title: 'Limitation of Liability',
    icon: <AlertTriangle className="w-6 h-6" />,
    content: `
      <p>To the maximum extent permitted by law, DevNest Studios shall not be liable for:</p>
      <ul>
        <li>Any indirect, incidental, special, or consequential damages</li>
        <li>Loss of profits, data, or use of our services</li>
        <li>Business interruption or system failures</li>
        <li>Third-party actions or content</li>
      </ul>
      <p>Our total liability shall not exceed the amount paid by you for our services in the 12 months preceding the claim.</p>
    `
  },
  {
    id: 'warranties',
    title: 'Warranties and Disclaimers',
    icon: <Scale className="w-6 h-6" />,
    content: `
      <p>We provide our services "as is" and "as available" without warranties of any kind, either express or implied.</p>
      <p><strong>Professional Services:</strong> We warrant that our services will be performed with reasonable skill and care consistent with industry standards.</p>
      <p><strong>Disclaimers:</strong> We do not warrant that our services will be uninterrupted, error-free, or meet all requirements.</p>
      <p><strong>Third-party Services:</strong> We are not responsible for the performance or availability of third-party services or integrations.</p>
    `
  }
];

export default function Terms() {
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
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              These terms govern your use of our services. Please read them carefully.
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
              <h2 className="text-2xl font-bold mb-4">Agreement Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") constitute a legal agreement between you and DevNest Studios regarding 
                your use of our website, services, and any related software or applications. These Terms apply to all 
                users of our services, including clients, website visitors, and service users. By accessing or using 
                our services, you agree to be bound by these Terms and our Privacy Policy.
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

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Termination</h3>
              <p className="text-muted-foreground text-sm">
                Either party may terminate services with 30 days written notice. Upon termination, 
                you remain liable for all charges incurred and must cease using our services.
              </p>
            </GlowCard>
            
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Governing Law</h3>
              <p className="text-muted-foreground text-sm">
                These Terms are governed by the laws of California, United States. Any disputes 
                will be resolved in the courts of San Francisco County.
              </p>
            </GlowCard>
            
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Modifications</h3>
              <p className="text-muted-foreground text-sm">
                We reserve the right to modify these Terms at any time. We will notify users of 
                material changes via email or website notice at least 30 days in advance.
              </p>
            </GlowCard>
            
            <GlowCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Severability</h3>
              <p className="text-muted-foreground text-sm">
                If any provision of these Terms is found to be unenforceable, the remaining 
                provisions will continue in full force and effect.
              </p>
            </GlowCard>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <h2 className="text-2xl font-bold mb-6">Questions About These Terms?</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">legal@devneststudios.com</div>
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
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
