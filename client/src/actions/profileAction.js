import {SET_PROFILE,UPDATE_USER_DATA} from './actionType';
import axios from 'axios';



export const setProfile=()=>{
  return dispatch=>{
    axios.get('/profile')
          .then(res=>{
            dispatch({type:SET_PROFILE,payload:res.data})
          })
  }
}




export const updateProfilePicture=(data)=>{
  return dispatch=>{
    axios.post('/profile/profilepicture',data)
          .then(res=>{
            dispatch({type:UPDATE_USER_DATA,payload:res.data.avatar})
            dispatch({type:SET_PROFILE,payload:res.data})
          })
  }
}



export const addFriend=(data)=>{
  return dispatch=>{
    axios.post('/util/addfriend',data)
        .then(res=>{
          dispatch({type:SET_PROFILE,payload:res.data})
        })
  };
}

export const acceptRequest=(data)=>{
  return dispatch=>{
    axios.post('/util/acceptrequest',data)
        .then(res=>{
          dispatch({type:SET_PROFILE,payload:res.data})
        })
  };
}


export const cancelRequest=(data)=>{
  return dispatch=>{
    axios.post('/util/cancelrequest',data)
        .then(res=>{
          dispatch({type:SET_PROFILE,payload:res.data})
        })
  };
}


export const reject=(data)=>{
  return dispatch=>{
    axios.post('/util/reject',data)
        .then(res=>{
          dispatch({type:SET_PROFILE,payload:res.data})
        })
  };
}


export const unfriend=(data)=>{
  return dispatch=>{
    axios.post('/util/unfriend',data)
        .then(res=>{
          dispatch({type:SET_PROFILE,payload:res.data})
        })
  };
}
