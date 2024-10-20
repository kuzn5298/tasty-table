import { RootState } from '../../rootTypes';

const MAX_CART_DISPLAY_COUNT = 99;

export const selectCartMeals = (state: RootState) => state.cart;

export const selectCartCount = (state: RootState) => {
  const count = Object.values(state.cart).reduce(
    (acc, meal) => acc + meal.count,
    0
  );

  return Math.min(count, MAX_CART_DISPLAY_COUNT);
};

export const selectCartTotal = (state: RootState) =>
  Object.values(state.cart).reduce(
    (acc, meal) => acc + meal.price * meal.count,
    0
  );
