import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useRoutes from './routes';
import { useAuth } from './hooks';
import { NavBar, Loader } from './components';
import AuthContext from './context/AuthContext';
import 'materialize-css';

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      <Router>
        <div className="container">
          {isAuthenticated && <NavBar />}
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
