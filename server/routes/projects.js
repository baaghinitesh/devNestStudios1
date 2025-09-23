import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all published projects
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      tag,
      featured,
      sort = 'order'
    } = req.query;

    // Build filter
    const filter = { published: true };
    
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (featured !== undefined) filter.featured = featured === 'true';

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'order':
        sortOption = { order: 1, createdAt: -1 };
        break;
      case 'name':
        sortOption = { title: 1 };
        break;
      default:
        sortOption = { order: 1, createdAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [projects, total, categories, tags] = await Promise.all([
      Project.find(filter)
        .select('-description') // Exclude full description for list view
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Project.countDocuments(filter),
      Project.distinct('category', { published: true }),
      Project.distinct('tags', { published: true })
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      status: 'success',
      data: {
        projects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
          hasMore: parseInt(page) < totalPages
        },
        filters: {
          categories,
          tags
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const projects = await Project.find({ 
      published: true, 
      featured: true 
    })
    .select('title slug shortDescription images techStack category timeline metrics')
    .sort({ order: 1, createdAt: -1 })
    .limit(parseInt(limit))
    .lean();

    res.json({
      status: 'success',
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch featured projects',
      error: error.message
    });
  }
});

// Get project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      slug: req.params.slug, 
      published: true 
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Get related projects
    const relatedProjects = await Project.find({
      _id: { $ne: project._id },
      published: true,
      $or: [
        { category: project.category },
        { tags: { $in: project.tags } }
      ]
    })
    .select('title slug shortDescription images techStack category')
    .sort({ order: 1, createdAt: -1 })
    .limit(3)
    .lean();

    res.json({
      status: 'success',
      data: {
        project,
        relatedProjects
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project',
      error: error.message
    });
  }
});

// Get project categories with counts
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Project.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      status: 'success',
      data: categories.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// Get tech stack statistics
router.get('/meta/techstack', async (req, res) => {
  try {
    const techStats = await Project.aggregate([
      { $match: { published: true } },
      { $unwind: '$techStack' },
      { 
        $group: { 
          _id: {
            name: '$techStack.name',
            category: '$techStack.category',
            icon: '$techStack.icon',
            color: '$techStack.color'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json({
      status: 'success',
      data: techStats.map(tech => ({
        name: tech._id.name,
        category: tech._id.category,
        icon: tech._id.icon,
        color: tech._id.color,
        count: tech.count
      }))
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch tech stack statistics',
      error: error.message
    });
  }
});

// Get project metrics summary
router.get('/meta/metrics', async (req, res) => {
  try {
    const metrics = await Project.aggregate([
      { $match: { published: true } },
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          avgPerformance: { $avg: '$metrics.performance' },
          avgAccessibility: { $avg: '$metrics.accessibility' },
          avgSEO: { $avg: '$metrics.seo' },
          avgUserRating: { $avg: '$metrics.userRating' },
          categories: { $addToSet: '$category' },
          completedProjects: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = metrics[0] || {};

    res.json({
      status: 'success',
      data: {
        totalProjects: result.totalProjects || 0,
        completedProjects: result.completedProjects || 0,
        averageMetrics: {
          performance: Math.round((result.avgPerformance || 0) * 10) / 10,
          accessibility: Math.round((result.avgAccessibility || 0) * 10) / 10,
          seo: Math.round((result.avgSEO || 0) * 10) / 10,
          userRating: Math.round((result.avgUserRating || 0) * 10) / 10
        },
        categories: result.categories || []
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project metrics',
      error: error.message
    });
  }
});

export default router;