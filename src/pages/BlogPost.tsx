import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft, 
  Share, 
  Heart, 
  Bookmark, 
  Twitter, 
  Linkedin, 
  Facebook,
  Link2,
  Eye,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { GlowCard } from '../components/ui/GlowCard';
import { FloatingElements } from '../components/ui/FloatingElements';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  views: number;
  likes: number;
  bookmarks: number;
}

// Mock detailed blog post data
const mockPost: BlogPost = {
  id: '1',
  title: 'The Future of AI in Web Development: Transforming How We Build',
  content: `
    <h2>Introduction</h2>
    <p>Artificial Intelligence is revolutionizing every aspect of software development, and web development is no exception. From automated code generation to intelligent testing and optimization, AI is transforming how we build, deploy, and maintain web applications.</p>
    
    <h2>AI-Powered Code Generation</h2>
    <p>Tools like GitHub Copilot and GPT-based coding assistants are already changing how developers write code. These AI systems can:</p>
    <ul>
      <li>Generate boilerplate code instantly</li>
      <li>Suggest optimal algorithms for specific problems</li>
      <li>Auto-complete complex functions based on context</li>
      <li>Translate natural language requirements into code</li>
    </ul>
    
    <blockquote>
      "The future of programming is not about replacing developers, but about augmenting their capabilities to build better software faster." - Sarah Chen, CTO
    </blockquote>
    
    <h2>Intelligent Testing and Quality Assurance</h2>
    <p>AI is making testing more comprehensive and efficient:</p>
    <ul>
      <li><strong>Automated Test Generation:</strong> AI can analyze your codebase and generate comprehensive test suites</li>
      <li><strong>Visual Testing:</strong> Computer vision algorithms can detect UI inconsistencies across different browsers and devices</li>
      <li><strong>Performance Optimization:</strong> ML models can predict performance bottlenecks before they impact users</li>
    </ul>
    
    <h2>The Evolution of User Interfaces</h2>
    <p>AI is enabling more intuitive and personalized user experiences:</p>
    
    <h3>Natural Language Interfaces</h3>
    <p>Users can now interact with web applications using natural language, making complex software accessible to non-technical users.</p>
    
    <h3>Predictive UX</h3>
    <p>Machine learning algorithms can predict user behavior and adapt interfaces in real-time to improve usability and conversion rates.</p>
    
    <h2>Challenges and Considerations</h2>
    <p>While AI brings tremendous opportunities, it also presents challenges:</p>
    
    <h3>Data Privacy and Security</h3>
    <p>AI systems require vast amounts of data, raising important questions about user privacy and data security. Developers must implement robust privacy-by-design principles.</p>
    
    <h3>Bias and Fairness</h3>
    <p>AI systems can perpetuate biases present in training data. It's crucial to actively work on creating fair and inclusive AI systems.</p>
    
    <h2>Looking Ahead</h2>
    <p>The next decade will see AI become deeply integrated into every aspect of web development. Developers who embrace these tools while maintaining a focus on ethics and user value will be best positioned for success.</p>
    
    <p>The future is bright, and AI will be our co-pilot in building the next generation of web experiences.</p>
  `,
  slug: 'future-ai-web-development',
  author: {
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    role: 'CTO & AI Research Lead',
    bio: 'Former Google AI researcher specializing in machine learning and computer vision. Drives our AI innovation initiatives with a focus on practical applications in software development.'
  },
  category: 'Technology',
  tags: ['AI', 'Machine Learning', 'Web Development', 'Automation', 'Future Tech'],
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
  publishedAt: '2024-03-15',
  updatedAt: '2024-03-16',
  readTime: 8,
  views: 1250,
  likes: 89,
  bookmarks: 34
};

const relatedPosts = [
  {
    id: '2',
    title: 'Building Scalable Microservices: Lessons from 100+ Projects',
    slug: 'scalable-microservices-lessons',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
    readTime: 12,
    category: 'Architecture'
  },
  {
    id: '3',
    title: 'React Performance Optimization: Advanced Techniques',
    slug: 'react-performance-optimization',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
    readTime: 10,
    category: 'Frontend'
  },
  {
    id: '4',
    title: 'The Complete Guide to Database Design for Modern Applications',
    slug: 'database-design-guide',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop',
    readTime: 15,
    category: 'Backend'
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch post by slug
    setTimeout(() => {
      if (slug === mockPost.slug) {
        setPost(mockPost);
      }
      setLoading(false);
    }, 1000);
  }, [slug]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <FloatingElements />
      
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {post.likes + (isLiked ? 1 : 0)}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 ${isBookmarked ? 'text-yellow-500' : ''}`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2"
                >
                  <Share className="w-4 h-4" />
                  Share
                </Button>
                
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[150px] z-50"
                  >
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left hover:bg-secondary/20 flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full px-4 py-2 text-left hover:bg-secondary/20 flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-2 text-left hover:bg-secondary/20 flex items-center gap-2"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left hover:bg-secondary/20 flex items-center gap-2"
                    >
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Image */}
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views} views
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 p-6 bg-secondary/10 rounded-lg">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{post.author.name}</div>
                <div className="text-primary font-medium mb-1">{post.author.role}</div>
                <div className="text-sm text-muted-foreground">{post.author.bio}</div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:italic prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary/20 rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Related Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlowCard 
                    className="group cursor-pointer h-full overflow-hidden"
                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded-full font-medium">
                          {relatedPost.category}
                        </span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}m
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-primary font-medium">
                        Read Article
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
