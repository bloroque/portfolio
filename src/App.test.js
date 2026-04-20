import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio app without crashing', () => {
  render(<App />);
  const heading = screen.getByRole('banner');
  expect(heading).toBeInTheDocument();
});
