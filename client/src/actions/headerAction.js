import {SET_PROFILE} from './actionType';
import axios from 'axios';



export const clearNotification=(id,query)=>{
  return dispatch=>{
    axios.post(`/profile/clear/${query}`,{id})
          .then(res=>{
            dispatch({type:SET_PROFILE,payload:res.data})
          })
  }
}
