import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getUser } from '../utils/constants';
import { SET_CURRENT_USER, GET_ERRORS, LOGOUT } from './types';
import setAuthToken from '../components/login/setAuthToken';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = (user, openSnackbar) => dispatch => {
  axios
    .post(getUser, user)
    .then(res => {
      localStorage.setItem('jwtToken', res.data);
      setAuthToken(res.data);
      dispatch(setCurrentUser(jwtDecode(res.data)));
      openSnackbar('success');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({ type: LOGOUT });
};
