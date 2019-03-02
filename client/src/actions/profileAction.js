import {SET_PROFILE} from './actionType';
import axios from 'axios';



export const setProfile=()=>{
  return dispatch=>{
    axios.get('/profile')
          .then(res=>{
            dispatch({type:SET_PROFILE,payload:res.data})
          })
  }
}
