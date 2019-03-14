import {OPEN_MSG_BOX,USER_UPDATE_MESSAGE,CLOSE_MSG_BOX,INBOX_MESSAGE} from './../actions/actionType';


const initialState={
  MsgBox:false,
  name:'',
  avatar:'',
  id:null,
  userMessages:[],
  inbox:[]
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
    case CLOSE_MSG_BOX:
      return {
        ...state,
        MsgBox:false,
      };

    case 'USER_UPDATE_MESSAGE':
    console.log("reached data to reducer",action.payload);
      return {
        ...state,
        userMessages:action.payload
      };
    case INBOX_MESSAGE:

      return {
        ...state,
        inbox:action.payload
      };

    default:
      return state;
  }
}


export default messageReducer;
