import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Heart, 
  Lightbulb, 
  Shield, 
  Target, 
  Users, 
  Zap, 
  Award, 
  MapPin, 
  Calendar, 
  Briefcase,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Code,
  Palette,
  Database,
  Smartphone,
  TrendingUp,
  Coffee
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlowCard } from '../components/ui/GlowCard';
import { FloatingElements } from '../components/ui/FloatingElements';
import { CounterAnimation } from '../components/ui/CounterAnimation';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  yearsExperience: number;
  projectsCompleted: number;
}

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  milestone: string;
  type: 'founding' | 'growth' | 'achievement' | 'expansion';
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'CEO & Full-Stack Architect',
    bio: 'Visionary leader with 10+ years in software architecture. Passionate about building scalable solutions that make a real impact.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    skills: ['Leadership', 'Architecture', 'Strategy', 'Full-Stack Development'],
    social: {
      linkedin: 'https://linkedin.com/in/alexrivera',
      twitter: 'https://twitter.com/alexrivera',
      email: 'alex@devneststudios.com'
    },
    yearsExperience: 12,
    projectsCompleted: 45
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'CTO & AI Research Lead',
    bio: 'Former Google AI researcher specializing in machine learning and computer vision. Drives our AI innovation initiatives.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    skills: ['AI/ML', 'Research', 'Python', 'TensorFlow'],
    social: {
      github: 'https://github.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
      email: 'sarah@devneststudios.com'
    },
    yearsExperience: 8,
    projectsCompleted: 32
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    role: 'Lead Frontend Engineer',
    bio: 'UI/UX perfectionist who creates stunning, accessible interfaces. Expert in modern React and design systems.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    skills: ['React', 'TypeScript', 'Design Systems', 'Animation'],
    social: {
      github: 'https://github.com/marcusjohnson',
      twitter: 'https://twitter.com/marcusjohnson',
      email: 'marcus@devneststudios.com'
    },
    yearsExperience: 6,
    projectsCompleted: 28
  },
  {
    id: '4',
    name: 'Priya Patel',
    role: 'Senior Backend Engineer',
    bio: 'Database optimization wizard and API architect. Ensures our systems can scale to millions of users seamlessly.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Microservices'],
    social: {
      github: 'https://github.com/priyapatel',
      linkedin: 'https://linkedin.com/in/priyapatel',
      email: 'priya@devneststudios.com'
    },
    yearsExperience: 7,
    projectsCompleted: 35
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Mobile Development Lead',
    bio: 'Cross-platform mobile expert with a passion for creating smooth, intuitive mobile experiences.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    social: {
      github: 'https://github.com/davidkim',
      linkedin: 'https://linkedin.com/in/davidkim',
      email: 'david@devneststudios.com'
    },
    yearsExperience: 5,
    projectsCompleted: 22
  },
  {
    id: '6',
    name: 'Elena Rodriguez',
    role: 'UX/UI Design Director',
    bio: 'Award-winning designer who transforms complex problems into beautiful, user-friendly solutions.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    social: {
      linkedin: 'https://linkedin.com/in/elenarodriguez',
      twitter: 'https://twitter.com/elenarodriguez',
      email: 'elena@devneststudios.com'
    },
    yearsExperience: 9,
    projectsCompleted: 40
  }
];

const companyValues: CompanyValue[] = [
  {
    id: '1',
    title: 'Innovation First',
    description: 'We push boundaries and embrace cutting-edge technologies to deliver revolutionary solutions.',
    icon: <Lightbulb className="w-8 h-8" />,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: '2',
    title: 'Client-Centric',
    description: 'Every decision is made with our clients\' success and satisfaction as the top priority.',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-red-400 to-pink-500'
  },
  {
    id: '3',
    title: 'Quality & Security',
    description: 'We maintain the highest standards in code quality, security, and reliability.',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: '4',
    title: 'Transparent Partnership',
    description: 'Open communication and honest collaboration build lasting partnerships.',
    icon: <Users className="w-8 h-8" />,
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: '5',
    title: 'Continuous Growth',
    description: 'We invest in learning, improvement, and staying ahead of industry trends.',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: '6',
    title: 'Impactful Solutions',
    description: 'Every project should create meaningful value and positive change.',
    icon: <Target className="w-8 h-8" />,
    color: 'from-teal-400 to-blue-500'
  }
];

