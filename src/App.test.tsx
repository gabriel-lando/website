import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { profile, skills, experience, education, stats } from './config';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('renders the flip card button', () => {
    render(<App />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

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

  it('renders the email link with correct href', () => {
    const link = screen.getByText(profile.links.email).closest('a');
    expect(link).toHaveAttribute('href', `mailto:${profile.links.email}`);
  });

  it('renders the LinkedIn label with correct href', () => {
    const link = screen.getByText(profile.links.linkedin.label).closest('a');
    expect(link).toHaveAttribute('href', profile.links.linkedin.url);
  });

  it('renders the GitHub label with correct href', () => {
    const link = screen.getByText(profile.links.github.label).closest('a');
    expect(link).toHaveAttribute('href', profile.links.github.url);
  });

  it('renders the resume link', () => {
    const link = screen.getByText('Resume / CV').closest('a');
    expect(link).toHaveAttribute('href', profile.links.resume);
  });
});

describe('Back card content', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(async () => {
    user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button'));
  });

  it('renders the first skills line', () => {
    expect(screen.getByText(skills[0])).toBeInTheDocument();
  });

  it('renders the second skills line', () => {
    expect(screen.getByText(skills[1])).toBeInTheDocument();
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
