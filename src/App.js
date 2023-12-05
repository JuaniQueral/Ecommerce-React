import { useContext } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Protected from './components/routes/Protected';
import NotFound from './components/routes/NotFound';
import { ThemeContext } from './components/services/theme/theme.context';
import Spinner from './components/ui/Spinner/Spinner';
import { APIContext } from './components/services/api/api.context';
import ShoppingCartView from './components/ShoppingCartView/ShoppingCartView';
import Register from './components/Register/Register';
import Users from './components/Users/Users';
import { ToastContainer } from 'react-toastify';
import Products from './components/Products/Products';
import OrdersTable from './components/Orders/Orders';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { isLoading } = useContext(APIContext);

  const router = createBrowserRouter([
    { path: '/', element: <Navigate to='login' /> },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: (
        <Protected>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: '/cart',
      element: (
        <Protected role={'USER'}>
          <ShoppingCartView />
        </Protected>
      ),
    },
    {
      path: '/users',
      element: (
        <Protected role={'ROOT'}>
          <Users />
        </Protected>
      ),
    },
    {
      path: '/products',
      element: (
        <Protected role={'ADMIN'}>
          <Products />
        </Protected>
      ),
    },
    {
      path: '/orders',
      element: (
        <Protected role={'USER'}>
          <OrdersTable />
        </Protected>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return (
    <div className={`${theme === 'dark' && 'dark-theme'}`}>
      {isLoading && <Spinner />}
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
