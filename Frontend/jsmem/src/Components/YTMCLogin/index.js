import {React, useState } from 'react';
import { useNavigate}  from 'react-router-dom';
import Cookies from 'js-cookie'
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

import './index.css';


const YTMCLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [userExist, setUserExist] = useState(false);
  // console.log(data);
  // const navigate = useNavigate()
  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const check = async (arg) => {
    // console.log("I am Check Function")
    const response = await fetch(`https://js-member-backend.vercel.app/users/${arg}`)
    const data = await response.json()
    if(data.success)
    {
      return true
    }
    else
    return false
    }

  const onSubmitSuccess = () => {
    console.log("Login Success");
    Cookies.set("jwt_token2","helloworld2",{expires:2});
    // console.log(redir);
    navigate("/ytmcregister")
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
         <h1 className="main-heading">YTMC Login</h1>
        {/* <div className="form-ele">
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
        <h1 style={{textAlign:'center'}}>OR</h1> */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin 
            onSuccess={async (credentialResponse) => {
              // console.log(credentialResponse)
              const token = jwtDecode(credentialResponse.credential)
              const {email,name} = token
              setEmail(email);
              setName(name);
              const res = await check(email)
            //   const { profileObj } = credentialResponse;
            // const userId = profileObj.googleId;
            // const userName = profileObj.name;
            // const userEmail = profileObj.email;
            // // Add your custom logic here (e.g., store user details, navigate to another page)
            // console.log("User ID:", userId);
            // console.log("User Name:", userName);
            // console.log("User Email:", userEmail);
            if(!res)
                navigate("/ytmcregister",{ state: {email,Googlename:name} })
            else 
              navigate("/ytmchome")
            }}
            onError={() => {
                console.log("Login Failed")
            }}
            />
            </GoogleOAuthProvider>
      </form>
    </div>
  );
};

export default YTMCLogin;
