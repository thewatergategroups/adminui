import { useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import ErrorPage from "./components/error-page/ErrorPage";
import Landing from "./components/landing/Landing";
import UserInformation from "./components/user-management/UserInformation";
import Users from "./components/user-management/Users";
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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={!isLoggedIn ? <SignIn onLogin={handleLogin} /> : <Navigate replace to="/" />} />
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
    return isLoggedIn ? children : <Navigate to="/login" />;
};
