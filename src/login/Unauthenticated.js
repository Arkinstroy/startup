import { useState } from 'react';

import '../App.css';

export function Unauthenticated(props) {
  const [userName, setUserName] = useState(props.userName);
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='username'
          />
        </div>
        <div className="login-form">
          <label htmlFor="password">Password:</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <div className="login-div">
          <button className="login-buttons log-in" onClick={() => loginUser()}>Login</button>
          <button className="login-buttons sign-up" onClick={() => createUser()}>Sign up</button>
        </div>
        {!!displayError && (<div className="login-div">
          <p>{displayError}</p>
          <button className="login-buttons log-in" onClick={() => setDisplayError(null)}>clear</button>
        </div>)}
      </div>
    </>
  );
}
