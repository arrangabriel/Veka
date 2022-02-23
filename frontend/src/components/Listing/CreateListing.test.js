import { render, screen } from '@testing-library/react';
import CreateListing from './CreateListing';

test('renders learn react link', () => {
  render(<CreateListing />);
  const linkElement = screen.getByText(/Tittel/i);
  expect(linkElement).toBeInTheDocument();
});