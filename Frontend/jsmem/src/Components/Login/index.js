import {React, useState } from 'react';
import { useNavigate}  from 'react-router-dom';
import Cookies from 'js-cookie'

import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // console.log(data);
  // const navigate = useNavigate()
  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = () => {
    console.log("Login Success");
    Cookies.set("jwt_token2","helloworld2",{expires:2});
    // console.log(redir);
    navigate("/")
  };

  const onSubmitUser = event => {
    event.preventDefault();
    if (username === 'jsmem' && password === 'jsm@2024') {
      onSubmitSuccess();
    } else {
      setUsername('');
      setPassword('');
      setErrorMsg('Invalid Credentials');
    }
  };

  return (
    <div className="login-form-container">
      <div>
        <img src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" className='login-logo' alt="img"/>
      </div>
      <form className="login-form" onSubmit={onSubmitUser}>
        <h1 className="main-heading">Camps Login</h1>
        <div className="form-ele">
          <label className='label-ele' htmlFor="username">Username</label>
          <br />
          <input
            className="input-ele"
            placeholder="USERNAME"
            id="username"
            type="text"
            onChange={onChangeUsername}
            value={username}
          />
        </div>
        <div className="form-ele">
          <label className='label-ele' htmlFor="password">Password</label>
          <br />
          <input
            className="input-ele"
            placeholder="PASSWORD"
            id="password"
            type="password"
            onChange={onChangePassword}
            value={password}
          />
        </div>
        <button className="submitBtn" type="submit">Submit</button>
        {errorMsg.length !== 0 && <p>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
