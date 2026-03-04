// ─────────────────────────────────────────────
//  Personal configuration
// ─────────────────────────────────────────────

export const profile = {
  name: 'Gabriel Lando',
  title: 'Expert Software Applications Engineer',
  company: 'HP Inc.',
  description: 'Gabriel Lando - Expert Software Applications Engineer at HP Inc. Skilled in C, C++, C#, Python, JavaScript, Node.js, Go, Bash, Cloud, DevOps, Docker, Kubernetes, Git, and Linux.',
  photo: '/profile_picture.png',

  links: {
    email: 'mail@gabriellando.com',
    linkedin: {
      url: 'https://www.linkedin.com/in/gabriellando',
      label: 'in/gabriellando',
    },
    github: {
      url: 'https://github.com/gabriel-lando',
      label: 'gabriel-lando',
    },
    resume: 'https://github.com/gabriel-lando/resume/releases/latest/download/Gabriel_Lando.pdf',
  },
};

export const skills: string[] = ['C · C++ · C# · Python · JavaScript · Node.js · Go · Bash', 'Cloud · DevOps · Docker · Kubernetes · Git · Linux · Audio/Video'];

export const experience: { role: string; meta: string }[] = [{ role: 'Software Applications Engineer', meta: 'HP Inc. · 2021 – Present' }];

export const education: { degree: string; meta: string }[] = [
  { degree: 'M.Sc. Computer Science', meta: 'PPGC UFRGS · 2025 – Present' },
  { degree: 'B.Eng. Computer Engineering', meta: 'UFRGS · 2017 – 2022' },
];

export const stats: { number: string; label: string; url?: string }[] = [
  { number: '4', label: 'Publications', url: 'https://scholar.google.com/citations?user=XedTbGMAAAAJ' },
  { number: '7', label: 'Patents', url: 'https://patents.google.com/?inventor=Gabriel+Lando' },
  { number: '5+', label: 'Years at HP' },
];
