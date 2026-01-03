# Development Guide for Backend Developers

This guide is specifically for backend developers who may be new to Next.js and modern frontend development.

## 🎯 Understanding Next.js 15 App Router

### What is Next.js?

Next.js is a React framework that provides:

- **Server-Side Rendering (SSR)**: Pages are rendered on the server for better SEO
- **File-based Routing**: Folders in `src/app/` automatically become routes
- **API Routes**: Backend endpoints alongside your frontend code
- **Built-in Optimization**: Image optimization, code splitting, etc.

### App Router vs Pages Router

This project uses the **App Router** (Next.js 13+), which is different from the older Pages Router:

- Routes are defined by folders in `src/app/`
- Each folder can have special files: `page.tsx`, `layout.tsx`, `route.ts`
- Server Components by default (runs on server, not client)

### File Naming Conventions

| File          | Purpose               | Example                                     |
| ------------- | --------------------- | ------------------------------------------- |
| `page.tsx`    | A page/route          | `app/about/page.tsx` → `/about`             |
| `layout.tsx`  | Shared layout wrapper | `app/layout.tsx` wraps all pages            |
| `route.ts`    | API endpoint          | `app/api/contact/route.ts` → `/api/contact` |
| `loading.tsx` | Loading UI            | Shows while page loads                      |
| `error.tsx`   | Error boundary        | Catches errors in that route                |

## 🗂️ Project Architecture

### Directory Structure Explained

```
src/
├── app/                      # Routes and pages
│   ├── layout.tsx           # Root layout (wraps everything)
│   ├── page.tsx             # Homepage (/)
│   ├── api/                 # Backend API routes
│   │   └── contact/
│   │       └── route.ts     # POST /api/contact
│   ├── sitemap.ts           # /sitemap.xml
│   └── robots.ts            # /robots.txt
│
├── components/              # Reusable React components
│   ├── ui/                 # Basic UI components (buttons, inputs)
│   └── layout/             # Layout components (header, footer)
│
├── lib/                     # Business logic and utilities
│   ├── sanity/             # CMS integration
│   │   ├── client.ts       # Sanity client setup
│   │   ├── queries.ts      # Database queries (GROQ)
│   │   └── image.ts        # Image URL builder
│   └── email/              # Email service
│       ├── client.ts       # Resend client
│       └── templates.ts    # Email HTML templates
│
├── config/                  # Configuration files
│   └── seo.ts              # SEO metadata
│
├── types/                   # TypeScript type definitions
│   └── index.ts            # Shared types
│
└── middleware.ts            # Request/response middleware
```

## 🔌 API Routes (Your Comfort Zone!)

API routes work similarly to Express.js or other backend frameworks.

### Creating an API Endpoint

File: `src/app/api/hello/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

// GET /api/hello
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello World' });
}

// POST /api/hello
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

### Supported HTTP Methods

- `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
- Each method is a separate exported function

### Request Object

```typescript
// Get query parameters
const searchParams = request.nextUrl.searchParams;
const id = searchParams.get('id');

// Get headers
const auth = request.headers.get('authorization');

// Get body (for POST/PUT)
const body = await request.json();

// Get IP address
const ip = request.headers.get('x-forwarded-for');
```

### Response Object

```typescript
// JSON response
return NextResponse.json({ data: 'value' }, { status: 200 });

// Error response
return NextResponse.json({ error: 'Not found' }, { status: 404 });

// Redirect
return NextResponse.redirect(new URL('/login', request.url));

// Set headers
const response = NextResponse.json({ data: 'value' });
response.headers.set('X-Custom-Header', 'value');
return response;
```

## 🗄️ Working with Sanity.io (The CMS)

Think of Sanity as your database, but for content.

### What is Sanity?

- **Headless CMS**: Content management system with an API
- **GROQ**: Query language (similar to SQL, but for JSON)
- **Schemas**: Define your content structure (like database tables)
- **Studio**: Admin UI for content editors

### Schemas = Database Tables

File: `sanity/schemas/travelPackage.ts`

```typescript
// This is like creating a table in SQL
export default defineType({
  name: 'travelPackage', // Table name
  title: 'Travel Package',
  type: 'document',
  fields: [
    // Columns
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      type: 'number',
    },
  ],
});
```

