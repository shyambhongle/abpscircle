import { RANDOM_SUGGESTION} from './../actions/actionType';

const initialState = {
suggestion:[]
};

export default function(state = initialState, action) {
  switch (action.type) {

    case RANDOM_SUGGESTION:
      return {
        suggestion:action.payload
      }
    default:
      return state;
  }
}
