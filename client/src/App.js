import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import store from './store/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';

//importing componets
import Auth from './containers/auth/auth';
import Home from './containers/home/home';
import Profile from './containers/profile/profile';



// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}











class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Route path='/auth'  component={Auth}/>
      <Route path='/' exact component={Home}/>
      <Route path='/profile' exact component={Profile}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
