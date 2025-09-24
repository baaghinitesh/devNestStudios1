import express from 'express';
import ClientProject from '../models/ClientProject.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(403).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

// Get client dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get client projects
    const projects = await ClientProject.find({
      $or: [
        { clientId: userId },
        { 'team.userId': userId }
      ]
    })
    .populate('clientId', 'name email avatar')
    .populate('team.userId', 'name email avatar role')
    .populate('projectId', 'title category status')
    .sort({ updatedAt: -1 });

    // Calculate dashboard stats
    const stats = {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'in-progress').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      pendingApprovals: projects.filter(p => p.status === 'review').length,
      totalBudget: projects.reduce((sum, p) => sum + (p.budget?.total || 0), 0),
      totalPaid: projects.reduce((sum, p) => sum + (p.budget?.paid || 0), 0),
      overdueMilestones: projects.reduce((count, project) => {
        return count + project.milestones.filter(m => 
          m.status !== 'completed' && m.dueDate < new Date()
        ).length;
      }, 0)
    };

    // Get recent activities
    const recentActivities = projects
      .flatMap(project => 
        project.communications.slice(-5).map(comm => ({
          type: comm.type,
          content: comm.content.substring(0, 100),
          projectTitle: project.title,
          author: comm.author,
          createdAt: comm.createdAt
        }))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    // Get upcoming milestones
    const upcomingMilestones = projects
      .flatMap(project => 
        project.milestones
          .filter(m => m.status !== 'completed' && m.dueDate > new Date())
          .map(m => ({
            ...m.toObject(),
            projectTitle: project.title,
            projectId: project._id
          }))
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    res.json({
      status: 'success',
      data: {
        projects,
        stats,
        recentActivities,
        upcomingMilestones
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard data'
    });
  }
});

// Get specific client project
router.get('/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await ClientProject.findById(req.params.id)
      .populate('clientId', 'name email avatar')
      .populate('team.userId', 'name email avatar')
      .populate('projectId')
      .populate('communications.author', 'name avatar')
      .populate('feedback.author', 'name avatar');

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Check if user has access to this project
    const hasAccess = project.clientId._id.toString() === req.user._id.toString() ||
      project.team.some(member => member.userId._id.toString() === req.user._id.toString()) ||
      req.user.role === 'admin';

    if (!hasAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    res.json({
      status: 'success',
      data: { project }
    });

  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project data'
    });
  }
});

// Add communication to project
router.post('/projects/:id/communications', authenticateToken, async (req, res) => {
  try {
    const { type, content, recipients } = req.body;
    
    const project = await ClientProject.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Check access
    const hasAccess = project.clientId.toString() === req.user._id.toString() ||
      project.team.some(member => member.userId.toString() === req.user._id.toString()) ||
      req.user.role === 'admin';

    if (!hasAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    await project.addCommunication(type, content, req.user._id, recipients);

    const updatedProject = await ClientProject.findById(req.params.id)
      .populate('communications.author', 'name avatar');

    res.json({
      status: 'success',
      message: 'Communication added successfully',
      data: { communications: updatedProject.communications }
    });

  } catch (error) {
    console.error('Communication error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add communication'
    });
  }
});

// Update milestone status
router.patch('/projects/:id/milestones/:milestoneId', authenticateToken, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const project = await ClientProject.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Check if user has edit permissions
    const teamMember = project.team.find(member => 
      member.userId.toString() === req.user._id.toString()
    );
    
    const hasEditAccess = req.user.role === 'admin' ||
      (teamMember && teamMember.permissions.includes('edit'));

    if (!hasEditAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions'
      });
    }

    const milestone = project.milestones.id(req.params.milestoneId);
    
    if (!milestone) {
      return res.status(404).json({
        status: 'error',
        message: 'Milestone not found'
      });
    }

    milestone.status = status;
    if (notes) milestone.notes = notes;
    if (status === 'completed') milestone.completedAt = new Date();

    // Update overall project progress
    const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
    const totalMilestones = project.milestones.length;
    const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);
    
    await project.updateProgress(progressPercentage);

    res.json({
      status: 'success',
      message: 'Milestone updated successfully',
      data: { milestone }
    });

  } catch (error) {
    console.error('Milestone update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update milestone'
    });
  }
});

// Add feedback
router.post('/projects/:id/feedback', authenticateToken, async (req, res) => {
  try {
    const { type, content, rating } = req.body;
    
    const project = await ClientProject.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Check access
    const hasAccess = project.clientId.toString() === req.user._id.toString() ||
      project.team.some(member => member.userId.toString() === req.user._id.toString());

    if (!hasAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    project.feedback.push({
      type,
      content,
      rating,
      author: req.user._id
    });

    await project.save();

    const updatedProject = await ClientProject.findById(req.params.id)
      .populate('feedback.author', 'name avatar');

    res.json({
      status: 'success',
      message: 'Feedback added successfully',
      data: { feedback: updatedProject.feedback }
    });

  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add feedback'
    });
  }
});

// Get project analytics
router.get('/projects/:id/analytics', authenticateToken, async (req, res) => {
  try {
    const project = await ClientProject.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Check access
    const hasAccess = project.clientId.toString() === req.user._id.toString() ||
      project.team.some(member => member.userId.toString() === req.user._id.toString()) ||
      req.user.role === 'admin';

    if (!hasAccess) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      });
    }

    // Calculate analytics
    const analytics = {
      timeTracking: {
        totalHours: project.analytics.timeTracking.reduce((sum, entry) => sum + entry.hours, 0),
        estimatedHours: project.timeline.estimatedHours || 0,
        dailyBreakdown: project.analytics.timeTracking.reduce((acc, entry) => {
          const date = entry.date.toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + entry.hours;
          return acc;
        }, {})
      },
      milestones: {
        total: project.milestones.length,
        completed: project.milestones.filter(m => m.status === 'completed').length,
        overdue: project.milestones.filter(m => 
          m.status !== 'completed' && m.dueDate < new Date()
        ).length,
        upcoming: project.milestones.filter(m => 
          m.status !== 'completed' && m.dueDate > new Date()
        ).length
      },
      budget: {
        total: project.budget?.total || 0,
        paid: project.budget?.paid || 0,
        remaining: project.budgetRemaining,
        utilizationRate: project.budget?.total ? 
          ((project.budget.paid / project.budget.total) * 100) : 0
      },
      communication: {
        totalMessages: project.communications.length,
        lastActivity: project.analytics.lastActivity,
        messagesByType: project.communications.reduce((acc, comm) => {
          acc[comm.type] = (acc[comm.type] || 0) + 1;
          return acc;
        }, {})
      },
      health: project.healthStatus
    };

    res.json({
      status: 'success',
      data: { analytics }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch analytics'
    });
  }
});

// Create new client project
router.post('/projects', authenticateToken, async (req, res) => {
  try {
    // Only admins can create new client projects
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions'
      });
    }

    const projectData = {
      ...req.body,
      team: [{
        userId: req.user._id,
        role: 'project-manager',
        permissions: ['view', 'edit', 'manage']
      }]
    };

    const project = new ClientProject(projectData);
    await project.save();

    const populatedProject = await ClientProject.findById(project._id)
      .populate('clientId', 'name email avatar')
      .populate('team.userId', 'name email avatar')
      .populate('projectId');

    res.status(201).json({
      status: 'success',
      message: 'Client project created successfully',
      data: { project: populatedProject }
    });

  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create project'
    });
  }
});

export default router;