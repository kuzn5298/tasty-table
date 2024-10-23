import {
  selectCartMeals,
  selectCartCount,
  selectCartTotal,
} from '../cartSelectors';
import { RootState } from '../../../rootTypes';
import { CartMeal } from '../cartTypes';

describe('cartSelectors', () => {
  const mockMeal1: CartMeal = {
    id: '1',
    name: 'Pizza',
    img: 'image-url',
    price: 12,
    count: 2,
  };

  const mockMeal2: CartMeal = {
    id: '2',
    name: 'Burger',
    img: 'image-url',
    price: 8,
    count: 3,
  };

  const state: RootState = {
    cart: {
      [mockMeal1.id]: mockMeal1,
      [mockMeal2.id]: mockMeal2,
    },
  };

  it('should return all meals from the cart (selectCartMeals)', () => {
    const cartMeals = selectCartMeals(state);
    expect(cartMeals).toEqual(state.cart);
  });

  it('should return the total count of meals in the cart (selectCartCount)', () => {
    const cartCount = selectCartCount(state);
    expect(cartCount).toBe(2 + 3);
  });

  it('should limit the cart count to MAX_CART_DISPLAY_COUNT (selectCartCount)', () => {
    const largeCountState: RootState = {
      cart: {
        [mockMeal1.id]: { ...mockMeal1, count: 100 },
        [mockMeal2.id]: { ...mockMeal2, count: 100 },
      },
    };
    const cartCount = selectCartCount(largeCountState);
    expect(cartCount).toBe(99);
  });

  it('should return the total price of meals in the cart (selectCartTotal)', () => {
    const cartTotal = selectCartTotal(state);
    expect(cartTotal).toBe(12 * 2 + 8 * 3);
  });

  it('should return 0 if the cart is empty (selectCartCount, selectCartTotal)', () => {
    const emptyState: RootState = { cart: {} };
    const cartCount = selectCartCount(emptyState);
    const cartTotal = selectCartTotal(emptyState);

    expect(cartCount).toBe(0);
    expect(cartTotal).toBe(0);
  });
});
