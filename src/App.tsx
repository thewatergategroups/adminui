import { useState,useEffect } from 'react';
import './App.css'
import SignIn  from './components/SignIn'
import Dashboard  from './components/Dashboard'
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkedLoggedIn = Cookies.get("token")
    if (checkedLoggedIn !== undefined){
      setIsLoggedIn(true)
      console.log("logged in")
    }
  })
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token")
  };
  // checkLoggedIn();
  
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
