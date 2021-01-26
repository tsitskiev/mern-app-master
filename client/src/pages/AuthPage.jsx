import React, { useState, useEffect, useContext } from 'react';
import { useHttp, useMessage } from '../hooks';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const message = useMessage();
  const authContext = useContext(AuthContext);
  const { loading, request, error, clearErrors } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });
  const changesHandler = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    message(error);
    clearErrors();
  }, [error, message, clearErrors]);
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const registerHandler = async () => {
    try {
      await request('/api/auth/register', 'POST', { ...form });
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      authContext.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 style={{ textAlign: 'center' }}>Link Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <form>
                <div className="input-field">
                  <input
                    placeholder="Enter your Email"
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={changesHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    placeholder="Enter your password"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changesHandler}
                    autoComplete="on"
                  />

                  <label htmlFor="password">Password</label>
                </div>
              </form>
            </div>
          </div>

          <div className="card-action">
            <button className="btn yellow darken-4" disabled={loading} onClick={loginHandler}>
              Login
            </button>
            <button
              className="btn gray darken-4 black-text"
              onClick={registerHandler}
              disabled={loading}
              style={{ marginLeft: '20px' }}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