### Querying Data with GROQ

GROQ is like SQL for JSON. Here are some examples:

```typescript
// SELECT * FROM travelPackage
*[_type == "travelPackage"]

// SELECT * FROM travelPackage WHERE featured = true
*[_type == "travelPackage" && featured == true]

// SELECT * FROM travelPackage ORDER BY _createdAt DESC LIMIT 10
*[_type == "travelPackage"] | order(_createdAt desc) [0...10]

// SELECT title, price FROM travelPackage
*[_type == "travelPackage"] {
  title,
  price
}

// JOIN: Get package with related destinations
*[_type == "travelPackage"] {
  title,
  destinations[]-> {
    name,
    country
  }
}
```

### Fetching Data in Next.js

```typescript
import { client } from '@/lib/sanity/client';

// In a Server Component (default in App Router)
export default async function PackagesPage() {
  const packages = await client.fetch(
    `*[_type == "travelPackage"] {
      title,
      price,
      slug
    }`
  );

  return (
    <div>
      {packages.map((pkg) => (
        <div key={pkg._id}>{pkg.title}</div>
      ))}
    </div>
  );
}
```

## 📧 Email Service (Resend)

### Sending Emails

```typescript
import { resend } from '@/lib/email/client';

await resend.emails.send({
  from: 'noreply@shivankshatravels.in',
  to: 'customer@example.com',
  subject: 'Thank you for contacting us',
  html: '<p>We will get back to you soon!</p>',
});
```

### Email Templates

Templates are in `src/lib/email/templates.ts`. They return HTML strings.

## 🎨 React Components (Brief Overview)

### Server Components (Default)

These run on the server, can fetch data directly:

```typescript
// This is a Server Component
export default async function HomePage() {
  const data = await fetchData(); // Direct database/API calls OK
  return <div>{data}</div>;
}
```

### Client Components

For interactivity (forms, buttons, state):

```typescript
'use client'; // This directive makes it a Client Component

import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');

  return (
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
```

**Rule of thumb**: Use Server Components by default, only use Client Components when you need:

- Event handlers (`onClick`, `onChange`)
- State (`useState`, `useReducer`)
- Browser APIs (`localStorage`, `window`)

## 🔧 Common Development Tasks

### 1. Adding a New API Endpoint

```bash
# Create the file
mkdir -p src/app/api/my-endpoint
touch src/app/api/my-endpoint/route.ts
```

```typescript
// src/app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Your logic here
  return NextResponse.json({ success: true });
}
```

### 2. Adding a New Sanity Schema

```typescript
// sanity/schemas/newSchema.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newSchema',
  title: 'New Schema',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
```

```typescript
// sanity/schemas/index.ts
import newSchema from './newSchema';

export const schemaTypes = [
  // ... existing schemas
  newSchema,
];
```

### 3. Adding a New Query

```typescript
// src/lib/sanity/queries.ts
export async function getNewData() {
  return client.fetch(
    `*[_type == "newSchema"] {
      _id,
      title
    }`
  );
}
```

## 🐛 Debugging

### Check Logs

```bash
# Development server logs
npm run dev

# TypeScript errors
npm run type-check

# Linting errors
npm run lint
```

### Common Issues

1. **"Module not found"**: Check import paths use `@/` alias
2. **"Cannot use import statement"**: Add `'use client'` if using browser APIs
3. **Build errors**: Run `npm run type-check` to see TypeScript errors
4. **Sanity errors**: Check environment variables are set correctly

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Getting Help

1. Check the error message carefully
2. Search in Next.js or Sanity documentation
3. Check `npm run type-check` for TypeScript errors
4. Review the code in similar files for patterns

## 🚀 Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Sanity Studio deployed (`npm run sanity:deploy`)
- [ ] Test build locally (`npm run build`)
- [ ] Check TypeScript (`npm run type-check`)
- [ ] Run linter (`npm run lint`)
- [ ] Test contact form in production
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt is correct

---

**Remember**: Next.js is just React with routing and server capabilities. The API routes work like any backend framework you're used to. Take it one step at a time!
