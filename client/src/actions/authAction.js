import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {setProfile} from './profileAction';
import store from './../store/store';

import { GET_ERRORS, SET_CURRENT_USER,CLEAR_ERRORS} from './actionType';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/auth/register', userData)
    .then(res => {history.push('/auth/login')})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = (userData,history) => dispatch => {
  axios
    .post('/auth/login', userData)
    .then(res => {
      dispatch({type:"AUTH_LOAD"})
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      store.dispatch(setProfile());
      history.push('/');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = (history) => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  if (history) {
    history.push('/auth/login')
  }
};

export const changepassword=(data,history)=>{
  return dispatch=>{
    axios.post('/auth/changepassword',data)
        .then(res=>{
          console.log(res.data.message);
          if (res.data.message==="successful") {
            dispatch(logoutUser(history));
          }
          else{
            dispatch({
              type: GET_ERRORS,
              payload: res.data
            })
          }
        })
  }
}


export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload:{}
  };
};
