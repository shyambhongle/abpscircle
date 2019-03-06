


export const updateProfile=(data)=>{
  return dispatch=>{
    dispatch({type:'SET_PROFILE',payload:data})
  }
}
