<img src="/public/cover.jpg" alt="Cover image for Nim Extended, a personal website template" width="100%" />

# Nim Extended

A personal website template that takes [**Nim** by Julien Thibeaut](https://github.com/ibelick/nim) and extends it into a structured, multi-section personal site for **founders, indie hackers, and design engineers** who want more than a one-page minimal portfolio.

Built with Next.js 16, React 19, Tailwind CSS v4, and [Motion-Primitives](https://motion-primitives.com).

**Live demo:** _coming soon_

## What's added on top of Nim

Everything Nim ships with — header, footer, theme switch, MDX blog, Motion-Primitives — plus:

- **Structured section components** — `Hero`, `About`, `Services`, `Projects`, `Timeline`, `WhatIDo`, `Contact` (in [`components/sections/`](./components/sections/)). Drop the ones you don't need.
- **A typed content schema** — all your content lives in [`app/data.ts`](./app/data.ts) (`PROJECTS`, `SERVICES`, `WHAT_I_DO`, `ABOUT_CONTENT`, `TIMELINE_ITEMS`, `METRICS`, `HERO_CONTENT`, `SOCIAL_LINKS`, `EMAIL`, `CALENDLY_URL`).
- **13 extra animated UI primitives** — `animated-counter`, `animated-gradient-border`, `cursor-follower`, `floating-action-button`, `floating-particles`, `liquid-button`, `morphing-icon`, `particle-text`, `project-preview`, `ripple-button`, `text-scramble`, `text-split`, `tilt-card`.
- **Vercel Analytics + Speed Insights** wired up out of the box.
- **A `/legal` page** with template Privacy / Terms / Contact sections.
- **`CALENDLY_URL` config** — set it to show a "Schedule a Call" button in Contact, leave empty to hide.
- **Header & Footer derived from your data** — change your name in `data.ts` and it propagates everywhere.

## Quick start

```bash
git clone https://github.com/simonseifert/nim-extended.git
cd nim-extended
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Then edit [`app/data.ts`](./app/data.ts) — that's where ~95% of your customization lives.

For full setup details see [INSTALLATION.md](./INSTALLATION.md).

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsimonseifert%2Fnim-extended&env=NEXT_PUBLIC_SITE_URL&project-name=nim-extended&repository-name=nim-extended)

Set `NEXT_PUBLIC_SITE_URL` to your deployed origin so SEO metadata, sitemap, and `robots.ts` resolve correctly.

## Credits

- Original [**Nim**](https://github.com/ibelick/nim) template by [Julien Thibeaut (@ibelick)](https://github.com/ibelick) — MIT licensed, the foundation everything here builds on.
- [**Motion-Primitives**](https://motion-primitives.com) by Julien Thibeaut — the animated UI components.
- All section components, the extended data schema, the additional UI primitives, and the analytics/legal/Calendly wiring are added in this fork.

## License

The upstream [Nim](https://github.com/ibelick/nim) repository is described as "free and open-source" but does not currently include an explicit `LICENSE` file. This fork follows upstream's stated intent and inherits the same usage terms. If you plan to redistribute or use this template commercially, please confirm the license with the upstream author.

## Contributing

Issues and PRs welcome. Especially welcome: cleaner section variants, more themes, better defaults.
