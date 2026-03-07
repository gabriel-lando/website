import {
  education,
  experience,
  profile,
  siteConfig,
  skills,
  stats,
} from "./config";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const site = {
  origin: siteConfig.origin,
  path: "/",
  locale: "en_US",
  type: "website",
  themeColor: "#2563eb",
  title: `${profile.name} | ${profile.title}`,
  description: profile.description,
  imagePath: siteConfig.socialImage,
  keywords: [
    profile.name,
    profile.title,
    ...skills.map((skill) => skill.name),
  ].filter(
    (keyword, index, allKeywords) => allKeywords.indexOf(keyword) === index,
  ),
};

export const siteUrl = new URL(site.path, site.origin).toString();
export const siteImageUrl = new URL(site.imagePath, site.origin).toString();
export const siteKeywords = site.keywords.join(", ");

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  description: site.description,
  url: siteUrl,
  image: siteImageUrl,
  email: `mailto:${profile.links.email}`,
  jobTitle: profile.title,
  worksFor: {
    "@type": "Organization",
    name: profile.company,
  },
  sameAs: [profile.links.linkedin, profile.links.github],
  alumniOf: education.map((entry) => ({
    "@type": "CollegeOrUniversity",
    name: entry.meta.split(" · ")[0],
  })),
  knowsAbout: skills.map((skill) => skill.name),
  mainEntityOfPage: siteUrl,
};

export const buildStructuredData = () => JSON.stringify(personJsonLd);

export const buildSeoFallback = () => {
  const socialLinks = [
    ["Email", `mailto:${profile.links.email}`],
    ["LinkedIn", profile.links.linkedin],
    ["GitHub", profile.links.github],
    ["Resume", profile.links.resume],
  ]
    .map(
      ([label, href]) =>
        `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`,
    )
    .join("");

  const skillItems = skills
    .map((skill) => `<li>${escapeHtml(skill.name)}</li>`)
    .join("");
  const experienceItems = experience
    .map(
      (entry) =>
        `<li><strong>${escapeHtml(entry.role)}</strong> <span>${escapeHtml(entry.meta)}</span></li>`,
    )
    .join("");
  const educationItems = education
    .map(
      (entry) =>
        `<li><strong>${escapeHtml(entry.degree)}</strong> <span>${escapeHtml(entry.meta)}</span></li>`,
    )
    .join("");
  const statItems = stats
    .map(
      (entry) =>
        `<li><strong>${escapeHtml(entry.number)}</strong> <span>${escapeHtml(entry.label)}</span></li>`,
    )
    .join("");

  return `
    <section class="seo-fallback" aria-label="Profile summary">
      <div class="seo-fallback__inner">
        <p class="seo-fallback__eyebrow">Digital business card</p>
        <h2>${escapeHtml(profile.name)}</h2>
        <p class="seo-fallback__title">${escapeHtml(profile.title)} at ${escapeHtml(profile.company)}</p>
        <p class="seo-fallback__description">${escapeHtml(profile.summary)}</p>
        <p class="seo-fallback__description">${escapeHtml(profile.description)}</p>
        <nav aria-label="Primary links">
          <ul class="seo-fallback__links">${socialLinks}</ul>
        </nav>
        <section>
          <h2>Skills</h2>
          <ul class="seo-fallback__pill-list">${skillItems}</ul>
        </section>
        <section>
          <h2>Experience</h2>
          <ul>${experienceItems}</ul>
        </section>
        <section>
          <h2>Education</h2>
          <ul>${educationItems}</ul>
        </section>
        <section>
          <h2>Highlights</h2>
          <ul>${statItems}</ul>
        </section>
      </div>
    </section>
  `.trim();
};

export const buildSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
