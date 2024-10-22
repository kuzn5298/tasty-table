import { render } from '@testing-library/react';
import { App } from './App';

test('Renders App components', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
