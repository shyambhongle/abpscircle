
import { RETRIVE_POST,PROFILE_POST } from './../actions/actionType';

const initialState = {
  allPost:[],
  profilePost:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RETRIVE_POST:
      return {
        ...state,
        allPost:action.payload
      };
    case PROFILE_POST:
      return{
        ...state,
        profilePost:action.payload
      };

    default:
      return state;
  }
}
