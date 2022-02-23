import { render, screen } from '@testing-library/react';
import Listing from './Listing';

test('renders learn react link', () => {
  render(<Listing header={'Fest'} description={'mega fest'} publisher={'Sander'} />);

  expect(screen.getByRole('heading', {
    name: /Fest/i
  })).toBeInTheDocument();

  expect(screen.getByText('mega fest')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /sander/i })).toBeInTheDocument();
});
