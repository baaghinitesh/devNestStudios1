import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create email transporter (configure based on environment)
const createTransporter = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  
  // For development, create test account
  return null;
};

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      message,
      requirements,
      source
    } = req.body;

    // Basic validation
    if (!name || !email || !message || !projectType) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill in all required fields',
        required: ['name', 'email', 'message', 'projectType']
      });
    }

    // Create contact record
    const contact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      company: company?.trim(),
      projectType,
      budget,
      timeline,
      message: message.trim(),
      requirements: requirements || [],
      source,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    });

    await contact.save();

    // Send notification email (if configured)
    const transporter = createTransporter();
    if (transporter) {
      try {
        // Email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'hello@devneststudios.com',
          subject: `New Contact Form Submission - ${projectType}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
            <p><strong>Source:</strong> ${source || 'Unknown'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            ${requirements?.length ? `
              <p><strong>Requirements:</strong></p>
              <ul>
                ${requirements.map(req => `<li>${req.category}: ${req.details}</li>`).join('')}
              </ul>
            ` : ''}
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        });

        // Auto-reply to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting DevNestStudios',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Hi ${name},</p>
            <p>We've received your inquiry about ${projectType.toLowerCase()} and will get back to you within 24 hours.</p>
            <p>Here's a summary of what you submitted:</p>
            <ul>
              <li><strong>Project Type:</strong> ${projectType}</li>
              <li><strong>Budget:</strong> ${budget || 'To be discussed'}</li>
              <li><strong>Timeline:</strong> ${timeline || 'To be discussed'}</li>
            </ul>
            <p>In the meantime, feel free to explore our <a href="${process.env.CLIENT_URL}/projects">recent projects</a> or check out our <a href="${process.env.CLIENT_URL}/blog">insights</a>.</p>
            <p>Best regards,<br>The DevNestStudios Team</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      status: 'success',
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: {
        id: contact._id,
        submitted: true
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Please check your input and try again',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Get contact statistics (for admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          thisMonth: {
            $sum: {
              $cond: [
                { 
                  $gte: ['$createdAt', new Date(new Date().getFullYear(), new Date().getMonth(), 1)]
                },
                1,
                0
              ]
            }
          },
          byStatus: {
            $push: '$status'
          },
          byProjectType: {
            $push: '$projectType'
          },
          avgResponseTime: {
            $avg: {
              $cond: [
                { $and: ['$responded', '$respondedAt'] },
                { $subtract: ['$respondedAt', '$createdAt'] },
                null
              ]
            }
          }
        }
      }
    ]);

    const result = stats[0] || {};
    
    // Count by status
    const statusCounts = {};
    (result.byStatus || []).forEach(status => {
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    // Count by project type
    const projectTypeCounts = {};
    (result.byProjectType || []).forEach(type => {
      projectTypeCounts[type] = (projectTypeCounts[type] || 0) + 1;
    });

    res.json({
      status: 'success',
      data: {
        total: result.total || 0,
        thisMonth: result.thisMonth || 0,
        avgResponseTime: result.avgResponseTime ? 
          Math.round(result.avgResponseTime / (1000 * 60 * 60)) : null, // in hours
        byStatus: statusCounts,
        byProjectType: projectTypeCounts
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact statistics',
      error: error.message
    });
  }
});

// Newsletter subscription
router.post('/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
    }

    // In a real application, you'd integrate with a service like Mailchimp
    // For now, we'll just store it in our database or log it
    console.log('Newsletter subscription:', { email, name });

    res.json({
      status: 'success',
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to subscribe to newsletter'
    });
  }
});

export default router;