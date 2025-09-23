import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all published blogs with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      featured,
      sort = 'publishedAt'
    } = req.query;

    // Build filter query
    const filter = { published: true };
    
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (featured !== undefined) filter.featured = featured === 'true';
    
    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { publishedAt: -1 };
        break;
      case 'oldest':
        sortOption = { publishedAt: 1 };
        break;
      case 'views':
        sortOption = { views: -1 };
        break;
      case 'title':
        sortOption = { title: 1 };
        break;
      default:
        sortOption = { publishedAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, total, categories] = await Promise.all([
      Blog.find(filter)
        .select('-content') // Exclude full content for list view
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Blog.countDocuments(filter),
      Blog.distinct('category', { published: true })
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      status: 'success',
      data: {
        blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
          hasMore: parseInt(page) < totalPages
        },
        filters: {
          categories,
          availableTags: await Blog.distinct('tags', { published: true })
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blogs',
      error: error.message
    });
  }
});

// Get featured blogs
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ 
      published: true, 
      featured: true 
    })
    .select('-content')
    .sort({ publishedAt: -1 })
    .limit(6)
    .lean();

    res.json({
      status: 'success',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch featured blogs',
      error: error.message
    });
  }
});

// Get recent blogs
router.get('/recent', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const blogs = await Blog.find({ published: true })
      .select('title slug excerpt featuredImage publishedAt readTime')
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({
      status: 'success',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch recent blogs',
      error: error.message
    });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    });

    if (!blog) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    // Increment views
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    // Get related posts
    const relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      published: true,
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags } }
      ]
    })
    .select('title slug excerpt featuredImage publishedAt readTime')
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

    res.json({
      status: 'success',
      data: {
        blog,
        relatedPosts
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch blog post',
      error: error.message
    });
  }
});

// Get blog categories with counts
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Blog.aggregate([
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

// Search blogs
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(
      { 
        published: true,
        $text: { $search: query }
      },
      { score: { $meta: 'textScore' } }
    )
    .select('-content')
    .sort({ score: { $meta: 'textScore' } })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

    const total = await Blog.countDocuments({
      published: true,
      $text: { $search: query }
    });

    res.json({
      status: 'success',
      data: {
        blogs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit))
        },
        query
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Search failed',
      error: error.message
    });
  }
});

export default router;