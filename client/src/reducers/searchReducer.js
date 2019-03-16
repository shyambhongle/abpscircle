import { SEARCH_INPUT,SEARCH_PROFILE,SEARCH_PROFILEPOST,ONLINE_FRIENDS} from './../actions/actionType';

const initialState={
    searchList:[],
    searchPerson:{},
    searchPersonPost:[],
    onlinefriends:[]
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

    case ONLINE_FRIENDS:

      return  {
        ...state,
        onlinefriends:action.payload
      };


  default:
  return state;
}

}
