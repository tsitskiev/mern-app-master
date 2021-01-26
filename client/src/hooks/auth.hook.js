import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const history = useHistory();
  const storageName = 'userData';

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem(storageName));
    if (storageData && storageData.token) {
      login(storageData.token, storageData.userId);
    }
    setReady(true);
  }, [login, history]);

  return { token, userId, login, logout, ready };
};

export default useAuth;
