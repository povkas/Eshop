import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { API } from '../utils/constants';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setAuthToken from '../components/login/setAuthToken';

export const loginUser = user => dispatch => {
  axios
    .post(API, user)
    .then(res => {
      localStorage.setItem('jwtToken', res.data);
      setAuthToken(res.data);
      dispatch(setCurrentUser(jwtDecode(res.data)));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
