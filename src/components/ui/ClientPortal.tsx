import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Settings,
  Plus,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Download,
  Bell,
  Search,
  Filter,
  User,
  LogOut,
  Home,
  Briefcase,
  Target,
  DollarSign,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingApprovals: number;
  totalBudget: number;
  totalPaid: number;
  overdueMilestones: number;
}

interface ClientProject {
  _id: string;
  title: string;
  status: string;
  priority: string;
  budget: {
    total: number;
    paid: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
  };
  analytics: {
    progressPercentage: number;
    lastActivity: string;
  };
  team: Array<{
    userId: {
      name: string;
      avatar?: string;
    };
    role: string;
  }>;
  milestones: Array<{
    title: string;
    status: string;
    dueDate: string;
  }>;
}

interface RecentActivity {
  type: string;
  content: string;
  projectTitle: string;
  createdAt: string;
}

const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [upcomingMilestones, setUpcomingMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'files', name: 'Files', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockData = {
        projects: [
          {
            _id: '1',
            title: 'E-commerce Platform Redesign',
            status: 'in-progress',
            priority: 'high',
            budget: { total: 75000, paid: 45000, currency: 'USD' },
            timeline: { startDate: '2024-01-15', endDate: '2024-06-15' },
            analytics: { progressPercentage: 68, lastActivity: '2024-01-20' },
            team: [
              { userId: { name: 'Sarah Johnson' }, role: 'Project Manager' },
              { userId: { name: 'Mike Chen' }, role: 'Developer' }
            ],
            milestones: [
              { title: 'Initial Design', status: 'completed', dueDate: '2024-02-01' },
              { title: 'Frontend Development', status: 'in-progress', dueDate: '2024-03-15' }
            ]
          },
          {
            _id: '2',
            title: 'Mobile App Development',
            status: 'review',
            priority: 'medium',
            budget: { total: 50000, paid: 50000, currency: 'USD' },
            timeline: { startDate: '2023-10-01', endDate: '2024-01-31' },
            analytics: { progressPercentage: 95, lastActivity: '2024-01-18' },
            team: [
              { userId: { name: 'Alex Rodriguez' }, role: 'Lead Developer' }
            ],
            milestones: [
              { title: 'UI/UX Design', status: 'completed', dueDate: '2023-11-15' },
              { title: 'Development Phase', status: 'completed', dueDate: '2024-01-10' }
            ]
          }
        ],
        stats: {
          totalProjects: 2,
          activeProjects: 1,
          completedProjects: 0,
          pendingApprovals: 1,
          totalBudget: 125000,
          totalPaid: 95000,
          overdueMilestones: 0
        },
        recentActivities: [
          {
            type: 'update',
            content: 'Frontend development milestone completed ahead of schedule',
            projectTitle: 'E-commerce Platform Redesign',
            createdAt: '2024-01-20T10:30:00Z'
          },
          {
            type: 'message',
            content: 'Client feedback received for mobile app final review',
            projectTitle: 'Mobile App Development',
            createdAt: '2024-01-19T15:45:00Z'
          }
        ],
        upcomingMilestones: [
          {
            title: 'Frontend Development',
            dueDate: '2024-03-15',
            projectTitle: 'E-commerce Platform Redesign',
            projectId: '1'
          }
        ]
      };

      setProjects(mockData.projects);
      setStats(mockData.stats);
      setRecentActivities(mockData.recentActivities);
      setUpcomingMilestones(mockData.upcomingMilestones);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'text-green-600 bg-green-100',
      'in-progress': 'text-blue-600 bg-blue-100',
      'review': 'text-amber-600 bg-amber-100',
      'on-hold': 'text-gray-600 bg-gray-100',
      'cancelled': 'text-red-600 bg-red-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'urgent': 'text-red-600 bg-red-100',
      'high': 'text-orange-600 bg-orange-100',
      'medium': 'text-blue-600 bg-blue-100',
      'low': 'text-gray-600 bg-gray-100'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeProjects}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${stats.totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalProjects > 0 ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0}%
                </p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Project Overview */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            Active Projects
          </h3>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'in-progress').map((project) => (
              <div 
                key={project._id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setSelectedProject(project._id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Progress: {project.analytics.progressPercentage}%</span>
                  <span>Budget: ${project.budget.total.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.analytics.progressPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'message' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {activity.type === 'update' ? <TrendingUp className="w-4 h-4" /> :
                   activity.type === 'message' ? <MessageSquare className="w-4 h-4" /> :
                   <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    {activity.projectTitle}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Milestones */}
      {upcomingMilestones.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Upcoming Milestones
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMilestones.map((milestone: any, index) => (
              <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {milestone.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {milestone.projectTitle}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Projects</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <motion.div 
            key={project._id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
            whileHover={{ y: -2 }}
            onClick={() => setSelectedProject(project._id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority} priority
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${project.budget.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.analytics.progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{project.analytics.progressPercentage}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Team</p>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800"
                      title={member.userId.name}
                    >
                      {member.userId.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Milestone</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {project.milestones.find(m => m.status !== 'completed')?.title || 'No pending milestones'}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Timeline: {new Date(project.timeline.startDate).toLocaleDateString()} - {new Date(project.timeline.endDate).toLocaleDateString()}
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View Details →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Portal</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">John Doe</span>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'projects' && renderProjects()}
            {activeTab === 'messages' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Messages</h3>
                <p className="text-gray-600 dark:text-gray-400">Communication features coming soon</p>
              </div>
            )}
            {activeTab === 'files' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Files</h3>
                <p className="text-gray-600 dark:text-gray-400">File management features coming soon</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">Advanced analytics coming soon</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Settings</h3>
                <p className="text-gray-600 dark:text-gray-400">Portal settings coming soon</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClientPortal;