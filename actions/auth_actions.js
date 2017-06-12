import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FB_LOGIN_SUCCESS,
  FB_LOGIN_FAIL,
  TOKEN_EXISTS,
  NO_TOKEN
} from './types';
const APP_ID = '310935559363438';

/*
Es2017 syntax allows us to use the async await keywords to
avoid having to use a lot of nested .then() calls
It is hard to read the first time you look at it but broken down it reads
facebookLogin is a function that returns an asynchronous function
that utilizes redux-thunk's dispatch method for asynchronous
action creators
*/
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if(token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    tryFacebookLogin(dispatch)
  }
};

const tryFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
    permissions: ['public_profile']
  });

  if(type === 'cancel') {
    return dispatch({ type: FB_LOGIN_FAIL});
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FB_LOGIN_SUCCESS, payload: token })
};

export const checkForToken = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if(token) {
    return dispatch({ type: TOKEN_EXISTS, payload: true });
  } else {
    return dispatch({ type: NO_TOKEN, payload: false });
  }
};
