import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@tests/helpers';
import { MainLayout } from './MainLayout';

jest.mock('@/components/ui/Spinner', () => ({
  Spinner: () => <div data-testid='spinner'>Loading...</div>,
}));

jest.mock('../Header', () => () => (
  <header data-testid='header'>Header</header>
));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: React.lazy(() =>
    Promise.resolve({
      default: () => <div data-testid='outlet'>Lazy Loaded Content</div>,
    })
  ),
}));

describe('MainLayout component', () => {
  it('should render lazy-loaded content and spinner', async () => {
    const { queryByTestId } = renderWithProviders(<MainLayout />);

    expect(queryByTestId('spinner')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId('outlet')).toBeInTheDocument()
    );
    expect(queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should render header and outlet', async () => {
    const { getByTestId } = renderWithProviders(<MainLayout />);

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('outlet')).toBeInTheDocument();
  });
});
