import { useState } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorPage from "./ErrorPage";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import { logout } from "./logic/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: !isLoggedIn ? <SignIn onLogin={handleLogin} /> : <Navigate replace to="/" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate replace to="/login" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
