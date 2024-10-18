import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { cartReducer, categoryReducer, mealReducer } from './slices';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    meal: mealReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { cartActions, categoryActions, mealActions } from './slices';

export const selectTotal = (state: RootState) =>
  state.cart.meals.reduce((total, item) => total + item.price * item.count, 0);

const MAX_DISPLAY_COUNT = 99;
export const selectCount = (state: RootState) => {
  const count =
    state.cart.meals.reduce((total, item) => total + item.count, 0) ?? 0;
  return Math.min(count, MAX_DISPLAY_COUNT);
};
