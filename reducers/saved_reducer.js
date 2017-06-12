import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

import {
  SAVE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.savedJobs || [];
    case SAVE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
