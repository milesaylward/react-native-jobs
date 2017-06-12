import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import savedJobs from './saved_reducer';

export default combineReducers({
  auth, jobs, savedJobs
});
