import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appRoutes } from '@/libs/routes';
import { store } from '@/store';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={appRoutes} />;
      </Provider>
    </QueryClientProvider>
  );
};
