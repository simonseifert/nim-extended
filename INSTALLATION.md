# Nim Extended — Installation Guide

## Prerequisites

- Node.js 20.x or later
- Git

## 1. Clone & install

```bash
git clone https://github.com/simonseifert/nim-extended.git
cd nim-extended
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 2. Customize your content

Almost everything you'll edit lives in [`app/data.ts`](./app/data.ts):

```ts
export const HERO_CONTENT = {
  name: 'Your Name',
  title: 'Your title',
  intro: `A two-or-three-sentence pitch.`,
  metrics: METRICS,
}

export const EMAIL = 'you@example.com'
export const CALENDLY_URL = '' // leave empty to hide the "Schedule a Call" button

export const SOCIAL_LINKS = [
  { label: 'GitHub',   link: 'https://github.com/your-handle' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/your-handle' },
]

// PROJECTS, SERVICES, WHAT_I_DO, ABOUT_CONTENT, TIMELINE_ITEMS, METRICS — all here.
```

`HERO_CONTENT.name` and `HERO_CONTENT.title` flow into the header and footer automatically.

## 3. Pick the sections you want

The default home page in [`app/page.tsx`](./app/page.tsx) renders **Hero → About → Services → Projects → Contact**. To swap, add `Timeline` or `WhatIDo`, or remove what you don't need:

```tsx
import { Hero, About, Services, Projects, Timeline, WhatIDo, Contact } from '@/components/sections'

export default function Page() {
  return (
    <main className="space-y-32">
      <Hero />
      <About />
      <WhatIDo />
      <Services />
      <Projects />
      <Timeline />
      <Contact />
    </main>
  )
}
```

## 4. Replace the cover image

`public/cover.jpg` is the OpenGraph / README cover. Drop in a 1200x630 image with the same name.

## 5. Add blog posts (optional)

Create one `.mdx` file per post in `app/blog/<slug>/page.mdx`. Two example posts ship with the template — delete or replace them.

```mdx
# Your Article Title

Your content here...
```

All MDX features (including React components) work.

## 6. Environment variables

Set `NEXT_PUBLIC_SITE_URL` to your deployed origin so SEO metadata, sitemap, and `robots.ts` resolve correctly. Example:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 7. Deploy

```bash
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsimonseifert%2Fnim-extended)
```

Or any host that supports Next.js 16.

## 8. Add more animated components

Need more primitives? Check [Motion-Primitives](https://motion-primitives.com/) and drop them into `components/ui/`.
