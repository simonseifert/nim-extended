// Project type — represents work in your portfolio.
type Project = {
  name: string
  description: string
  link: string
  id: string
  color: string
  metrics?: string[]
  role?: string
  outcome?: string
}

// Service type — for the "How I Can Help" section.
type Service = {
  icon: string
  title: string
  description: string
  deliverables?: string[]
  id: string
}

// Short bullets used in the Hero / WhatIDo section.
type WhatIDo = {
  title: string
  id: string
}

// About section content.
type AboutSection = {
  title: string
  subtitle: string
  story: string[]
}

// Timeline entry — used by the Timeline section to render a journey row.
type TimelineItem = {
  id: string
  title: string
  company: string
  year: string
  description: string
  achievement: string
  color: string
  icon: string
}

// Animated counter used in the Hero metrics row.
type Metric = {
  value: number
  suffix: string
  label: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Project One',
    description: 'A short, punchy one-liner about what this project does.',
    link: 'https://example.com',
    id: 'project-one',
    color: '#22c55e',
    metrics: ['Headline result', 'Tech stack', 'Notable outcome'],
    role: 'Your role here',
    outcome: 'The impact this project had — keep it concrete.',
  },
  {
    name: 'Project Two',
    description: 'Another project. Describe what it is and who it served.',
    link: 'https://example.com',
    id: 'project-two',
    color: '#06b6d4',
    metrics: ['Result one', 'Result two', 'Result three'],
    role: 'Your role here',
    outcome: 'A concrete win — revenue, users, launch.',
  },
  {
    name: 'Project Three',
    description: 'Replace these projects with your own.',
    link: 'https://example.com',
    id: 'project-three',
    color: '#f59e0b',
    metrics: ['Metric A', 'Metric B'],
    role: 'Your role here',
    outcome: 'Why this project mattered.',
  },
]

export const SERVICES: Service[] = [
  {
    icon: '🚀',
    title: 'Service One',
    description: 'A short pitch for the kind of work you take on.',
    deliverables: ['Deliverable one', 'Deliverable two', 'Deliverable three'],
    id: 'service-one',
  },
  {
    icon: '🧠',
    title: 'Service Two',
    description: 'Another way you can help — keep it specific.',
    deliverables: ['Deliverable one', 'Deliverable two'],
    id: 'service-two',
  },
  {
    icon: '💻',
    title: 'Service Three',
    description: 'A third focus area, if you have one.',
    deliverables: ['Deliverable one', 'Deliverable two'],
    id: 'service-three',
  },
  {
    icon: '🤝',
    title: 'Service Four',
    description: 'Round it out with anything else you offer.',
    deliverables: ['Deliverable one', 'Deliverable two'],
    id: 'service-four',
  },
]

export const WHAT_I_DO: WhatIDo[] = [
  { title: 'A short line about what you do', id: 'item-1' },
  { title: 'Another quick line — keep it punchy', id: 'item-2' },
  { title: 'A current project or focus', id: 'item-3' },
  { title: 'A side interest worth mentioning', id: 'item-4' },
]

export const ABOUT_CONTENT: AboutSection = {
  title: 'About Me',
  subtitle: 'A one-line summary of what you do and who you do it for.',
  story: [
    'Open with a hook — a moment, a project, a turning point that shows who you are.',
    'Build on it. What did that lead to? What are you doing now and why does it matter?',
    'Tell the reader what kinds of problems you love solving and the kind of work you want more of.',
    'Close with what you’re building or pursuing today, and an invitation to get in touch.',
  ],
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'role-one',
    title: 'Your Role',
    company: 'Company One',
    year: '2022',
    description: 'A short description of what you did and why it mattered.',
    achievement: 'A standout outcome',
    color: '#22c55e',
    icon: '🌱',
  },
  {
    id: 'role-two',
    title: 'Your Role',
    company: 'Company Two',
    year: '2023',
    description: 'Another role — describe the work and the impact.',
    achievement: 'Another standout outcome',
    color: '#f59e0b',
    icon: '🎯',
  },
  {
    id: 'role-three',
    title: 'Your Role',
    company: 'Company Three',
    year: '2024 - Present',
    description: 'What you are doing now. Tell the reader why it matters.',
    achievement: 'A current win',
    color: '#8b5cf6',
    icon: '🚀',
  },
]

// Optional booking URL for the Contact section's "Schedule a Call" button.
// Leave empty to hide the button.
export const CALENDLY_URL = ''

export const METRICS: Metric[] = [
  { value: 10, suffix: '+', label: 'Projects shipped' },
  { value: 5, suffix: '', label: 'Years of experience' },
  { value: 3, suffix: '', label: 'Companies founded' },
  { value: 100, suffix: '%', label: 'Caffeinated' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', link: 'https://github.com/your-handle' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/your-handle' },
  { label: 'X', link: 'https://x.com/your-handle' },
]

export const EMAIL = 'you@example.com'

export const HERO_CONTENT = {
  name: 'Your Name',
  title: 'Your title — e.g. Designer & Engineer',
  intro: `A two-or-three-sentence pitch for who you are and what you do. Make it specific. Mention the kind of problem you solve and who you solve it for. The reader should know within a few seconds whether they want to keep reading.`,
  metrics: METRICS,
}
