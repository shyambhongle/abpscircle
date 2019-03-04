import {SEARCH_INPUT,SEARCH_PROFILE,SEARCH_PROFILEPOST} from './actionType';
import axios from 'axios';

export const searchPerson=(e)=>{
return dispatch=>{

  let keyword=e.target.value
if (keyword.length>1) {
  axios.post('/search/input',{keyword})
        .then(res=>{
          dispatch({type:SEARCH_INPUT,payload:res.data})
        })
}
};
}


export const searchProfile=(id,history)=>{
  return dispatch=>{
    axios.post('/search/friendprofile',{id})
          .then(res=>{
            dispatch({type:SEARCH_PROFILE,payload:res.data})
            history.push(`/`)
            history.push(`/profile/${id}`)
          })
  }
}

export const searchProfilePost=(id)=>{
  return dispatch=>{
    axios.post('/search/friendpost',{id})
          .then(res=>{
            dispatch({type:SEARCH_PROFILEPOST,payload:res.data})
          })
  }
}