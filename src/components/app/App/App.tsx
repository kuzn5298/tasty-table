import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appRoutes } from '@/libs/routes';
import { store } from '@/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoutes} />;
    </Provider>
  );
};
