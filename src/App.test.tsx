import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

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
