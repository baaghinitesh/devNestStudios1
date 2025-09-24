import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOOptimizationsProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product' | 'service'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  author?: string
  publishedDate?: string
  modifiedDate?: string
  breadcrumbs?: { name: string; url: string }[]
  faq?: { question: string; answer: string }[]
  services?: { name: string; description: string; price?: string }[]
  organization?: {
    name: string
    url: string
    logo: string
    sameAs: string[]
    contactPoint: {
      telephone: string
      contactType: string
      availableLanguage: string[]
    }
  }
}

const SEOOptimizations: React.FC<SEOOptimizationsProps> = ({
  title = 'DevNestStudios - Full-Stack Development & Consulting Services',
  description = 'Professional full-stack development services including web development, mobile apps, UX/UI design, and strategic consulting. Transform your ideas into powerful digital solutions.',
  keywords = [
    'web development',
    'mobile app development', 
    'full-stack development',
    'react development',
    'node.js development',
    'UI/UX design',
    'software consulting',
    'digital transformation',
    'startup development',
    'enterprise solutions'
  ],
  canonicalUrl = 'https://devneststudios.com',
  ogImage = 'https://devneststudios.com/images/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'DevNestStudios Team',
  publishedDate,
  modifiedDate,
  breadcrumbs,
  faq,
  services,
  organization = {
    name: 'DevNestStudios',
    url: 'https://devneststudios.com',
    logo: 'https://devneststudios.com/images/logo.png',
    sameAs: [
      'https://twitter.com/devneststudios',
      'https://linkedin.com/company/devneststudios',
      'https://github.com/devneststudios'
    ],
    contactPoint: {
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish']
    }
  }
}) => {
  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization Schema
      {
        '@type': 'Organization',
        '@id': `${organization.url}/#organization`,
        name: organization.name,
        url: organization.url,
        logo: {
          '@type': 'ImageObject',
          url: organization.logo,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: organization.contactPoint.telephone,
          contactType: organization.contactPoint.contactType,
          availableLanguage: organization.contactPoint.availableLanguage,
        },
        sameAs: organization.sameAs,
      },
      // Website Schema
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}/#website`,
        url: canonicalUrl,
        name: title,
        description: description,
        publisher: {
          '@id': `${organization.url}/#organization`,
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${canonicalUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        ],
      },
    ],
  }

  // Add breadcrumbs to structured data
  if (breadcrumbs && breadcrumbs.length > 0) {
    (structuredData['@graph'] as any[]).push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${canonicalUrl}${crumb.url}`,
      })),
    })
  }

  // Add FAQ to structured data
  if (faq && faq.length > 0) {
    (structuredData['@graph'] as any[]).push({
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  // Add services to structured data
  if (services && services.length > 0) {
    (structuredData['@graph'] as any[]).push({
      '@type': 'Service',
      provider: {
        '@id': `${organization.url}/#organization`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: service.name,
          description: service.description,
          ...(service.price && { price: service.price }),
        })),
      },
    })
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={organization.name} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Language and Localization */}
      <meta name="language" content="English" />
      <meta httpEquiv="Content-Language" content="en-us" />
      
      {/* Mobile and Responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Performance and Caching */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta httpEquiv="Expires" content="31536000" />
      
      {/* Security */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* App and PWA Meta Tags */}
      <meta name="application-name" content={organization.name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={organization.name} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Published/Modified Dates */}
      {publishedDate && (
        <meta name="article:published_time" content={publishedDate} />
      )}
      {modifiedDate && (
        <meta name="article:modified_time" content={modifiedDate} />
      )}
      
      {/* Preconnect to External Domains for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.devneststudios.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.devneststudios.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional Performance Hints */}
      <link rel="prefetch" href="/video-walkthroughs" />
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/projects" />
      <link rel="prefetch" href="/contact" />
      
      {/* Resource Hints for Critical Assets */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Helmet>
  )
}

export default SEOOptimizations