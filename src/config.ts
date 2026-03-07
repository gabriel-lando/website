// ─────────────────────────────────────────────
//  Personal configuration
// ─────────────────────────────────────────────

export const profile = {
  name: 'Gabriel Lando',
  title: 'Expert Software Applications Engineer',
  company: 'HP Inc.',
  summary: 'Embedded systems and Windows driver engineer focused on media pipelines, CI/CD, networking, and C/C++.',
  description: 'Gabriel Lando is an Expert Software Applications Engineer at HP Inc. specializing in embedded systems, Windows drivers, media pipelines, CI/CD, networking, and C/C++.',
  photo: '/profile_picture.webp',

  links: {
    email: 'mail@gabriellando.com',
    linkedin: 'https://www.linkedin.com/in/gabriellando',
    github: 'https://github.com/gabriel-lando',
    resume: 'https://github.com/gabriel-lando/resume/releases/latest/download/Gabriel_Lando.pdf',
  },
};

export const siteConfig = {
  origin: 'https://www.gabriellando.com',
  socialImage: '/social-preview.png',
};

export const experience: { role: string; meta: string }[] = [{ role: 'Software Applications Engineer', meta: 'HP Inc. · 2021 – Present' }];

export const education: { degree: string; meta: string }[] = [
  { degree: 'M.Sc. Computer Science', meta: 'PPGC UFRGS · 2025 – Present' },
  { degree: 'B.Eng. Computer Engineering', meta: 'UFRGS · 2017 – 2022' },
];

export const stats: { number: string; label: string; url?: string }[] = [
  { number: '7', label: 'Patents', url: 'https://patents.google.com/?inventor=Gabriel+Lando' },
  { number: '6', label: 'Publications', url: 'https://scholar.google.com/citations?user=XedTbGMAAAAJ' },
  { number: '5+', label: 'Years at HP' },
];

export const skills: { name: string; category: string }[] = [
  { name: 'C', category: 'lang' },
  { name: 'C++', category: 'lang' },
  { name: 'C#', category: 'lang' },
  { name: 'Python', category: 'lang' },
  { name: 'Go', category: 'lang' },
  { name: 'JavaScript', category: 'lang' },
  { name: 'Embedded Systems', category: 'systems' },
  { name: 'Systems Programming', category: 'systems' },
  { name: 'Windows Driver Development', category: 'systems' },
  { name: 'Kernel Drivers', category: 'systems' },
  { name: 'Firmware Development', category: 'systems' },
  { name: 'DirectShow', category: 'media' },
  { name: 'Media Foundation', category: 'media' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'Kubernetes', category: 'devops' },
  { name: 'Virtualization', category: 'devops' },
  { name: 'Networking', category: 'network' },
  { name: 'SDR', category: 'network' },
  { name: 'LTE/5G', category: 'network' },
];
