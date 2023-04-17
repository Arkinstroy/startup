import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Stocks } from './stocks/stocks';
import { News } from './news/news';
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
            <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
            <NavLink to="/stocks" activeClassName="active-link">Stocks</NavLink>
            <NavLink to="/news" activeClassName="active-link">News</NavLink>
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
          exact
        />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/news' element={<News />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
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

      </footer>
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
