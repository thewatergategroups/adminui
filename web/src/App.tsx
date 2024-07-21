import "@mantine/dates/styles.css";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/error-page/ErrorPage";
import Landing from "./components/landing/Landing";
import Clients from "./components/permissions/Clients";
import Cookies from "js-cookie";
import Roles from "./components/permissions/Roles";
import Scopes from "./components/permissions/Scopes";
import Users from "./components/permissions/Users";
import {  handleCheckLoggedIn, handleLogout, IDENTITY_URL } from "./logic/api";
import Parameters from "./components/secrets/Parameters";
import Domains from "./components/domains/Domains";
import BacktestResults from "./components/trading/BacktestResults";
import Toes from "./components/trading/Toes";
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
        window.location.href = `${IDENTITY_URL}/login?rd=${encodeURIComponent(REDIRECT_URI)}`;
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
                    <Route path="secrets" element={<Parameters />} />
                    <Route path="domains" element={<Domains />} />
                    <Route path="users" element={<Users />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="scopes" element={<Scopes />} />
                    <Route path="backtests" element={<BacktestResults />} />
                    <Route path="toes" element={<Toes />} />
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
