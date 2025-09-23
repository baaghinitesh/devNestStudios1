export interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  featuredImage?: {
    url: string
    alt?: string
  }
  tags: string[]
  category: string
  published: boolean
  featured: boolean
  readTime: number
  views: number
  publishedAt: string
  updatedAt: string
  formattedDate?: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  client?: {
    name: string
    industry: string
    location: string
    website?: string
  }
  images: Array<{
    url: string
    alt?: string
    caption?: string
    type: 'hero' | 'gallery' | 'mobile' | 'desktop' | 'wireframe'
  }>
  demoGif?: {
    url: string
    alt?: string
  }
  techStack: Array<{
    name: string
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud'
    icon?: string
    color?: string
  }>
  features: Array<{
    title: string
    description: string
    icon?: string
  }>
  timeline: {
    start: string
    end: string
    duration: string
  }
  team: Array<{
    name: string
    role: string
    avatar?: string
  }>
  links: {
    live?: string
    github?: string
    figma?: string
    caseStudy?: string
  }
  metrics: {
    performance: number
    accessibility: number
    seo: number
    userRating: number
    trafficIncrease?: string
    conversionRate?: string
  }
  category: string
  status: 'completed' | 'in-progress' | 'planning'
  featured: boolean
  published: boolean
  order: number
  tags: string[]
  testimonial?: {
    content: string
    author: {
      name: string
      position: string
      company: string
      avatar?: string
    }
    rating: number
  }
  createdAt: string
  updatedAt: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  company?: string
  projectType: string
  budget?: string
  timeline?: string
  message: string
  requirements?: Array<{
    category: string
    details: string
  }>
  source?: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'user'
  avatar?: {
    url: string
    publicId: string
  }
  bio?: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    notifications: {
      email: boolean
      browser: boolean
    }
    language: string
  }
  isActive: boolean
  isVerified: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  message?: string
  data?: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
  errors?: string[]
}

export interface Theme {
  name: string
  label: string
  className: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
}

export interface NavigationItem {
  name: string
  href: string
  icon?: string
  children?: NavigationItem[]
  external?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  technologies: string[]
  startingPrice?: string
  deliveryTime?: string
}

export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  avatar?: string
  content: string
  rating: number
  project?: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  avatar: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  skills: string[]
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface Stats {
  projects: number
  clients: number
  commits: number
  experience: number
}