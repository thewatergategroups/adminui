import { useState,useEffect } from 'react';
import './App.css'
import SignIn  from './components/SignIn'
import Dashboard  from './components/Dashboard'
import Cookies from 'js-cookie';


const parseJwt = (token:string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = Cookies.get("token")
    if (!token){ return; }
    const decodedPayload = parseJwt(token)
    if (decodedPayload && typeof decodedPayload === 'object' && 'exp' in decodedPayload) {
      const expirationTime = decodedPayload?.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (expirationTime && currentTimestamp < expirationTime) { setIsLoggedIn(true) } 
    }
  },[])
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
