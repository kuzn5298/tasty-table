import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { cartStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartStorageMiddleware),
});
