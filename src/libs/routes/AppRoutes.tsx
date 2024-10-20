import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainLayout } from '@/components/app';
import { AppRoute } from '@/constants';
import { Cart, Menu } from '@/pages';

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
    ],
  },
];

export const appRoutes = createBrowserRouter(APP_ROUTES);
