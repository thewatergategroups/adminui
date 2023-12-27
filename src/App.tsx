import { useState } from 'react';
import './App.css'
import SignIn  from './components/SignIn'
import Dashboard  from './components/Dashboard'
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle successful login
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
  
    const handleLogout = () => {
      setIsLoggedIn(false);
      Cookies.remove("Authorization")
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
  )
}

export default App
