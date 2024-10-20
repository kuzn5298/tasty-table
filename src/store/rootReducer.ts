import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cart/cartSlice';

export const rootReducer = combineReducers({
  cart: cartReducer,
});
