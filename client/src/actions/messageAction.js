import {OPEN_MSG_BOX,CLOSE_MSG_BOX,INBOX_MESSAGE} from './actionType';
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
            data.userMessages=res.data;
            console.log(data);
            dispatch({type:OPEN_MSG_BOX,payload:data})
          })
  }
}

export const closeMsgBox=()=>{
  return dispatch=>{
    dispatch({type:CLOSE_MSG_BOX})
  };
}

export const newMessage=({name,id,text,senderAvatar})=>{
  return dispatch=>{
    if (text==="") {
      return;
    }
    axios.post('/newmessage',{id,text,name,senderAvatar})
          .then(res=>{
            console.log(res);
            dispatch({type:'USER_UPDATE_MESSAGE',payload:res.data.message})
          })
  };
}




export const inboxMsg=(commonId,myid)=>{
  return dispatch=>{
    axios.post('/inbox',{commonId})
          .then(res=>{
            dispatch({type:INBOX_MESSAGE,payload:res.data});
          })
  }
}
