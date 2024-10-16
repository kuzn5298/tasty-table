import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { Cart, Meal, Menu } from '../../pages';
import { MainLayout } from '../../components';

const APP_ROUTES: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoute.Home,
        element: <Menu />,
      },
      {
        path: AppRoute.Cart,
        element: <Cart />,
      },
      {
        path: AppRoute.Meal,
        element: <Meal />,
      },
    ],
  },
];

export default createBrowserRouter(APP_ROUTES);
