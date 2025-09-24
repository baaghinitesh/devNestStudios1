import mongoose from 'mongoose';

const clientProjectSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  status: {
    type: String,
    enum: ['proposal', 'approved', 'in-progress', 'review', 'completed', 'on-hold', 'cancelled'],
    default: 'proposal'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  budget: {
    total: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    paid: {
      type: Number,
      default: 0
    },
    remaining: Number
  },
  timeline: {
    startDate: Date,
    endDate: Date,
    estimatedHours: Number,
    actualHours: {
      type: Number,
      default: 0
    }
  },
  milestones: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'overdue'],
      default: 'pending'
    },
    completedAt: Date,
    deliverables: [String],
    notes: String
  }],
  team: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['project-manager', 'developer', 'designer', 'qa', 'client']
    },
    permissions: [{
      type: String,
      enum: ['view', 'comment', 'edit', 'approve', 'manage']
    }],
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  files: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      enum: ['design', 'document', 'asset', 'deliverable', 'feedback']
    },
    version: {
      type: Number,
      default: 1
    }
  }],
  communications: [{
    type: {
      type: String,
      enum: ['message', 'update', 'meeting', 'approval-request', 'feedback']
    },
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    attachments: [String],
    isRead: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      readAt: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  settings: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      browser: {
        type: Boolean,
        default: true
      },
      frequency: {
        type: String,
        enum: ['immediate', 'daily', 'weekly'],
        default: 'immediate'
      }
    },
    privacy: {
      type: String,
      enum: ['private', 'team-only', 'client-visible'],
      default: 'client-visible'
    }
  },
  feedback: [{
    type: {
      type: String,
      enum: ['general', 'milestone', 'deliverable', 'meeting']
    },
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'acknowledged', 'addressed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  analytics: {
    timeTracking: [{
      date: Date,
      hours: Number,
      description: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastActivity: Date
  }
}, {
  timestamps: true
});

// Indexes
clientProjectSchema.index({ clientId: 1, status: 1 });
clientProjectSchema.index({ 'team.userId': 1 });
clientProjectSchema.index({ status: 1, priority: 1 });
clientProjectSchema.index({ 'timeline.startDate': 1, 'timeline.endDate': 1 });

// Virtual for budget remaining calculation
clientProjectSchema.virtual('budgetRemaining').get(function() {
  if (this.budget && this.budget.total && this.budget.paid) {
    return this.budget.total - this.budget.paid;
  }
  return this.budget?.total || 0;
});

// Virtual for project health status
clientProjectSchema.virtual('healthStatus').get(function() {
  const now = new Date();
  const progress = this.analytics?.progressPercentage || 0;
  
  if (this.timeline?.endDate && now > this.timeline.endDate && progress < 100) {
    return 'critical';
  }
  
  if (this.timeline?.endDate) {
    const daysRemaining = Math.ceil((this.timeline.endDate - now) / (1000 * 60 * 60 * 24));
    if (daysRemaining < 7 && progress < 80) {
      return 'warning';
    }
  }
  
  return 'healthy';
});

// Method to add team member
clientProjectSchema.methods.addTeamMember = function(userId, role, permissions = ['view']) {
  const existingMember = this.team.find(member => member.userId.toString() === userId.toString());
  
  if (existingMember) {
    existingMember.role = role;
    existingMember.permissions = permissions;
  } else {
    this.team.push({ userId, role, permissions });
  }
  
  return this.save();
};

// Method to update progress
clientProjectSchema.methods.updateProgress = function(percentage) {
  this.analytics.progressPercentage = Math.min(100, Math.max(0, percentage));
  this.analytics.lastActivity = new Date();
  return this.save();
};

// Method to add communication
clientProjectSchema.methods.addCommunication = function(type, content, authorId, recipients = []) {
  this.communications.push({
    type,
    content,
    author: authorId,
    recipients,
    isRead: [{ userId: authorId }]
  });
  
  this.analytics.lastActivity = new Date();
  return this.save();
};

export default mongoose.model('ClientProject', clientProjectSchema);