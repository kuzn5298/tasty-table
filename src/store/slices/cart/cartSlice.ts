import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShortMeal } from '@/types';
import { StoreMeal } from './cartTypes';

interface CartState {
  [id: string]: StoreMeal;
}

const initialState: CartState = {};

const increment = (state: CartState, id: string) => {
  const meal = state[id];
  if (meal) meal.count++;
};

const remove = (state: CartState, id: string) => {
  delete state[id];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMealToCart: (state, action: PayloadAction<ShortMeal>) => {
      const meal = action.payload;
      const isInCart = Boolean(state[meal.id]);
      if (isInCart) {
        increment(state, meal.id);
      } else {
        state[meal.id] = { ...meal, count: 1 };
      }
    },
    removeMealFromCart: (state, action: PayloadAction<string>) => {
      remove(state, action.payload);
    },
    incrementMealInCart: (state, action: PayloadAction<string>) => {
      increment(state, action.payload);
    },
    decrementMealInCart: (state, action: PayloadAction<string>) => {
      const meal = state[action.payload];
      if (meal) {
        meal.count--;
        if (meal.count <= 0) {
          remove(state, action.payload);
        }
      }
    },
  },
});

export const {
  addMealToCart,
  decrementMealInCart,
  incrementMealInCart,
  removeMealFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
