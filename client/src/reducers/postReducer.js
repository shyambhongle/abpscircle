
import {
  RETRIVE_POST,
  PROFILE_POST ,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_LOADING} from './../actions/actionType';

const initialState = {
  allPost:[],
  profilePost:[],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
      case UPDATE_POST:
      let updatePost=[];
      let updateProfilePost=[];
        state.allPost.map(singlePost=>{
        if (singlePost._id===action.payload._id) {
          return updatePost.push(action.payload)
        }else {
          return updatePost.push(singlePost)
        }
      })
      state.profilePost.map(singlePost=>{
      if (singlePost._id===action.payload._id) {
        return updateProfilePost.push(action.payload)
      }else {
        return updateProfilePost.push(singlePost)
      }
    })




        return {
          ...state,
          allPost:updatePost,
          profilePost:updateProfilePost
        };
    case RETRIVE_POST:
      return {
        ...state,
        allPost:action.payload,
        loading: false
      };
    case PROFILE_POST:
      return{
        ...state,
        profilePost:action.payload
      };
      case DELETE_POST:
        return {
          ...state,
          profilePost: state.profilePost.filter(post => post._id !== action.payload)
        };
      case ADD_POST:
        return {
          ...state,
          loading:false,
          profilePost: [action.payload, ...state.profilePost]
          };
    default:
      return state;
  }
}
