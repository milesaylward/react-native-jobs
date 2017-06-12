import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  SAVE_JOB,
  SEARCH_QUERY_CHANGE,
  CLEAR_LIKED_JOBS
} from './types';
//the indeed api has a lot of options so in order to make it easy to refactor our search options
//the qs module creates a query string from an object of key value pair
const getQuery = (query) => {
  return {
    publisher: '4095932378483794',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: query
  }
};

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const createURL = (zip, q) => {
  const JOB_QUERY_PARAMS = getQuery(q);

  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, query, callback) => async dispatch => {
  //inded api only accepts zips or city state combo
  //reverseGeocode creates zip from my lon lat data from the map
  try {
    let zip = await reverseGeocode(region);
    const url = createURL(zip, query);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data.results });
    callback();
  } catch(err) {
    console.log(err);
  }
};

export const searchQueryChange = (query) => {
  return {
    type: SEARCH_QUERY_CHANGE,
    payload: query
  }
}

export const saveJob = (job, callback) => {
  callback();
  return {
    type: SAVE_JOB,
    payload: job
  };
}

export const clearLikedJobs = (callback) => {
  callback();
 return { type: CLEAR_LIKED_JOBS };
};
