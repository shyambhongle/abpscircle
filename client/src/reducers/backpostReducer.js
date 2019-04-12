import {BACK_POST,CLEAR_SCREEN_POST,BACK_POST_LOADING} from './../actions/actionType';

const initialState={
  post:undefined,
  visible:false,
  loading:true
}

const backpostReducer=(state=initialState,action)=>{
  switch (action.type) {
    case BACK_POST_LOADING:
      return {
        ...state,
        visible:true,
        loading:true
      }
    case "NO_BACK_POST":
    return {
      visible:false,
      loading:false,
      post:{}
    }
    case BACK_POST:
    return {
      ...state,
      post:action.payload,
      loading:false
    };
    case CLEAR_SCREEN_POST:
      return {
        ...state,
        visible:false,
        post:undefined,
        loading:true
      };
    default:
    return state;
  }
};




export default backpostReducer;
