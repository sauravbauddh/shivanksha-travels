# Shivanksha Travels Website

A modern, SEO-optimized travel and tour business website built with Next.js 15, Sanity.io CMS, and deployed on Vercel.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) with TypeScript
- **CMS**: Sanity.io for content management
- **Styling**: Tailwind CSS
- **Email**: Resend for contact forms
- **Images**: Vercel's built-in image optimization
- **Hosting**: Vercel
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 📋 Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (free tier available)
- A Resend account for email (free tier available)
- Git for version control

## 🛠️ Getting Started

### 1. Clone and Install

```bash
# Navigate to the project directory
cd shivanksha-travels

# Install dependencies
npm install
```

### 2. Set Up Sanity.io

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project in the Sanity dashboard
3. Note your **Project ID** and **Dataset** (usually "production")
4. Generate an API token with "Editor" permissions from the project settings

### 3. Set Up Resend

1. Go to [resend.com](https://resend.com/) and create a free account
2. Generate an API key from the dashboard
3. Verify your domain or use the test domain for development

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your actual values:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://shivankshatravels.in
NEXT_PUBLIC_SITE_NAME=Shivanksha Travels

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Resend Email Service
RESEND_API_KEY=re_your_api_key_here

# Email Configuration
CONTACT_EMAIL_TO=info@shivankshatravels.in
CONTACT_EMAIL_FROM=noreply@shivankshatravels.in
```

### 5. Run Development Servers

```bash
# Start Next.js development server
npm run dev

# In a separate terminal, start Sanity Studio
npm run sanity:dev
```

- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 📁 Project Structure

```
shivanksha-travels/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── contact/       # Contact form endpoint
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Homepage
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # Robots.txt
│   ├── components/            # React components
│   │   ├── ui/               # UI primitives
│   │   └── layout/           # Layout components
│   ├── lib/                   # Utility functions
│   │   ├── sanity/           # Sanity client & queries
│   │   └── email/            # Email service
│   ├── types/                 # TypeScript types
│   ├── config/                # App configuration
│   └── middleware.ts          # Next.js middleware
├── sanity/                    # Sanity Studio
│   ├── schemas/              # Content schemas
│   │   ├── travelPackage.ts  # Travel packages
│   │   ├── destination.ts    # Destinations
│   │   ├── testimonial.ts    # Customer reviews
│   │   └── blogPost.ts       # Blog posts
│   └── lib/                  # Sanity utilities
├── public/                    # Static assets
└── [config files]
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server with Turbopack
npm run sanity:dev       # Start Sanity Studio locally

# Production
npm run build            # Build for production
npm start                # Start production server
npm run sanity:deploy    # Deploy Sanity Studio

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # Check TypeScript types
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## 🎨 Content Management

### Sanity Studio

Access Sanity Studio at `/studio` to manage:

- **Travel Packages**: Tour packages with pricing, itineraries, and images
- **Destinations**: Travel destinations with descriptions and images
- **Testimonials**: Customer reviews and ratings
- **Blog Posts**: Travel guides and articles

### Content Schemas

All schemas include SEO fields (meta title and description) for better search engine optimization.

## 📧 Contact Form

The contact form API is located at `/api/contact` and includes:

- Input validation and sanitization
- Rate limiting (3 requests per minute per IP)
- Email notifications to business
- Auto-reply to customers
- Error handling

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and import your repository
3. Add environment variables in Vercel project settings
4. Deploy!

### Deploy Sanity Studio

```bash
npm run sanity:deploy
```

This will deploy your Sanity Studio to a hosted URL.

## 🔒 Security

- Security headers configured in `next.config.ts`
- Middleware for additional protection
- Rate limiting on contact form
- Input validation and sanitization
- Environment variables for sensitive data

## 📊 SEO Features

- Dynamic sitemap generation
- Robots.txt configuration
- Structured data (JSON-LD) for TravelAgency
- Meta tags and Open Graph support
- Semantic HTML structure
- Image optimization with Next.js Image

## 🤝 Contributing

This is a private project for Shivanksha Travels. For any issues or suggestions, please contact the development team.

## 📄 License

Private and proprietary. All rights reserved.

## 📞 Support

For technical support, refer to `DEVELOPMENT.md` or contact the development team.
