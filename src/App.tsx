import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cookies from 'js-cookie';
import ErrorPage from "./components/error-page/ErrorPage";
import Landing from "./components/landing/Landing";
import UserInformation from "./components/user-management/UserInformation";
import Users from "./components/user-management/Users";
import { logout, checkLoggedIn } from "./logic/api";


const LOGIN_URL = 'https://auth.thewatergategroups.com';
const REDIRECT_URI = `${window.location.origin}`;


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    useEffect(() => {
        const checkLoginStatus = async () => {
            const authCookie = Cookies.get('session_id');
            if (!authCookie) {
              window.location.href = `${LOGIN_URL}/login?rd=${encodeURIComponent(REDIRECT_URI)}`;
            } else {
              const result = await checkLoggedIn();
              if (result) {
                setIsLoggedIn(true);
              } else {
                window.location.href = `${LOGIN_URL}/login?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
              }
            }
          };
          checkLoginStatus();
      }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        logout();
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute {...{ isLoggedIn }}>
                            <Dashboard onLogout={handleLogout}>
                                <Outlet />
                            </Dashboard>
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Landing />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:userId" element={<UserInformation />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

interface PrivateRouteProps {
    isLoggedIn: boolean;
    children: React.ReactNode;
}

const PrivateRoute = ({ isLoggedIn, children }: PrivateRouteProps) => {
    return isLoggedIn ? children : <Navigate to="/" />;
};
