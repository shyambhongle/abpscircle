const initialState={
  loading:false
}

export default  function(state=initialState,action){
  switch (action.type) {
    case "AUTH_LOAD":
      return {
        loading:true
      }
    case "CLEAR_LOAD":
    return {
      loading:false
    }
    default:
      return state;
  }
}
