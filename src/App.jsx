import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setSessionToken(token);
    }
  }, []);

  const updateLocalStorage = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setSessionToken(undefined);
  };

  return (
    <BrowserRouter>
      <AppRoutes sessionToken={sessionToken} updateLocalStorage={updateLocalStorage} logout={logout} />
    </BrowserRouter>
  );
}

export default App;
