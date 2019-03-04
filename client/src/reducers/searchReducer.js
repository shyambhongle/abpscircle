import { SEARCH_INPUT,SEARCH_PROFILE,SEARCH_PROFILEPOST} from './../actions/actionType';

const initialState={
    searchList:[],
    searchPerson:{},
    searchPersonPost:[]
}

export default function(state=initialState,action){

switch (action.type){
  case SEARCH_INPUT:
    return {
      ...state,
      searchList:action.payload
    };

    case SEARCH_PROFILE:
      return {
        ...state,
        searchPerson:action.payload
      };

    case SEARCH_PROFILEPOST:
    return {
      ...state,
      searchPersonPost:action.payload
    };

  default:
  return state;
}

}