const timeline: TimelineEvent[] = [
  {
    id: '1',
    year: '2020',
    title: 'DevNest Studios Founded',
    description: 'Started with a vision to bridge the gap between innovative ideas and exceptional digital products.',
    milestone: 'Company Launch',
    type: 'founding'
  },
  {
    id: '2',
    year: '2020',
    title: 'First Major Client',
    description: 'Delivered our first enterprise solution, setting the foundation for our reputation in quality development.',
    milestone: '5 Projects Completed',
    type: 'growth'
  },
  {
    id: '3',
    year: '2021',
    title: 'AI Division Launch',
    description: 'Expanded into artificial intelligence and machine learning solutions with dedicated research team.',
    milestone: 'AI/ML Specialization',
    type: 'expansion'
  },
  {
    id: '4',
    year: '2021',
    title: 'Industry Recognition',
    description: 'Won "Best Software Development Agency" award from Tech Innovation Awards.',
    milestone: 'First Industry Award',
    type: 'achievement'
  },
  {
    id: '5',
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened international offices and started serving clients across 15 countries.',
    milestone: '50+ Projects Delivered',
    type: 'expansion'
  },
  {
    id: '6',
    year: '2022',
    title: 'Blockchain Integration',
    description: 'Pioneered Web3 and blockchain solutions for next-generation decentralized applications.',
    milestone: 'Web3 Innovation',
    type: 'expansion'
  },
  {
    id: '7',
    year: '2023',
    title: 'Sustainability Initiative',
    description: 'Launched green coding practices and carbon-neutral development processes.',
    milestone: 'Environmental Leadership',
    type: 'achievement'
  },
  {
    id: '8',
    year: '2024',
    title: 'Century of Projects',
    description: 'Reached the milestone of 100 successful project deliveries with 98% client satisfaction.',
    milestone: '100 Projects Milestone',
    type: 'achievement'
  }
];

// Helper function to get examples for each value
const getValueExample = (valueId: string): string => {
  const examples = {
    '1': 'We pioneered AI-driven solutions that increased client efficiency by 300%',
    '2': 'Our 98% client retention rate speaks to our commitment to your success',
    '3': 'Zero security breaches in 4+ years with enterprise-grade protection',
    '4': 'Weekly updates and real-time collaboration keep you always informed',
    '5': 'Our team completes 40+ hours of learning monthly to stay cutting-edge',
    '6': 'Every project delivers measurable ROI and transformative business value'
  };
  return examples[valueId as keyof typeof examples] || '';
};

const ValuesWheel: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.2);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleValueClick = (valueId: string) => {
    if (selectedValue === valueId) {
      setSelectedValue(null);
      setIsModalOpen(false);
    } else {
      setSelectedValue(valueId);
      setIsModalOpen(true);
    }
  };

  const selectedValueData = companyValues.find(v => v.id === selectedValue);

  return (
    <div className="relative">
      <div className="relative w-96 h-96 mx-auto">
        {/* Central Hub with glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative"
            animate={{ rotate: rotation }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-50 animate-pulse" />
            
            {/* Main hub */}
            <div className="relative w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      
        {/* Values positioned in circle */}
        {companyValues.map((value, index) => {
          const angle = (index * 60) - 90; // 360/6 = 60 degrees apart
          const radian = (angle * Math.PI) / 180;
          const radius = 150;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          const isSelected = selectedValue === value.id;
          
          return (
            <motion.div
              key={value.id}
              className="absolute w-16 h-16 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px - 32px)`,
                top: `calc(50% + ${y}px - 32px)`,
              }}
              animate={{
                rotate: rotation * (isSelected ? -2 : 1),
                scale: isSelected ? 1.3 : 1,
              }}
              whileHover={{ 
                scale: isSelected ? 1.4 : 1.2,
                rotate: rotation + (isSelected ? 180 : 45)
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleValueClick(value.id)}
            >
              <div className="relative">
                {/* Outer glow for selected */}
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-full blur-md opacity-60 scale-125 animate-pulse`} />
                )}
                
                {/* Main value circle */}
                <div className={`relative w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-white shadow-xl border-4 ${isSelected ? 'border-white' : 'border-white/20'} transition-all duration-300`}>
                  {React.cloneElement(value.icon as React.ReactElement, {
                    className: 'w-8 h-8 transition-all duration-300'
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Animated Modal for Selected Value */}
      {isModalOpen && selectedValueData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="mt-12"
        >
          <GlowCard className="p-8 max-w-md mx-auto relative overflow-hidden">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedValueData.color} opacity-10`} />
            
            <div className="relative z-10">
              {/* Header with icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedValueData.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                  {React.cloneElement(selectedValueData.icon as React.ReactElement, {
                    className: 'w-8 h-8'
                  })}
                </div>
                <h3 className="text-2xl font-bold">{selectedValueData.title}</h3>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedValueData.description}
              </p>
              
              {/* Example/Impact statement */}
              <div className={`p-4 rounded-lg bg-gradient-to-r ${selectedValueData.color} bg-opacity-10 border border-current/20`}>
                <p className="text-sm font-medium">
                  <span className="text-primary">Impact:</span> {getValueExample(selectedValueData.id)}
                </p>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedValue(null);
                  setIsModalOpen(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 bg-muted/10 hover:bg-muted/20 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
          </GlowCard>
        </motion.div>
      )}
    </div>
  );
};

