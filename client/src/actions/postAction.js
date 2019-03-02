import {RETRIVE_POST,PROFILE_POST,NEW_POST} from './actionType';
import axios from 'axios';


export const retrivePost=()=>{
  return dispatch=>{
    axios.get('/post')
          .then(res=>{
            dispatch({type:RETRIVE_POST,payload:res.data})
          }).catch(err=>console.log(err))
  };
}


export const profilePost=()=>{
  return dispatch=>{
    axios.get('/post/profile')
          .then(res=>{
            console.log(res);
            dispatch({type:PROFILE_POST,payload:res.data})
          })
  }
}


export const newPost=(payload)=>{
  return dispatch=>{
    axios.post('/post',payload)
        .then(res=>{
          axios.get('/post/profile')
                .then(res=>{
                console.log(res);
                dispatch({type:PROFILE_POST,payload:res.data})
                })
          axios.get('/post')
                 .then(res=>{
                  dispatch({type:RETRIVE_POST,payload:res.data})
                  }).catch(err=>console.log(err))
        })
  }
}