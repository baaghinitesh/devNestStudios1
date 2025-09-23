import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  projectType: {
    type: String,
    required: true,
    enum: [
      'Web Application',
      'Mobile Application',
      'E-commerce Platform',
      'SaaS Product',
      'API Development',
      'UI/UX Design',
      'Consultation',
      'Other'
    ]
  },
  budget: {
    type: String,
    enum: [
      'Less than $5,000',
      '$5,000 - $15,000',
      '$15,000 - $50,000',
      '$50,000 - $100,000',
      'More than $100,000',
      "Let's discuss"
    ]
  },
  timeline: {
    type: String,
    enum: [
      'ASAP',
      '1-2 weeks',
      '1 month',
      '2-3 months',
      '3-6 months',
      '6+ months',
      'Flexible'
    ]
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  requirements: [{
    category: String,
    details: String
  }],
  source: {
    type: String,
    enum: [
      'Google Search',
      'Social Media',
      'Referral',
      'Previous Client',
      'Portfolio',
      'LinkedIn',
      'Other'
    ]
  },
  status: {
    type: String,
    enum: ['new', 'in-review', 'responded', 'qualified', 'converted', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  tags: [String],
  notes: [{
    content: String,
    createdBy: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: Date,
  responded: {
    type: Boolean,
    default: false
  },
  respondedAt: Date,
  ip: String,
  userAgent: String,
  referrer: String
}, {
  timestamps: true
});

// Indexes
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ projectType: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for days since submission
contactSchema.virtual('daysSinceSubmission').get(function() {
  const diffTime = Math.abs(new Date() - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

export default mongoose.model('Contact', contactSchema);