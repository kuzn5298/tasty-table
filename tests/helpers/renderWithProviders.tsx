import { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { wrapWithStore } from './wrapWithStore';
import { wrapWithRouter } from './wrapWithRouter';
import { RootState, setupStore } from '../../src/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  storeOptions?: {
    preloadedState?: Partial<RootState>;
  };
  routerOptions?: {
    path: string;
  };
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { storeOptions, routerOptions, ...renderOptions }: ExtendedRenderOptions = {}
) => {
  const store = setupStore(storeOptions);

  const Wrapper = ({ children }: PropsWithChildren) =>
    wrapWithStore(wrapWithRouter(children, routerOptions?.path), store);

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
