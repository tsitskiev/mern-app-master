import React, { useContext, useState, useEffect } from 'react';
import { useHistory, NavLink, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (e) => {
    e.preventDefault();
    authContext.logout();
    history.push('/');
  };
  const [activeBar, setActiveBar] = useState(document.location.pathname);
  useEffect(() => {
    setActiveBar(document.location.pathname);
  }, [activeBar]);

  return (
    <nav>
      <div className="nav-wrapper blue darken-1 col s12">
        <Link
          to="/"
          className="brand-logo"
          style={{ marginLeft: '20px' }}
          onClick={() => setActiveBar('/create')}>
          LinkShortener
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li
            className={activeBar === '/create' ? 'active' : ''}
            onClick={() => setActiveBar('/create')}
            key="create">
            <NavLink to="/create">Create</NavLink>
          </li>
          <li
            className={activeBar === '/links' ? 'active' : ''}
            onClick={() => setActiveBar('/links')}
            key="links">
            <NavLink to="/links">Links</NavLink>
          </li>
          <li key="logout">
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
