import {SET_PROFILE,UPDATE_USER_DATA,EDIT_INFO_PROFILE,ADD_POST} from './actionType';
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
    dispatch({type:"PROFILE_PIC_LOADING"})
    axios.post('/profile/profilepicture',data)
          .then(res=>{
            dispatch({type:UPDATE_USER_DATA,payload:res.data.avatar})
            dispatch({type:SET_PROFILE,payload:res.data})
          });
}}

export const updateCoverPicture=(data)=>{
  return dispatch=>{
    dispatch({type:"COVER_PIC_LOADING"})
    axios.post('/profile/coverpicture',data)
          .then(res=>{
            dispatch({type:UPDATE_USER_DATA,payload:res.data.avatar})
            dispatch({type:SET_PROFILE,payload:res.data})
          });
}}



export const privateacc=(data)=>{
  return dispatch=>{
    axios.post('/profile/privatization',{bole:data})
    .then(res=>{
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



export const editprofiledata=(data)=>{
  return dispatch=>{
    axios.post('/profile/editinfo',data)
          .then(res=>{
            dispatch({type:EDIT_INFO_PROFILE,payload:res.data})
          })
  }
}