export default function About() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  
  const stats = [
    { value: 100, label: 'Projects Completed', suffix: '+', icon: <Briefcase className="w-6 h-6" /> },
    { value: 50, label: 'Happy Clients', suffix: '+', icon: <Heart className="w-6 h-6" /> },
    { value: 15, label: 'Countries Served', suffix: '+', icon: <Globe className="w-6 h-6" /> },
    { value: 98, label: 'Client Satisfaction', suffix: '%', icon: <Award className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen pt-16">
      <FloatingElements />
      
      {/* Hero Section with Mission/Vision/Tagline */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              About DevNest
            </h1>
            
            {/* Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-accent mb-12"
            >
              "Nurturing Ideas, Delivering Excellence"
            </motion.p>
            
            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <GlowCard className="p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower businesses and individuals by transforming innovative ideas into 
                    exceptional digital solutions that drive growth, enhance user experiences, 
                    and create lasting impact in the digital landscape.
                  </p>
                </GlowCard>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <GlowCard className="p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-8 h-8 text-accent" />
                    <h2 className="text-2xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be the leading technology partner that bridges the gap between 
                    imagination and reality, fostering a world where innovative digital 
                    solutions enhance human potential and business success.
                  </p>
                </GlowCard>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Global Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Founded 2020</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-accent" />
                <span>Fueled by Innovation</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section ref={statsRef} className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <GlowCard className="p-6 h-full">
                  <div className="text-primary mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {isStatsInView && (
                      <CounterAnimation 
                        end={stat.value} 
                        duration={2000}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Wheel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from client relationships to code quality
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <ValuesWheel />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Talented individuals who bring diverse expertise and shared passion for excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard className="group overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm opacity-90">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-secondary/20 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        {member.social.github && (
                          <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.email && (
                          <a href={`mailto:${member.social.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.yearsExperience}y exp • {member.projectsCompleted} projects
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey - New Modern Design */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-4">
              <span className="px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full text-sm font-medium border border-primary/20">
                ✨ Our Story
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every great story has its moments. Here are the milestones that transformed our vision into reality,
              one breakthrough at a time.
            </p>
          </motion.div>

          {/* Interactive Journey Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;
              const getEventIcon = (type: string) => {
                switch (type) {
                  case 'founding': return <Coffee className="w-6 h-6" />;
                  case 'growth': return <TrendingUp className="w-6 h-6" />;
                  case 'achievement': return <Award className="w-6 h-6" />;
                  case 'expansion': return <Globe className="w-6 h-6" />;
                  default: return <Zap className="w-6 h-6" />;
                }
              };
              
              const getEventColor = (type: string) => {
                switch (type) {
                  case 'founding': return 'from-emerald-500 to-green-600';
                  case 'growth': return 'from-blue-500 to-cyan-600';
                  case 'achievement': return 'from-yellow-500 to-orange-600';
                  case 'expansion': return 'from-purple-500 to-indigo-600';
                  default: return 'from-primary to-accent';
                }
              };

              return (
                <motion.div
                  key={event.id}
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? -60 : 60,
                    rotateY: isEven ? -20 : 20
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: 0
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer"
                >
                  <GlowCard className="p-8 h-full relative overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-sm">
                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
                    </div>
                    
                    {/* Floating Year Badge */}
                    <motion.div 
                      className="absolute -top-4 -right-4"
                      animate={{
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className={`w-20 h-20 bg-gradient-to-r ${getEventColor(event.type)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl border-4 border-white/20`}>
                        {event.year}
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Type */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div 
                          className={`p-3 bg-gradient-to-r ${getEventColor(event.type)} rounded-xl text-white shadow-lg`}
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.2
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          {getEventIcon(event.type)}
                        </motion.div>
                        <div>
                          <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                            {event.type.replace('_', ' ')}
                          </span>
                          <div className="text-sm font-medium text-primary mt-1">
                            {event.milestone}
                          </div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {event.description}
                      </p>
                      
                      {/* Interactive Element */}
                      <motion.div 
                        className="flex items-center text-sm font-medium text-primary group-hover:gap-3 gap-2 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span>Learn more</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                          }}
                        >
                          →
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
          
          {/* Journey Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-8 p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-center">
                <CounterAnimation end={4} className="text-3xl font-bold text-primary" />+
                <div className="text-sm text-muted-foreground mt-1">Years Strong</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="text-center">
                <CounterAnimation end={150} className="text-3xl font-bold text-accent" />+
                <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="text-center">
                <CounterAnimation end={15} className="text-3xl font-bold text-secondary" />+
                <div className="text-sm text-muted-foreground mt-1">Countries Served</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our team can help bring your vision to life with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Get In Touch
              </Button>
              <Button size="lg" variant="outline">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}