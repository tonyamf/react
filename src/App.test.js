import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('the external link opens safely in a new tab', () => {
  render(<App />);
  const link = screen.getByRole('link', { name: /learn react/i });
  expect(link).toHaveAttribute('href', 'https://reactjs.org');
  expect(link).toHaveAttribute('target', '_blank');
  // noopener/noreferrer stop the new page getting window.opener access
  expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
});

test('renders the logo image and the edit hint', () => {
  render(<App />);
  expect(screen.getByAltText('logo')).toHaveClass('App-logo');
  expect(screen.getByText('src/App.js')).toBeInTheDocument();
});
