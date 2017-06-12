import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  TOKEN_EXISTS,
  NO_TOKEN
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case TOKEN_EXISTS:
      return { token: action.payload };
    case NO_TOKEN:
      return { token: false };
    default:
      return state;
  }
}
