import {SET_PROFILE,EDIT_INFO_PROFILE} from './../actions/actionType';

const initialState={
  profile:{},
  profilePicLoading:false,
  coverPicLoading:false
}

const profileReducer=(state=initialState,action)=>{
  switch (action.type) {
    case "COVER_PIC_LOADING":
      return {
        ...state,
        coverPicLoading:true
      }
    case "PROFILE_PIC_LOADING":
      return {
        ...state,
        profilePicLoading:true
      };
    case SET_PROFILE:

      return{
        profile:{
          ...action.payload
        },
        profilePicLoading:false,
        coverPicLoading:false
      }
      case EDIT_INFO_PROFILE:
        return {
          profile:{
            ...action.payload
          }
        };
        default:
        return state;
  }
}

export default profileReducer;
