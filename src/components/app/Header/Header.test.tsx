import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers'; // Убедись, что этот хелпер настроен правильно
import { AppRoute } from '@/constants';
import { mockCartMealsMap } from '@tests/mocks';
import { selectCartCount } from '@/store';
import Header from './Header';

jest.mock('@/components/icons', () => ({
  CartIcon: () => <svg data-testid='cart-icon' />,
}));

describe('<Button />', () => {
  it('should render the logo', () => {
    const { getByTestId } = renderWithProviders(<Header />);

    expect(getByTestId('logo-link')).toBeInTheDocument();
  });

  it('should render the cart link', () => {
    const { getByTestId } = renderWithProviders(<Header />);

    expect(getByTestId('cart-link')).toBeInTheDocument();
  });

  it('should show cart count when cart is not empty', () => {
    const { container, store } = renderWithProviders(<Header />, {
      storeOptions: { preloadedState: { cart: mockCartMealsMap } },
    });

    const count = selectCartCount(store.getState());

    expect(container.querySelector('.cartBadge')?.textContent).toBe(
      String(count)
    );
  });

  it('should navigate to home on logo click', async () => {
    const { getByTestId } = renderWithProviders(<Header />, {
      routerOptions: {
        path: AppRoute.Cart,
      },
    });

    const logoLink = getByTestId('logo-link');
    const location = getByTestId('location-display');

    expect(location.textContent).toBe(AppRoute.Cart);
    await userEvent.click(logoLink);
    expect(location.textContent).toBe(AppRoute.Home);
  });

  it('should navigate to cart on cart link click', async () => {
    const { getByTestId } = renderWithProviders(<Header />);

    const cartLink = getByTestId('cart-link');
    const location = getByTestId('location-display');

    expect(location.textContent).toBe(AppRoute.Home);
    await userEvent.click(cartLink);
    expect(location.textContent).toBe(AppRoute.Cart);
  });
});
