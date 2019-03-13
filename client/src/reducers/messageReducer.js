import {OPEN_MSG_BOX,USER_UPDATE_MESSAGE} from './../actions/actionType';


const initialState={
  MsgBox:false,
  name:'',
  avatar:'',
  id:null,
  userMessages:[]
}

const messageReducer=(state=initialState,action)=>{
  switch (action.type) {
    case OPEN_MSG_BOX:
    return {
      ...state,
      MsgBox:true,
      name:action.payload.name,
      avatar:action.payload.avatar,
      id:action.payload.id,
      userMessages:action.payload.userMessages
    };
    case USER_UPDATE_MESSAGE:
      return {
        ...state,
        userMessages:action.payload.message
      };
    default:
      return state;
  }
}


export default messageReducer;
