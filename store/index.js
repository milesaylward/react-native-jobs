import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from  '../reducers';

//redux persist allows us to store a users savedJobs even after the app is closed
//allowing them to continue looking at them when they return
const store = createStore(
 reducers,
 {},
 compose(
  applyMiddleware(thunk),
  autoRehydrate()
 )
);

/*
whitelist needs to be set to the key that you declared in your combineReducers function
use .purge at the end of the line below to clear this persisted storage
A gotcha of redux-persist is that it when it draws in your data from AsyncStorage
is that you must use redux-persist-migrate whenever you redeploy your application
to ensure that the correct type is passed throught your application
*/
persistStore(store, { storage: AsyncStorage, whitelist: ['savedJobs'] });

export default store;
