import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button data-testid="sampleBtn">Click me</Button>);
  expect(screen.getByTestId('sampleBtn')).toHaveTextContent('Click me');
});
