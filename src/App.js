import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Stocks } from './stocks/stocks';
import { News } from './news/news';
import { Saved } from './news/saved';
import { AuthState } from './login/authState';
import './App.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  // Asynchronously determine if the user is authenticated by calling the service
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);

  return (
    <div>
      <header>
        <div className="flex">
          <p className="flex-grow main-title">Makoshika</p>
        </div>
          {authState === AuthState.Authenticated && (<div className="flex tabs">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/stocks">Stocks</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/saved">Saved</NavLink>
          </div>)}
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
        />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/news' element={<News />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
        <div className="footer-grid">
          <p className="grid-title">Why Makoshika?</p>
          <p className="grid-title">Enterprise Solutions</p>
          <p className="grid-title">More Resources</p>

          <p>About Us</p>
          <p>Cloud Scalability</p>
          <p>Documentation</p>

          <p>Diversity and Inclusion</p>
          <p>Enterprise Pricing</p>
          <p>Student Discounts</p>

          <p>Security</p>
          <p>Enterprise Features</p>
          <p>Develop Plugins</p>
        </div>
        <a className="github-link" href="https://github.com/Arkinstroy/startup">Github</a>
      </footer>
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
