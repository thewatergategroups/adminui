import { useState } from "react";
import "./App.css";
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

  return (
    <>
      {isLoggedIn ? (
        // Show DashboardPage if logged in
        <Dashboard onLogout={handleLogout} />
      ) : (
        // Show LoginPage if not logged in
        <SignIn onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
