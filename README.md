# 🚀 DevNest Studios - MERN Stack Portfolio Website

![DevNest Studios Banner](https://img.shields.io/badge/DevNest%20Studios-MERN%20Stack-blue?style=for-the-badge&logo=react)

A production-ready, full-stack portfolio website for DevNest Studios built with the MERN stack, featuring advanced UI components, 3D animations, and a complete content management system.

## 🌟 Live Demo

- **Frontend**: [https://localhost:5173](http://localhost:5173)
- **Backend API**: [https://localhost:5000](http://localhost:5000)
- **GitHub Repository**: [https://github.com/baaghinitesh/devNestStudios1](https://github.com/baaghinitesh/devNestStudios1)

## ✨ Features

### 🎨 **Advanced UI/UX**
- **3D Logo Animation** with mouse interaction and rotation effects
- **Particle Background** with physics-based animations
- **Glass Morphism Navbar** with full-width design and hover effects
- **Theme System** supporting Light, Dark, Aurora, and Matrix modes
- **Cursor Follower** for enhanced navigation interaction
- **Floating Elements** with parallax scrolling effects
- **Animated Counters** with intersection observer triggers
- **Glow Cards** with mouse tracking and glass effects

### 📱 **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Optimized for desktop, tablet, and mobile devices
- Dynamic navbar with mobile menu
- Touch-friendly interactions
- Adaptive typography and spacing

### 🏗️ **Architecture**
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express.js + MongoDB
- **Styling**: Tailwind CSS v3 with custom components
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API
- **Build Tool**: Vite with hot module replacement

### 📄 **Pages & Features**

#### **Home Page**
- Hero section with 3D logo and particle effects
- Animated statistics and counters
- Services preview with interactive cards
- Featured projects autoscroll showcase
- Client testimonials carousel
- Call-to-action sections

#### **About Page**
- Team member profiles with social links
- Interactive company values wheel
- Company timeline and milestones
- Animated statistics and achievements
- Executive team showcase

#### **Services Page**
- Comprehensive service offerings
- Interactive service cards with hover effects
- Pricing tiers and packages
- Process timeline visualization
- Service comparison tables
- Micro-demos for each service

#### **Products Page** (Enhanced)
- Grid layout with category filters (All, Web, Mobile, SaaS, AI)
- Elevated cards with autoscroll image carousels
- Tech stack icons and feature bullets
- Demo and Details buttons for each product
- Product detail pages with case studies
- Before/after metrics and testimonials

#### **Projects Page**
- Portfolio showcase with tech stack filtering
- Detailed case studies with client testimonials
- Project metrics and performance data
- GIF demos and interactive galleries
- Client testimonials and ratings

#### **Blog System**
- Article listing with categories and search
- Rich text content with syntax highlighting
- Author profiles and bio sections
- Related articles suggestions
- Comment system (ready for implementation)

#### **Contact Page**
- Multi-step smart form with validation
- Real-time form feedback and error handling
- Contact information and business hours
- Interactive elements and animations
- Email integration with backend API

#### **Legal Pages**
- Privacy Policy with GDPR compliance
- Terms of Service
- Cookie Policy
- 404 Error page with navigation

## 🛠️ Tech Stack

### **Frontend**
```json
{
  "framework": "React 18.3.1",
  "language": "TypeScript 5.6.2",
  "build": "Vite 7.1.7",
  "styling": "Tailwind CSS 3.4.16",
  "animations": "Framer Motion 11.15.0",
  "icons": "Lucide React 0.468.0",
  "routing": "React Router DOM 7.9.1"
}
```

### **Backend**
```json
{
  "runtime": "Node.js",
  "framework": "Express.js 4.21.2",
  "database": "MongoDB with Mongoose 8.8.3",
  "authentication": "JWT + bcrypt",
  "validation": "Custom middleware",
  "cors": "CORS enabled for development"
}
```

### **Development Tools**
```json
{
  "linting": "ESLint 9.15.0",
  "formatting": "Prettier (built-in)",
  "css": "PostCSS with autoprefixer",
  "bundler": "Vite with Rollup",
  "deployment": "Production-ready build"
}
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone https://github.com/baaghinitesh/devNestStudios1.git
cd devNestStudios1
```

### **2. Install Frontend Dependencies**
```bash
npm install
```

### **3. Install Backend Dependencies**
```bash
cd server
npm install
cd ..
```

### **4. Environment Configuration**

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/devneststudios
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devneststudios

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_FROM=hello@devneststudios.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Client Configuration
CLIENT_URL=http://localhost:5173

# Security
BCRYPT_ROUNDS=12
```

### **5. Database Setup**

#### **Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

#### **Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `.env` file
4. Whitelist your IP address

### **6. Start the Application**

#### **Development Mode (Recommended)**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

#### **Production Mode**
```bash
# Build the frontend
npm run build

# Start backend in production
cd server
npm start
```

### **7. Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api (returns status)

## 📊 Adding Content

### **Adding Products**

#### **Method 1: Direct Database Insert**

Connect to MongoDB and insert products:

```javascript
// Sample product document
{
  title: "EcoCommerce Platform",
  slug: "ecocommerce-platform",
  description: "Sustainable e-commerce platform with AI-powered recommendations",
  shortDescription: "Green shopping meets smart technology",
  category: "Web App",
  tags: ["SaaS", "B2C", "Sustainability"],
  images: [
    {
      url: "https://example.com/hero-image.jpg",
      alt: "EcoCommerce Hero",
      type: "hero"
    },
    {
      url: "https://example.com/gallery-1.jpg", 
      alt: "Product Gallery",
      type: "gallery"
    }
  ],
  demoGif: {
    url: "https://example.com/demo.gif",
    alt: "Platform Demo"
  },
  techStack: [
    {
      name: "React",
      category: "frontend",
      icon: "⚛️",
      color: "#61DAFB"
    },
    {
      name: "Node.js",
      category: "backend", 
      icon: "🟢",
      color: "#339933"
    }
  ],
  features: [
    {
      title: "AI Recommendations",
      description: "Smart product suggestions based on user behavior",
      icon: "🤖"
    },
    {
      title: "Carbon Tracking", 
      description: "Real-time carbon footprint monitoring",
      icon: "🌱"
    }
  ],
  links: {
    live: "https://demo.ecocommerce.com",
    github: "https://github.com/user/ecocommerce",
    caseStudy: "/projects/ecocommerce-platform"
  },
  metrics: {
    performance: 95,
    accessibility: 100,
    seo: 92,
    userRating: 4.8,
    trafficIncrease: "250%",
    conversionRate: "18.5%"
  },
  published: true,
  featured: true,
  order: 1
}
```

#### **Method 2: API Endpoint (Future)**
```bash
# POST request to add new product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d @product-data.json
```

### **Adding Blog Posts**

```javascript
// Sample blog post document
{
  title: "Building Scalable React Applications in 2024",
  slug: "scalable-react-applications-2024",
  excerpt: "Learn the latest patterns and best practices for building React apps that scale",
  content: "Full markdown content here...",
  author: {
    name: "nitesh",
    avatar: "https://example.com/avatar.jpg",
    bio: "Full-stack developer passionate about React and Node.js"
  },
  featuredImage: {
    url: "https://example.com/blog-featured.jpg",
    alt: "React Development"
  },
  tags: ["React", "JavaScript", "Performance", "Architecture"],
  category: "Development",
  published: true,
  featured: true,
  readTime: 8,
  seo: {
    metaTitle: "Scalable React Apps 2024 - DevNest Studios",
    metaDescription: "Complete guide to building scalable React applications...",
    keywords: ["React", "Scalability", "Frontend", "JavaScript"]
  }
}
```

### **Adding Team Members**

Edit `src/pages/About.tsx` and update the `teamMembers` array:

```typescript
{
  id: '7',
  name: 'Your Name',
  role: 'Your Position',
  bio: 'Your professional background and expertise...',
  image: 'https://example.com/your-photo.jpg',
  skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'your.email@devneststudios.com'
  },
  yearsExperience: 5,
  projectsCompleted: 25
}
```

## 🔧 Customization

### **Themes**
The application supports 4 built-in themes. To add a new theme:

1. **Add theme colors in `src/index.css`:**
```css
.your-theme {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 142.1 76.2% 36.3%;
  /* ... other CSS variables */
}
```

2. **Update theme context in `src/contexts/ThemeContext.tsx`:**
```typescript
const themes = ['light', 'dark', 'aurora', 'matrix', 'your-theme'] as const
```

### **Styling**
- Modify `tailwind.config.js` for design system changes
- Update `src/index.css` for global styles
- Component styles are in respective `.tsx` files

### **Content Management**
- Update page content in `src/pages/` directory
- Modify navigation in `src/components/layout/Navbar.tsx`
- Change footer content in `src/components/layout/Footer.tsx`

## 🚀 Deployment

### **Frontend Deployment (Netlify/Vercel)**

1. **Build the application:**
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure environment variables** on your hosting platform

### **Backend Deployment (Railway/Render/DigitalOcean)**

1. **Prepare for production:**
```bash
cd server
npm install --production
```

2. **Set environment variables** on your hosting platform

3. **Configure startup script** (usually `npm start`)

### **Database Deployment**
- Use MongoDB Atlas for cloud database
- Update connection string in production environment variables

## 🧪 Testing

### **Frontend Testing**
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Backend Testing**
```bash
# Start development server
cd server
npm run dev

# Test API endpoints
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/blog
```

### **API Testing Examples**

```bash
# Get all projects
curl -X GET http://localhost:5000/api/projects

# Get featured projects
curl -X GET http://localhost:5000/api/projects/featured

# Get all blog posts
curl -X GET http://localhost:5000/api/blog

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "message": "Hello from API test",
    "projectType": "web-app"
  }'
```

## 📁 Project Structure

```
devNestStudios1/
├── 📁 public/                 # Static assets
├── 📁 src/
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 layout/         # Layout components (Navbar, Footer)
│   │   ├── 📁 sections/       # Page sections (Testimonials, etc.)
│   │   └── 📁 ui/             # UI components (Button, Card, etc.)
│   ├── 📁 contexts/           # React contexts (Theme, Auth)
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utility functions
│   ├── 📁 pages/              # Page components
│   ├── 📁 types/              # TypeScript type definitions
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── 📁 server/                 # Backend application
│   ├── 📁 models/             # MongoDB schemas
│   ├── 📁 routes/             # API routes
│   ├── index.js               # Server entry point
│   └── package.json           # Backend dependencies
├── .env                       # Environment variables
├── package.json               # Frontend dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # Project documentation
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Submit pull request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **nitesh** - *Lead Developer* - [GitHub Profile](https://github.com/baaghinitesh)

## 🙏 Acknowledgments

- React community for amazing ecosystem
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- MongoDB for flexible database solution
- Vite for lightning-fast development experience

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed description
4. **Contact support**: hello@devneststudios.com

---

**Built with ❤️ by DevNest Studios**

![Footer](https://img.shields.io/badge/Made%20with-MERN%20Stack-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
