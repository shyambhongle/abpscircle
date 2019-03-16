import {SET_PROFILE,BACK_POST,CLEAR_SCREEN_POST,BACK_POST_LOADING} from './actionType';
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
            dispatch({type:BACK_POST,payload:res.data})
          })
  }
}


export const fade=()=>{
  return dispatch=>{
    dispatch({type:CLEAR_SCREEN_POST});
  }
}
