import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import ClientProject from '../models/ClientProject.js';
import Project from '../models/Project.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedClientPortalData = async () => {
  try {
    console.log('🌱 Starting client portal data seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected for seeding');

    // Clear existing data
    await User.deleteMany({ email: { $in: ['demo@client.com', 'admin@devnest.com', 'sarah@devnest.com'] } });
    await ClientProject.deleteMany({});
    console.log('🧹 Cleared existing demo data');

    // Create demo users
    const demoClient = new User({
      name: 'John Doe',
      email: 'demo@client.com',
      password: 'demo123456',
      role: 'user',
      isVerified: true,
      bio: 'Demo client for testing the client portal',
      preferences: {
        theme: 'auto',
        notifications: {
          email: true,
          browser: true
        }
      }
    });

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@devnest.com',
      password: 'admin123456',
      role: 'admin',
      isVerified: true,
      bio: 'Admin user for DevNest Studios'
    });

    const projectManager = new User({
      name: 'Sarah Johnson',
      email: 'sarah@devnest.com',
      password: 'sarah123456',
      role: 'editor',
      isVerified: true,
      bio: 'Senior Project Manager at DevNest Studios'
    });

    await Promise.all([demoClient.save(), adminUser.save(), projectManager.save()]);
    console.log('👥 Created demo users');

    // Create sample projects
    const sampleProject1 = new Project({
      title: 'E-commerce Platform Redesign',
      slug: 'ecommerce-platform-redesign',
      description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX and enhanced performance',
      shortDescription: 'Modern e-commerce platform with enhanced user experience',
      client: {
        name: 'TechCorp Inc.',
        industry: 'Technology',
        location: 'San Francisco, CA',
        website: 'https://techcorp.com'
      },
      techStack: [
        { name: 'React', category: 'frontend', icon: 'react', color: '#61DAFB' },
        { name: 'Node.js', category: 'backend', icon: 'nodejs', color: '#339933' },
        { name: 'MongoDB', category: 'database', icon: 'mongodb', color: '#47A248' },
        { name: 'Stripe', category: 'tools', icon: 'stripe', color: '#008CDD' }
      ],
      category: 'E-commerce',
      status: 'in-progress',
      published: true,
      featured: true
    });

    const sampleProject2 = new Project({
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Cross-platform mobile application for iOS and Android with real-time features',
      shortDescription: 'Cross-platform mobile app with real-time capabilities',
      client: {
        name: 'StartupXYZ',
        industry: 'FinTech',
        location: 'New York, NY',
        website: 'https://startupxyz.com'
      },
      techStack: [
        { name: 'React Native', category: 'frontend', icon: 'react', color: '#61DAFB' },
        { name: 'Firebase', category: 'backend', icon: 'firebase', color: '#FFCA28' },
        { name: 'PostgreSQL', category: 'database', icon: 'postgresql', color: '#336791' }
      ],
      category: 'Mobile App',
      status: 'completed',
      published: true
    });

    await Promise.all([sampleProject1.save(), sampleProject2.save()]);
    console.log('📁 Created sample projects');

    // Create client projects
    const clientProject1 = new ClientProject({
      projectId: sampleProject1._id,
      clientId: demoClient._id,
      title: 'E-commerce Platform Redesign',
      description: 'Complete redesign of your e-commerce platform with modern technologies and enhanced user experience. This project includes mobile responsiveness, performance optimization, and advanced analytics.',
      status: 'in-progress',
      priority: 'high',
      budget: {
        total: 75000,
        currency: 'USD',
        paid: 45000
      },
      timeline: {
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-15'),
        estimatedHours: 800,
        actualHours: 520
      },
      milestones: [
        {
          title: 'Project Discovery & Planning',
          description: 'Initial requirements gathering, technical specifications, and project roadmap',
          dueDate: new Date('2024-02-01'),
          status: 'completed',
          completedAt: new Date('2024-01-28'),
          deliverables: ['Technical Specification Document', 'Project Roadmap', 'Resource Allocation Plan'],
          notes: 'Completed ahead of schedule with comprehensive documentation'
        },
        {
          title: 'UI/UX Design Phase',
          description: 'Create wireframes, mockups, and interactive prototypes',
          dueDate: new Date('2024-02-28'),
          status: 'completed',
          completedAt: new Date('2024-02-25'),
          deliverables: ['Wireframes', 'High-fidelity Mockups', 'Interactive Prototype', 'Design System'],
          notes: 'Client approved all designs with minor revisions'
        },
        {
          title: 'Frontend Development',
          description: 'Develop the user interface with React and modern CSS frameworks',
          dueDate: new Date('2024-03-31'),
          status: 'in-progress',
          deliverables: ['Responsive Web Interface', 'Component Library', 'Performance Optimization'],
          notes: 'Currently 80% complete, on track for early completion'
        },
        {
          title: 'Backend Development',
          description: 'API development, database design, and server setup',
          dueDate: new Date('2024-04-15'),
          status: 'pending',
          deliverables: ['REST API', 'Database Schema', 'Authentication System', 'Payment Integration']
        },
        {
          title: 'Testing & Quality Assurance',
          description: 'Comprehensive testing including unit, integration, and user acceptance testing',
          dueDate: new Date('2024-05-15'),
          status: 'pending',
          deliverables: ['Test Suite', 'Bug Reports', 'Performance Analysis', 'Security Audit']
        },
        {
          title: 'Deployment & Launch',
          description: 'Production deployment and go-live activities',
          dueDate: new Date('2024-06-01'),
          status: 'pending',
          deliverables: ['Production Environment', 'Launch Strategy', 'Monitoring Setup', 'Documentation']
        }
      ],
      team: [
        {
          userId: projectManager._id,
          role: 'project-manager',
          permissions: ['view', 'comment', 'edit', 'manage']
        },
        {
          userId: adminUser._id,
          role: 'developer',
          permissions: ['view', 'comment', 'edit']
        },
        {
          userId: demoClient._id,
          role: 'client',
          permissions: ['view', 'comment', 'approve']
        }
      ],
      communications: [
        {
          type: 'update',
          content: 'Frontend development is progressing well. We have completed the main product catalog and shopping cart functionality. The responsive design is working perfectly across all devices. Next week we will focus on the checkout process and payment integration.',
          author: projectManager._id,
          recipients: [demoClient._id],
          createdAt: new Date('2024-03-20T10:30:00Z')
        },
        {
          type: 'message',
          content: 'Great work on the progress! The new design looks fantastic. I have a few minor suggestions for the product detail page layout. Can we schedule a call to discuss these changes?',
          author: demoClient._id,
          recipients: [projectManager._id],
          createdAt: new Date('2024-03-21T14:15:00Z')
        },
        {
          type: 'meeting',
          content: 'Weekly project review meeting scheduled for Friday at 2 PM PST. We will review the current progress, discuss upcoming milestones, and address any concerns or questions.',
          author: projectManager._id,
          recipients: [demoClient._id, adminUser._id],
          createdAt: new Date('2024-03-22T09:00:00Z')
        }
      ],
      feedback: [
        {
          type: 'milestone',
          content: 'The design phase exceeded our expectations. The team clearly understood our requirements and delivered creative solutions that align perfectly with our brand vision. The interactive prototypes were particularly helpful for visualizing the end result.',
          rating: 5,
          author: demoClient._id,
          status: 'acknowledged',
          createdAt: new Date('2024-02-26T16:30:00Z')
        }
      ],
      analytics: {
        timeTracking: [
          { date: new Date('2024-03-01'), hours: 8, description: 'Frontend setup and initial components', userId: adminUser._id },
          { date: new Date('2024-03-04'), hours: 6, description: 'Product catalog implementation', userId: adminUser._id },
          { date: new Date('2024-03-05'), hours: 7, description: 'Shopping cart functionality', userId: adminUser._id },
          { date: new Date('2024-03-08'), hours: 8, description: 'Responsive design implementation', userId: adminUser._id },
          { date: new Date('2024-03-11'), hours: 5, description: 'Performance optimization', userId: adminUser._id },
          { date: new Date('2024-03-12'), hours: 4, description: 'Bug fixes and testing', userId: adminUser._id },
          { date: new Date('2024-03-15'), hours: 6, description: 'User authentication integration', userId: adminUser._id },
          { date: new Date('2024-03-18'), hours: 7, description: 'Search and filtering features', userId: adminUser._id },
          { date: new Date('2024-03-19'), hours: 5, description: 'Code review and documentation', userId: adminUser._id },
          { date: new Date('2024-03-22'), hours: 8, description: 'API integration preparation', userId: adminUser._id }
        ],
        progressPercentage: 68,
        lastActivity: new Date('2024-03-22T15:45:00Z')
      },
      settings: {
        notifications: {
          email: true,
          browser: true,
          frequency: 'immediate'
        },
        privacy: 'client-visible'
      }
    });

    const clientProject2 = new ClientProject({
      projectId: sampleProject2._id,
      clientId: demoClient._id,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android with real-time messaging, push notifications, and offline capabilities.',
      status: 'review',
      priority: 'medium',
      budget: {
        total: 50000,
        currency: 'USD',
        paid: 50000
      },
      timeline: {
        startDate: new Date('2023-10-01'),
        endDate: new Date('2024-01-31'),
        estimatedHours: 600,
        actualHours: 580
      },
      milestones: [
        {
          title: 'App Architecture & Setup',
          description: 'Project setup, architecture design, and development environment configuration',
          dueDate: new Date('2023-10-15'),
          status: 'completed',
          completedAt: new Date('2023-10-12'),
          deliverables: ['Project Setup', 'Architecture Document', 'Development Environment'],
          notes: 'Clean architecture implemented with proper separation of concerns'
        },
        {
          title: 'Core Features Development',
          description: 'User authentication, profile management, and basic app functionality',
          dueDate: new Date('2023-11-15'),
          status: 'completed',
          completedAt: new Date('2023-11-10'),
          deliverables: ['Authentication System', 'User Profiles', 'Core Navigation'],
          notes: 'All core features implemented with excellent performance'
        },
        {
          title: 'Advanced Features',
          description: 'Real-time messaging, push notifications, and offline functionality',
          dueDate: new Date('2023-12-15'),
          status: 'completed',
          completedAt: new Date('2023-12-14'),
          deliverables: ['Real-time Chat', 'Push Notifications', 'Offline Mode'],
          notes: 'Advanced features working seamlessly across both platforms'
        },
        {
          title: 'Testing & Optimization',
          description: 'Comprehensive testing and performance optimization',
          dueDate: new Date('2024-01-15'),
          status: 'completed',
          completedAt: new Date('2024-01-12'),
          deliverables: ['Test Suite', 'Performance Report', 'Bug Fixes'],
          notes: 'App performance exceeds expectations on all target devices'
        },
        {
          title: 'App Store Submission',
          description: 'Prepare and submit apps to iOS App Store and Google Play Store',
          dueDate: new Date('2024-01-31'),
          status: 'completed',
          completedAt: new Date('2024-01-28'),
          deliverables: ['iOS App Submission', 'Android App Submission', 'Store Listings'],
          notes: 'Successfully submitted to both app stores, pending final approval'
        }
      ],
      team: [
        {
          userId: projectManager._id,
          role: 'project-manager',
          permissions: ['view', 'comment', 'edit', 'manage']
        },
        {
          userId: adminUser._id,
          role: 'developer',
          permissions: ['view', 'comment', 'edit']
        },
        {
          userId: demoClient._id,
          role: 'client',
          permissions: ['view', 'comment', 'approve']
        }
      ],
      communications: [
        {
          type: 'update',
          content: 'Mobile app development has been completed successfully! Both iOS and Android versions are ready for final review. The app has been submitted to both app stores and we are awaiting final approval. All requested features have been implemented and tested.',
          author: projectManager._id,
          recipients: [demoClient._id],
          createdAt: new Date('2024-01-28T11:00:00Z')
        },
        {
          type: 'message',
          content: 'Fantastic work! The app looks and works better than expected. We are very pleased with the quality and performance. Looking forward to the app store approval and launch.',
          author: demoClient._id,
          recipients: [projectManager._id],
          createdAt: new Date('2024-01-29T09:30:00Z')
        }
      ],
      feedback: [
        {
          type: 'general',
          content: 'Outstanding project delivery! The DevNest team demonstrated exceptional technical expertise and project management skills. The mobile app exceeded our expectations in terms of functionality, performance, and user experience. Highly recommended!',
          rating: 5,
          author: demoClient._id,
          status: 'acknowledged',
          createdAt: new Date('2024-01-30T14:00:00Z')
        }
      ],
      analytics: {
        timeTracking: [
          { date: new Date('2023-10-05'), hours: 8, description: 'Project setup and environment configuration', userId: adminUser._id },
          { date: new Date('2023-10-12'), hours: 8, description: 'Authentication system implementation', userId: adminUser._id },
          { date: new Date('2023-10-19'), hours: 8, description: 'User interface development', userId: adminUser._id },
          { date: new Date('2023-11-02'), hours: 8, description: 'Real-time messaging implementation', userId: adminUser._id },
          { date: new Date('2023-11-09'), hours: 8, description: 'Push notification setup', userId: adminUser._id },
          { date: new Date('2023-11-16'), hours: 8, description: 'Offline functionality development', userId: adminUser._id },
          { date: new Date('2023-12-07'), hours: 8, description: 'Performance optimization', userId: adminUser._id },
          { date: new Date('2023-12-14'), hours: 8, description: 'Cross-platform testing', userId: adminUser._id },
          { date: new Date('2024-01-11'), hours: 8, description: 'Final bug fixes and polish', userId: adminUser._id },
          { date: new Date('2024-01-25'), hours: 4, description: 'App store submission preparation', userId: adminUser._id }
        ],
        progressPercentage: 100,
        lastActivity: new Date('2024-01-30T14:00:00Z')
      },
      settings: {
        notifications: {
          email: true,
          browser: true,
          frequency: 'daily'
        },
        privacy: 'client-visible'
      }
    });

    await Promise.all([clientProject1.save(), clientProject2.save()]);
    console.log('🚀 Created client projects with comprehensive data');

    console.log('\n✅ Client portal data seeding completed successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('   Client: demo@client.com / demo123456');
    console.log('   Admin:  admin@devnest.com / admin123456');
    console.log('   PM:     sarah@devnest.com / sarah123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding client portal data:', error);
    process.exit(1);
  }
};

// Run the seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedClientPortalData();
}

export default seedClientPortalData;