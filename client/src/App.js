import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';



//importing componets

import Auth from './containers/auth/auth';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Route path='/auth'  component={Auth}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
