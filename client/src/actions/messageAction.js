import {OPEN_MSG_BOX,USER_UPDATE_MESSAGE} from './actionType';
import axios from 'axios';




export const openMsgBox=({name,id,avatar})=>{
  return dispatch=>{
    let data={
      name,
      id,
      avatar
    }
    axios.post('/usermessage',{id})
          .then(res=>{
            data.userMessages=res.data
            dispatch({type:OPEN_MSG_BOX,payload:data})
          })
  }
}



export const newMessage=({name,id,text})=>{
  return dispatch=>{
    axios.post('/newmessage',{id,text,name})
          .then(res=>{
            dispatch({type:USER_UPDATE_MESSAGE,payload:res.data})
          })
  };
}
