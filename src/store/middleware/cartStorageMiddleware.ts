import { Action, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../rootTypes';

export const cartStorageMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const typedAction = action as Action;
    const result = next(action);

    const state: RootState = storeAPI.getState();

    if (typedAction.type.startsWith('cart/')) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }

    return result;
  };
