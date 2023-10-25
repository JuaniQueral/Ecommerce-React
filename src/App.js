import { useContext } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Protected from "./components/routes/Protected";
import NotFound from "./components/routes/NotFound";
import { ThemeContext } from "./components/services/theme/theme.context";
import Spinner from "./components/ui/Spinner/Spinner";
import { APIContext } from "./components/services/api/api.context";
import ProductsList from "./components/Products/products";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { isLoading } = useContext(APIContext);

  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="login" /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <Protected>
          <Dashboard />
          <ProductsList />
        </Protected>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className={`${theme === "dark" && "dark-theme"}`}>
      {isLoading && <Spinner />}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
