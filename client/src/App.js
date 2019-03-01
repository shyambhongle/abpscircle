import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';



//importing componets
import Login from './../containers/auth/login/login';
import Register from './../containers/auth/register/register';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Route path="/auth/login" exact component={Login}/>
      <Route path="/auth/register" exact component={Register}/>
      </div>
    );
  }
}

export default App;
