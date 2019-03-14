import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import store from './store/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {connect} from 'react-redux';
import * as actionCreators from './actions/index';
import { setCurrentUser, logoutUser } from './actions/authAction';
import io from 'socket.io-client';

//importing componets
import Auth from './containers/auth/auth';
import Home from './containers/home/home';
import Profile from './containers/profile/profile';
import Chat from './containers/chat/chat';
import SearchProfile from './containers/search/searchprofile';
import Message from './containers/message/message';
import {SET_PROFILE} from './actions/actionType';

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
    window.location.href = '/auth/login';
  }
}











class App extends Component {




componentDidMount(){
  if (this.props.auth.isAuthenticated) {
    this.props.setProfile()
    this.socket=io('/');
    this.socket.emit('adduser',{id:this.props.auth.user.id});
    this.socket.on('newrequest',(data)=>{
      store.dispatch({type:SET_PROFILE,payload:data})
    })
    this.socket.on('newnotification',(data)=>{
      console.log("new not",data);
      store.dispatch({type:SET_PROFILE,payload:data})
    })

    this.socket.on('newMessage',(data)=>{
      console.log("newMessage",data.message);
      store.dispatch({type:'USER_UPDATE_MESSAGE',payload:data.message})
    })
    this.socket.on('newMessageNot',(data)=>{
      console.log("newMessageNot",data);
      store.dispatch({type:SET_PROFILE,payload:data})
    })
  }
}


  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Route path='/auth'  component={Auth}/>
      <Route path='/' exact component={Home}/>
      <Route path='/profile' exact component={Profile}/>
      <Route path='/chat' exact component={Chat}/>
      <Route path='/profile/:id' exact component={SearchProfile}/>
      <Route path='/' component={Message}/>
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps=state=>({
  profile:state.search.searchPerson,
  auth:state.auth
})


const mapDispatchToProps=dispatch=>({
  setProfile:()=>{dispatch(actionCreators.setProfile())},
  updateProfile:(data)=>{dispatch(actionCreators.updateProfile(data))}
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
