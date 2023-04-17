import React from 'react';
import { useNavigate } from 'react-router-dom';

import './authenticated.css';
import '../App.css';

export function Authenticated(props) {

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => props.onLogout());
  }

  return (
    <div>
      <main>
        <div className="flex main-content">
          <img className="image" src="./financialTrading.jpeg" alt="financial trading" />
          <div className="floating-div floating-top">
            <p>Analyze stock prices</p>
          </div>
          <div className="floating-div floating-middle">
            <p>Collect data on companies</p>
          </div>
          <div className="floating-div">
            <p>Aggregate data sources to make decisions</p>
          </div>
          <div className="login-div">
            <button className="login-buttons log-in" onClick={() => logout()}>Log out</button>
          </div>
        </div>
      </main>
    </div>
  );
}
