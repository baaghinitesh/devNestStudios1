import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  client: {
    name: String,
    industry: String,
    location: String,
    website: String
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    caption: String,
    type: {
      type: String,
      enum: ['hero', 'gallery', 'mobile', 'desktop', 'wireframe'],
      default: 'gallery'
    }
  }],
  demoGif: {
    url: String,
    alt: String
  },
  techStack: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'database', 'tools', 'cloud'],
      required: true
    },
    icon: String,
    color: String
  }],
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  timeline: {
    start: Date,
    end: Date,
    duration: String
  },
  team: [{
    name: String,
    role: String,
    avatar: String
  }],
  links: {
    live: String,
    github: String,
    figma: String,
    caseStudy: String
  },
  metrics: {
    performance: Number,
    accessibility: Number,
    seo: Number,
    userRating: Number,
    trafficIncrease: String,
    conversionRate: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Web App', 'Mobile App', 'E-commerce', 'SaaS', 'Portfolio', 'Corporate', 'Other']
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planning'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [String],
  testimonial: {
    content: String,
    author: {
      name: String,
      position: String,
      company: String,
      avatar: String
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }
}, {
  timestamps: true
});

// Indexes
projectSchema.index({ published: 1, order: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ tags: 1 });

// Virtual for project duration
projectSchema.virtual('durationInMonths').get(function() {
  if (this.timeline.start && this.timeline.end) {
    const diffTime = Math.abs(this.timeline.end - this.timeline.start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 30);
  }
  return null;
});

export default mongoose.model('Project', projectSchema);