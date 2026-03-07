import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { profile, skills, experience, education, stats } from './config';

describe('App', () => {
  it('flips the card when clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen.getByRole('button');
    const before = card.getAttribute('aria-label');
    await user.click(card);
    const after = card.getAttribute('aria-label');

    expect(after).not.toBe(before);
  });

  it('flips back when clicked again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen.getByRole('button');
    const original = card.getAttribute('aria-label');
    await user.click(card);
    await user.click(card);

    expect(card.getAttribute('aria-label')).toBe(original);
  });
});

describe('Front card content', () => {
  beforeEach(() => render(<App />));

  it('renders the profile name', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name);
  });

  it('renders the profile title', () => {
    expect(screen.getByText(profile.title)).toBeInTheDocument();
  });

  it('renders the company name', () => {
    expect(screen.getByText(profile.company)).toBeInTheDocument();
  });

  it('renders the profile summary', () => {
    expect(screen.getByText(profile.summary)).toBeInTheDocument();
  });

  it('renders the email link with correct href', () => {
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', `mailto:${profile.links.email}`);
  });

  it('renders the LinkedIn link with correct href', () => {
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', profile.links.linkedin);
  });

  it('renders the GitHub link with correct href', () => {
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', profile.links.github);
  });

  it('renders the resume link', () => {
    expect(screen.getByLabelText('Resume')).toHaveAttribute('href', profile.links.resume);
  });
});

describe('Back card content', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(async () => {
    user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button'));
  });

  it('renders the first skill', () => {
    expect(screen.getByText(skills[0].name)).toBeInTheDocument();
  });

  it('renders the second skill', () => {
    expect(screen.getByText(skills[1].name)).toBeInTheDocument();
  });

  it('renders the experience role', () => {
    expect(screen.getByText(experience[0].role)).toBeInTheDocument();
  });

  it('renders the experience meta', () => {
    expect(screen.getByText(experience[0].meta)).toBeInTheDocument();
  });

  it('renders each education degree', () => {
    education.forEach((ed) => {
      expect(screen.getByText(ed.degree)).toBeInTheDocument();
    });
  });

  it('renders each education meta', () => {
    education.forEach((ed) => {
      expect(screen.getByText(ed.meta)).toBeInTheDocument();
    });
  });

  it('renders all stat numbers', () => {
    stats.forEach((s) => {
      expect(screen.getByText(s.number)).toBeInTheDocument();
    });
  });

  it('renders all stat labels', () => {
    stats.forEach((s) => {
      expect(screen.getByText(s.label)).toBeInTheDocument();
    });
  });

  it('renders stat links with correct hrefs', () => {
    stats
      .filter((s) => s.url)
      .forEach((s) => {
        const link = screen.getByText(s.label).closest('a');
        expect(link).toHaveAttribute('href', s.url);
      });
  });
});
