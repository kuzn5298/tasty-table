import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appRoutes } from '../../libs/routes';
import { store } from '../../store';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoutes} />;
    </Provider>
  );
};

export default App;
