import { configureStore, Middleware } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { cartStorageMiddleware } from './middleware';
import { RootState } from './rootTypes';

interface SetupStoreOptions {
  middlewares?: Middleware[];
  preloadedState?: Partial<RootState>;
}

export const setupStore = (options?: SetupStoreOptions) => {
  const { middlewares = [], preloadedState = {} } = options ?? {};
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
    preloadedState,
  });
};

export const store = setupStore({ middlewares: [cartStorageMiddleware] });
