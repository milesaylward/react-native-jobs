import {
  FETCH_JOBS,
  SEARCH_QUERY_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
  results: [],
  query: ''
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
     case SEARCH_QUERY_CHANGE:
       return { ...state, query: action.payload };
     case FETCH_JOBS:
       return {...state, results: action.payload, query: '' };
     default:
      return state;
   }
}
