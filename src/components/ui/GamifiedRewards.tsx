import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Star,
  Download,
  Lock,
  Unlock,
  Gift,
  Target,
  CheckCircle,
  Award,
  Zap,
  Crown,
  Gem
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward?: DownloadableTemplate;
}

interface DownloadableTemplate {
  name: string;
  description: string;
  fileUrl: string;
  type: 'pdf' | 'docx' | 'figma' | 'zip';
  size: string;
}

interface UserProgress {
  totalPoints: number;
  level: number;
  achievements: Achievement[];
  unlockedTemplates: DownloadableTemplate[];
  visitedPages: string[];
  actionsCompleted: string[];
}

const GamifiedRewards: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  // Initialize user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('devnest_user_progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
      initializeUserProgress();
    }
    
    // Track page visit
    trackPageVisit(window.location.pathname);
  }, []);

  const initializeUserProgress = () => {
    const initialProgress: UserProgress = {
      totalPoints: 0,
      level: 1,
      achievements: getInitialAchievements(),
      unlockedTemplates: [],
      visitedPages: [],
      actionsCompleted: []
    };
    
    setUserProgress(initialProgress);
    localStorage.setItem('devnest_user_progress', JSON.stringify(initialProgress));
  };

  const getInitialAchievements = (): Achievement[] => [
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit 3 different pages',
      icon: <Target className="w-6 h-6" />,
      points: 50,
      unlocked: false,
      progress: 0,
      maxProgress: 3,
      reward: {
        name: 'Project Planning Template',
        description: 'Comprehensive project planning checklist and timeline template',
        fileUrl: '/templates/project-planning-template.pdf',
        type: 'pdf',
        size: '2.1 MB'
      }
    },
    {
      id: 'engaged',
      title: 'Engaged Visitor',
      description: 'Interact with 5 different elements',
      icon: <Zap className="w-6 h-6" />,
      points: 75,
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      reward: {
        name: 'UI Design System',
        description: 'Complete design system with components and guidelines',
        fileUrl: '/templates/ui-design-system.figma',
        type: 'figma',
        size: '15.3 MB'
      }
    },
    {
      id: 'communicator',
      title: 'Great Communicator',
      description: 'Fill out the contact form',
      icon: <CheckCircle className="w-6 h-6" />,
      points: 100,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: {
        name: 'Client Brief Template',
        description: 'Professional client brief and requirements gathering template',
        fileUrl: '/templates/client-brief-template.docx',
        type: 'docx',
        size: '1.8 MB'
      }
    },
    {
      id: 'AI_user',
      title: 'AI Early Adopter',
      description: 'Complete AI Assistant conversation',
      icon: <Star className="w-6 h-6" />,
      points: 150,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: {
        name: 'AI Implementation Guide',
        description: 'Complete guide to implementing AI in your business',
        fileUrl: '/templates/ai-implementation-guide.pdf',
        type: 'pdf',
        size: '4.2 MB'
      }
    },
    {
      id: 'newsletter_subscriber',
      title: 'Insider',
      description: 'Subscribe to our newsletter',
      icon: <Crown className="w-6 h-6" />,
      points: 200,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: {
        name: 'Complete Startup Kit',
        description: 'Business plan, pitch deck, and financial templates bundle',
        fileUrl: '/templates/startup-kit-bundle.zip',
        type: 'zip',
        size: '25.7 MB'
      }
    },
    {
      id: 'portfolio_explorer',
      title: 'Portfolio Enthusiast',
      description: 'View 3 different projects',
      icon: <Award className="w-6 h-6" />,
      points: 125,
      unlocked: false,
      progress: 0,
      maxProgress: 3,
      reward: {
        name: 'Portfolio Showcase Template',
        description: 'Professional portfolio template with case study formats',
        fileUrl: '/templates/portfolio-template.figma',
        type: 'figma',
        size: '8.9 MB'
      }
    },
    {
      id: 'master_explorer',
      title: 'Master Explorer',
      description: 'Unlock all other achievements',
      icon: <Gem className="w-6 h-6" />,
      points: 500,
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      reward: {
        name: 'Ultimate Business Bundle',
        description: 'Every template, guide, and resource in one premium package',
        fileUrl: '/templates/ultimate-bundle.zip',
        type: 'zip',
        size: '150+ MB'
      }
    }
  ];

  const trackPageVisit = (page: string) => {
    if (!userProgress) return;

    const normalizedPage = page.replace(/\/\d+$/, ''); // Remove IDs from URLs
    if (!userProgress.visitedPages.includes(normalizedPage)) {
      const updatedProgress = {
        ...userProgress,
        visitedPages: [...userProgress.visitedPages, normalizedPage]
      };
      
      updateAchievementProgress('explorer', 1, updatedProgress);
    }
  };

  const trackAction = (action: string) => {
    if (!userProgress) return;

    if (!userProgress.actionsCompleted.includes(action)) {
      const updatedProgress = {
        ...userProgress,
        actionsCompleted: [...userProgress.actionsCompleted, action]
      };
      
      // Update relevant achievements based on action
      switch (action) {
        case 'contact_form_submit':
          updateAchievementProgress('communicator', 1, updatedProgress);
          break;
        case 'ai_conversation_complete':
          updateAchievementProgress('AI_user', 1, updatedProgress);
          break;
        case 'newsletter_subscribe':
          updateAchievementProgress('newsletter_subscriber', 1, updatedProgress);
          break;
        case 'project_view':
          updateAchievementProgress('portfolio_explorer', 1, updatedProgress);
          break;
        default:
          updateAchievementProgress('engaged', 1, updatedProgress);
      }
    }
  };

  const updateAchievementProgress = (achievementId: string, increment: number, progress: UserProgress) => {
    const updatedAchievements = progress.achievements.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        const newProgress = Math.min(achievement.progress + increment, achievement.maxProgress);
        const wasJustUnlocked = newProgress === achievement.maxProgress && !achievement.unlocked;
        
        if (wasJustUnlocked) {
          // Add to new unlocks for notification
          const unlockedAchievement = { ...achievement, progress: newProgress, unlocked: true };
          setNewUnlocks(prev => [...prev, unlockedAchievement]);
          setShowNotification(true);
          
          // Auto-hide notification after 5 seconds
          setTimeout(() => {
            setShowNotification(false);
            setNewUnlocks([]);
          }, 5000);
          
          return unlockedAchievement;
        }
        
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    });

    // Calculate new total points and level
    const totalPoints = updatedAchievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.points, 0);
    
    const level = Math.floor(totalPoints / 250) + 1;

    // Check for master explorer achievement
    const basicAchievements = updatedAchievements.filter(a => a.id !== 'master_explorer');
    const unlockedBasic = basicAchievements.filter(a => a.unlocked).length;
    const masterExplorer = updatedAchievements.find(a => a.id === 'master_explorer');
    
    if (masterExplorer && !masterExplorer.unlocked && unlockedBasic === basicAchievements.length) {
      updatedAchievements[updatedAchievements.findIndex(a => a.id === 'master_explorer')] = {
        ...masterExplorer,
        progress: masterExplorer.maxProgress,
        unlocked: true
      };
      
      setNewUnlocks(prev => [...prev, { ...masterExplorer, unlocked: true }]);
      setShowNotification(true);
    }

    const finalProgress = {
      ...progress,
      achievements: updatedAchievements,
      totalPoints,
      level,
      unlockedTemplates: updatedAchievements
        .filter(a => a.unlocked && a.reward)
        .map(a => a.reward!)
    };

    setUserProgress(finalProgress);
    localStorage.setItem('devnest_user_progress', JSON.stringify(finalProgress));
  };

  const getLevelProgress = () => {
    if (!userProgress) return 0;
    const currentLevelPoints = userProgress.totalPoints % 250;
    return (currentLevelPoints / 250) * 100;
  };

  const downloadTemplate = (template: DownloadableTemplate) => {
    // In a real implementation, this would handle actual file downloads
    // For now, we'll simulate the download
    const link = document.createElement('a');
    link.href = template.fileUrl;
    link.download = template.name;
    link.click();
    
    // Track download action
    trackAction('template_download');
  };

  // Expose tracking function to global scope for other components
  useEffect(() => {
    (window as any).trackGamifiedAction = trackAction;
    return () => {
      delete (window as any).trackGamifiedAction;
    };
  }, [userProgress]);

  if (!userProgress) return null;

  return (
    <>
      {/* Floating Rewards Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Trophy className="w-6 h-6" />
        {userProgress.totalPoints > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {userProgress.level}
          </motion.div>
        )}
      </motion.button>

      {/* Achievements Notification */}
      <AnimatePresence>
        {showNotification && newUnlocks.length > 0 && (
          <motion.div
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg shadow-xl max-w-sm"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
          >
            <div className="flex items-start gap-3">
              <Trophy className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Achievement Unlocked!</h4>
                {newUnlocks.map(achievement => (
                  <div key={achievement.id} className="text-sm opacity-90">
                    🎉 {achievement.title} - {achievement.reward?.name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Debug Info */}
              <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded text-xs">
                Progress loaded: {userProgress ? 'Yes' : 'No'} | 
                Points: {userProgress?.totalPoints || 0} | 
                Achievements: {userProgress?.achievements?.length || 0}
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
                  <p className="text-gray-600 dark:text-gray-400">Level {userProgress?.level || 1} • {userProgress?.totalPoints || 0} points</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Level Progress */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Level Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {(userProgress?.totalPoints || 0) % 250}/250 XP
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getLevelProgress()}%` }}
                  />
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {(userProgress?.achievements || []).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.unlocked ? <CheckCircle className="w-4 h-4" /> : achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h3>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                            {achievement.points} XP
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        
                        {/* Progress Bar */}
                        {!achievement.unlocked && (
                          <div className="mb-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {achievement.progress}/{achievement.maxProgress}
                            </p>
                          </div>
                        )}

                        {/* Reward */}
                        {achievement.reward && (
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                🎁 {achievement.reward.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {achievement.reward.size}
                              </p>
                            </div>
                            {achievement.unlocked ? (
                              <button
                                onClick={() => downloadTemplate(achievement.reward!)}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                            ) : (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {(userProgress?.achievements || []).filter(a => a.unlocked).length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Achievements</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {userProgress?.unlockedTemplates?.length || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Templates</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {userProgress?.visitedPages?.length || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pages Explored</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GamifiedRewards;