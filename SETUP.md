# Quick Setup Guide

Follow these steps to get your development environment running:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Sanity.io

1. Visit https://www.sanity.io/ and create a free account
2. Create a new project
3. Copy your **Project ID** and **Dataset name** (usually "production")
4. Go to API settings and create a token with "Editor" permissions

## Step 3: Set Up Resend

1. Visit https://resend.com/ and create a free account
2. Generate an API key from the dashboard
3. For development, you can use their test domain

## Step 4: Configure Environment

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your actual values
```

Required values:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - From Sanity dashboard
- `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
- `SANITY_API_TOKEN` - From Sanity API settings
- `RESEND_API_KEY` - From Resend dashboard

## Step 5: Run Development Servers

```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Sanity Studio (optional, can also access at /studio)
npm run sanity:dev
```

Visit:

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Step 6: Add Content

1. Go to http://localhost:3000/studio
2. Create some travel packages, destinations, and testimonials
3. Refresh your website to see the content

## Common Issues

**"Cannot find module"**: Make sure you ran `npm install`

**Sanity errors**: Check your environment variables are set correctly

**Build errors**: Run `npm run type-check` to see TypeScript errors

## Next Steps

- Read `README.md` for full documentation
- Read `DEVELOPMENT.md` if you're new to Next.js
- Start building your UI components
- Deploy to Vercel when ready

## Deployment

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel
4. Deploy!

For detailed deployment instructions, see `README.md`.
