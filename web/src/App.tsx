import "@mantine/dates/styles.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/error-page/ErrorPage";
import Landing from "./components/landing/Landing";
import Clients from "./components/permissions/Clients";
import Roles from "./components/permissions/Roles";
import Scopes from "./components/permissions/Scopes";
import Users from "./components/permissions/Users";
import { IDENTITY_URL, handleCheckLoggedIn, handleLogout } from "./logic/api";

const REDIRECT_URI = `${window.location.origin}`;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const authCookie = Cookies.get("session_id");
            if (!authCookie) {
                window.location.href = `${IDENTITY_URL}/login?rd=${encodeURIComponent(REDIRECT_URI)}`;
            } else {
                const result = await handleCheckLoggedIn();
                if (result) {
                    setIsLoggedIn(true);
                } else {
                    window.location.href = `${IDENTITY_URL}/login?rd=${encodeURIComponent(REDIRECT_URI)}`;
                }
            }
        };
        checkLoginStatus();
    }, []);

    const Logout = () => {
        setIsLoggedIn(false);
        handleLogout();
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute {...{ isLoggedIn }}>
                            <Dashboard onLogout={Logout}>
                                <Outlet />
                            </Dashboard>
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Landing />} />
                    <Route path="users" element={<Users />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="scopes" element={<Scopes />} />
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
