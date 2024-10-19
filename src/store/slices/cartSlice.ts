import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShortMeal } from './../../types';

interface StoreMeal extends ShortMeal {
  count: number;
}

interface CartState {
  meals: StoreMeal[];
}

const initialState: CartState = {
  meals: [],
};

const increment = (state: CartState, id: string) => {
  const meal = state.meals.find((meal) => meal.id === id);
  if (meal) meal.count++;
};

const remove = (state: CartState, id: string) => {
  state.meals = state.meals.filter((meal) => meal.id !== id);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Omit<StoreMeal, 'count'>>) => {
      const isInCart = state.meals.some(
        (meal) => meal.id === action.payload.id
      );
      if (isInCart) {
        increment(state, action.payload.id);
      } else {
        state.meals.push({ ...action.payload, count: 1 });
      }
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      remove(state, action.payload);
    },
    incrementMeal: (state, action: PayloadAction<string>) => {
      increment(state, action.payload);
    },
    decrementMeal: (state, action: PayloadAction<string>) => {
      const meal = state.meals.find((meal) => meal.id === action.payload);
      if (meal) {
        meal.count--;
        if (meal.count <= 0) {
          remove(state, action.payload);
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
