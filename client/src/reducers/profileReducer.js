import {SET_PROFILE} from './../actions/actionType';

const initialState={
  profile:{}
}

export default function(state=initialState,action){
  switch (action.type) {
    case SET_PROFILE:

      return{
        profile:{
          ...action.payload
        }
      }

  default:
        return state;
  }
}
