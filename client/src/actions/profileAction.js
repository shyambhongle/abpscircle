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


export const addFriend=(data)=>{
  return dispatch=>{
    axios.post('/util/addfriend',data)
        .then(res=>{
          console.log(res);
        })
  };
}

export const acceptRequest=(data)=>{
  return dispatch=>{
    axios.post('/util/acceptrequest',data)
        .then(res=>{
          console.log(res);
        })
  };
}


export const cancelRequest=(data)=>{
  return dispatch=>{
    axios.post('/util/cancelrequest',data)
        .then(res=>{
          console.log(res);
        })
  };
}


export const reject=(data)=>{
  return dispatch=>{
    axios.post('/util/reject',data)
        .then(res=>{
          console.log(res);
        })
  };
}


export const unfriend=(data)=>{
  return dispatch=>{
    axios.post('/util/unfriend',data)
        .then(res=>{
          console.log(res);
        })
  };
}
