import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');
  const changeHandler = (e) => {
    setLink(e.target.value);
  };
  const buttonPresshandler = async () => {
    try {
      const data = await request(
        '/api/link/generate',
        'POST',
        { from: link },
        { Authorization: `Bearer ${auth.token}` },
      );
      history.push(`/detail/${data.link._id}`);
    } catch (err) {}
  };
  const enterPressHandler = (e) => {
    if (e.key === 'Enter') buttonPresshandler();
  };
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="input-field" style={{ marginTop: '40px' }}>
            <input
              placeholder="Enter link"
              id="link"
              type="text"
              value={link}
              onChange={changeHandler}
              onKeyPress={enterPressHandler}
            />
            <label htmlFor="link">Your link</label>
          </div>
          <button
            className="btn yellow darken-4"
            disabled={link.length === 0}
            onClick={buttonPresshandler}>
            Shorten your link
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
