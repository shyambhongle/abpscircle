import {SET_PROFILE,BACK_POST,CLEAR_SCREEN_POST,BACK_POST_LOADING,RANDOM_SUGGESTION} from './actionType';
import axios from 'axios';



export const clearNotification=(id,query)=>{
  return dispatch=>{
    axios.post(`/profile/clear/${query}`,{id})
          .then(res=>{
            dispatch({type:SET_PROFILE,payload:res.data})
          })
  }
}

export const displayBackPost=(id)=>{
  return dispatch=>{
    dispatch({type:BACK_POST_LOADING});
    axios.post('/profile/getselectedpost',{id})
          .then(res=>{
            if (res.data.message) {
              dispatch({type:"NO_BACK_POST",payload:res.data})
            }else {
              dispatch({type:BACK_POST,payload:res.data})
            }
          })
  }
}

export const suggestion=()=>{
  return dispatch=>{
    axios.get('/suggestion')
          .then(res=>{
            console.log(res.data);
            dispatch({
              type:RANDOM_SUGGESTION,
              payload:res.data
            })
          })
  }
}

export const fade=()=>{
  return dispatch=>{
    dispatch({type:CLEAR_SCREEN_POST});
  }
}
