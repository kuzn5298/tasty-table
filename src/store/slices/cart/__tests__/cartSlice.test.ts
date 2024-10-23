import cartReducer, {
  addMealToCart,
  removeMealFromCart,
  incrementMealInCart,
  decrementMealInCart,
  clearMealsFromCart,
} from '../cartSlice';
import { ShortMeal } from '@/types';
import { CartMeal } from '../cartTypes';

describe('[redux] cartSlice', () => {
  const initialState: { [id: string]: CartMeal } = {};

  const mockMeal1: ShortMeal = {
    id: '1',
    name: 'Pizza',
    img: 'image-url',
    price: 12,
  };

  const mockMeal2: ShortMeal = {
    id: '2',
    name: 'Burger',
    img: 'image-url',
    price: 8,
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add a meal to the cart (addMealToCart)', () => {
    const nextState = cartReducer(initialState, addMealToCart(mockMeal1));
    expect(nextState[mockMeal1.id]).toEqual({ ...mockMeal1, count: 1 });
  });

  it('should increment the count of meal if it exists in cart (addMealToCart)', () => {
    const stateWithMeal = { [mockMeal1.id]: { ...mockMeal1, count: 1 } };
    const nextState = cartReducer(stateWithMeal, addMealToCart(mockMeal1));
    expect(nextState[mockMeal1.id].count).toBe(2);
  });

  it('should increment the count of a meal in the cart (incrementMealInCart)', () => {
    const stateWithMeal = { [mockMeal1.id]: { ...mockMeal1, count: 1 } };
    const nextState = cartReducer(
      stateWithMeal,
      incrementMealInCart(mockMeal1.id)
    );
    expect(nextState[mockMeal1.id].count).toBe(2);
  });

  it('should decrement the count of a meal in the cart (decrementMealInCart)', () => {
    const stateWithMeal = { [mockMeal1.id]: { ...mockMeal1, count: 2 } };
    const nextState = cartReducer(
      stateWithMeal,
      decrementMealInCart(mockMeal1.id)
    );
    expect(nextState[mockMeal1.id].count).toBe(1);
  });

  it('should remove a meal from the cart when count reaches zero (decrementMealInCart)', () => {
    const stateWithMeal = { [mockMeal1.id]: { ...mockMeal1, count: 1 } };
    const nextState = cartReducer(
      stateWithMeal,
      decrementMealInCart(mockMeal1.id)
    );
    expect(nextState[mockMeal1.id]).toBeUndefined();
  });

  it('should remove a meal from the cart (removeMealFromCart)', () => {
    const stateWithMeal = { [mockMeal1.id]: { ...mockMeal1, count: 3 } };
    const nextState = cartReducer(
      stateWithMeal,
      removeMealFromCart(mockMeal1.id)
    );
    expect(nextState[mockMeal1.id]).toBeUndefined();
  });

  it('should clear all meals from the cart (clearMealsFromCart)', () => {
    const stateWithMeals = {
      [mockMeal1.id]: { ...mockMeal1, count: 2 },
      [mockMeal2.id]: { ...mockMeal2, count: 3 },
    };
    const nextState = cartReducer(stateWithMeals, clearMealsFromCart());
    expect(nextState).toEqual({});
  });
});
