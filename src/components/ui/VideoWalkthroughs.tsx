import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Clock,
  User,
  Eye,
  ThumbsUp,
  Download,
  BookOpen,
  Users,
  Target,
  TrendingUp,
  X,
  Cog
} from 'lucide-react';
import { Button } from './Button';
import { GlowCard } from './GlowCard';

interface VideoWalkthrough {
  id: string;
  title: string;
  description: string;
  category: 'service-overview' | 'process-demo' | 'case-study' | 'tutorial' | 'client-testimonial';
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  instructor?: string;
  views: number;
  likes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  relatedService?: string;
  publishDate: string;
  transcript?: string;
  resources?: { title: string; url: string; type: 'download' | 'link' }[];
}

interface VideoPlayerProps {
  video: VideoWalkthrough;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            poster={video.thumbnailUrl}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Play/Pause Center Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                  >
                    {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
                  </Button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={togglePlay}
                        className="text-white hover:bg-white/10"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => skip(-10)}
                        className="text-white hover:bg-white/10"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => skip(10)}
                        className="text-white hover:bg-white/10"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/10"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>

                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10"
                      >
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video Info */}
        <div className="mt-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
          <p className="text-gray-300 mb-4">{video.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {video.duration}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {video.views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {video.likes.toLocaleString()} likes
            </div>
            {video.instructor && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {video.instructor}
              </div>
            )}
          </div>

          {video.resources && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Resources</h3>
              <div className="flex flex-wrap gap-2">
                {video.resources.map((resource, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    {resource.type === 'download' ? <Download className="w-4 h-4 mr-1" /> : <BookOpen className="w-4 h-4 mr-1" />}
                    {resource.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VideoWalkthroughs: React.FC = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoWalkthrough | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Videos', icon: BookOpen },
    { id: 'service-overview', name: 'Service Overviews', icon: Target },
    { id: 'process-demo', name: 'Process Demos', icon: Cog },
    { id: 'case-study', name: 'Case Studies', icon: TrendingUp },
    { id: 'tutorial', name: 'Tutorials', icon: BookOpen },
    { id: 'client-testimonial', name: 'Testimonials', icon: Users }
  ];

  const videoWalkthroughs: VideoWalkthrough[] = [
    {
      id: 'product-strategy-overview',
      title: 'Product Strategy & Discovery Process',
      description: 'Complete walkthrough of our proven product strategy methodology, from initial concept to market-ready roadmap.',
      category: 'service-overview',
      duration: '12:45',
      thumbnailUrl: '/api/placeholder/800/450',
      videoUrl: '/videos/product-strategy-demo.mp4',
      instructor: 'Sarah Chen, Product Strategist',
      views: 3420,
      likes: 287,
      difficulty: 'Beginner',
      tags: ['Product Strategy', 'Market Research', 'Business Planning'],
      relatedService: 'product-strategy',
      publishDate: '2024-01-15',
      resources: [
        { title: 'Strategy Template', url: '/resources/strategy-template.pdf', type: 'download' },
        { title: 'Market Research Guide', url: '/guides/market-research', type: 'link' }
      ]
    },
    {
      id: 'ux-design-process',
      title: 'UX Design Process: From Research to Prototype',
      description: 'Step-by-step demonstration of our UX design methodology, including user research, wireframing, and prototyping.',
      category: 'process-demo',
      duration: '18:20',
      thumbnailUrl: '/api/placeholder/800/450',
      videoUrl: '/videos/ux-design-process.mp4',
      instructor: 'Alex Rivera, UX Director',
      views: 5630,
      likes: 445,
      difficulty: 'Intermediate',
      tags: ['UX Design', 'User Research', 'Prototyping', 'Figma'],
      relatedService: 'ux-ui-prototyping',
      publishDate: '2024-01-10',
      resources: [
        { title: 'UX Toolkit', url: '/resources/ux-toolkit.zip', type: 'download' },
        { title: 'Design System Template', url: '/resources/design-system', type: 'download' }
      ]
    },
    {
      id: 'react-development-workflow',
      title: 'Modern React Development Workflow',
      description: 'Complete development workflow for building scalable React applications with TypeScript, testing, and deployment.',
      category: 'tutorial',
      duration: '25:15',
      thumbnailUrl: '/api/placeholder/800/450',
      videoUrl: '/videos/react-workflow.mp4',
      instructor: 'Marcus Thompson, Lead Developer',
      views: 8900,
      likes: 670,
      difficulty: 'Advanced',
      tags: ['React', 'TypeScript', 'Testing', 'CI/CD', 'Next.js'],
      relatedService: 'web-development',
      publishDate: '2024-01-05',
      resources: [
        { title: 'Starter Template', url: '/resources/react-starter.zip', type: 'download' },
        { title: 'Best Practices Guide', url: '/guides/react-best-practices', type: 'link' }
      ]
    },
    {
      id: 'fintech-case-study',
      title: 'FinTech App Case Study: From Concept to Launch',
      description: 'Complete case study of building a fintech application, including challenges, solutions, and measurable results.',
      category: 'case-study',
      duration: '22:30',
      thumbnailUrl: '/api/placeholder/800/450',
      videoUrl: '/videos/fintech-case-study.mp4',
      instructor: 'Jennifer Park, Project Director',
      views: 4200,
      likes: 389,
      difficulty: 'Intermediate',
      tags: ['FinTech', 'Case Study', 'Mobile App', 'React Native', 'Security'],
      relatedService: 'mobile-apps',
      publishDate: '2024-01-01',
      resources: [
        { title: 'Case Study PDF', url: '/resources/fintech-case-study.pdf', type: 'download' },
        { title: 'Live Demo', url: '/demo/fintech-app', type: 'link' }
      ]
    },
    {
      id: 'client-testimonial-tech-startup',
      title: 'Success Story: TechFlow Startup Platform',
      description: 'Hear directly from our client about how we helped them build and launch their SaaS platform in just 3 months.',
      category: 'client-testimonial',
      duration: '8:45',
      thumbnailUrl: '/api/placeholder/800/450',
      videoUrl: '/videos/techflow-testimonial.mp4',
      instructor: 'David Kim, CEO of TechFlow',
      views: 2100,
      likes: 156,
      difficulty: 'Beginner',
      tags: ['Testimonial', 'SaaS', 'Startup', 'Success Story'],
      relatedService: 'web-development',
      publishDate: '2023-12-20',
      resources: [
        { title: 'Full Case Study', url: '/case-studies/techflow', type: 'link' }
      ]
    },
    {
      id: 'mobile-app-architecture',
      title: 'Mobile App Architecture Best Practices',
      description: 'Deep dive into scalable mobile app architecture patterns, state management, and performance optimization techniques.',
      category: 'tutorial',
      duration: '28:10',
      thumbnailUrl: '/api/placeholder/800/450',
      videoUrl: '/videos/mobile-architecture.mp4',
      instructor: 'Lisa Wong, Mobile Architecture Lead',
      views: 6700,
      likes: 523,
      difficulty: 'Advanced',
      tags: ['Mobile Development', 'Architecture', 'React Native', 'Performance', 'State Management'],
      relatedService: 'mobile-apps',
      publishDate: '2023-12-15',
      resources: [
        { title: 'Architecture Guide', url: '/resources/mobile-architecture.pdf', type: 'download' },
        { title: 'Code Examples', url: '/resources/mobile-examples.zip', type: 'download' }
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service-overview': return Target;
      case 'process-demo': return Cog;
      case 'case-study': return TrendingUp;
      case 'tutorial': return BookOpen;
      case 'client-testimonial': return Users;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredVideos = videoWalkthroughs.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Video{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Walkthroughs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Get an inside look at our development process, see real project case studies, 
              and learn from our team of experts through comprehensive video walkthroughs.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="w-full lg:w-96">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => {
            const CategoryIcon = getCategoryIcon(video.category);
            
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="overflow-hidden group cursor-pointer h-full" onClick={() => setSelectedVideo(video)}>
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-sm rounded">
                      {video.duration}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-primary/90 text-white text-xs rounded flex items-center gap-1">
                      <CategoryIcon className="w-3 h-3" />
                      {video.category.replace('-', ' ')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(video.difficulty)}`}>
                        {video.difficulty}
                      </span>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(video.views / 1000).toFixed(1)}k
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {video.likes}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {video.description}
                    </p>

                    {video.instructor && (
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {video.instructor}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {video.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {video.tags.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          +{video.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Button className="w-full group/btn">
                      <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Watch Now
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold mb-2">No videos found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filter
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Stats Section */}
        <motion.div 
          className="mt-20 py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Learning{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our video walkthroughs have helped thousands of developers and businesses 
              understand and implement best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Video Walkthroughs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
});

export default VideoWalkthroughs;