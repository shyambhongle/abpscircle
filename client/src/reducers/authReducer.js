import isEmpty from './../validation/is-empty';

import { SET_CURRENT_USER,UPDATE_USER_DATA} from './../actions/actionType';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case UPDATE_USER_DATA:
    return {
      ...state,
      user:{
        ...state.user,
        avatar:action.payload
      }
    }

    default:
      return state;
  }
}
