import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../../../components/login/setAuthToken';

export const registerUser = (user, history) => dispatch => {
  axios
    .post('/api/users/register', user)
    .then(() => history.push('/login')) // res param
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post(`http://localhost:5000/api/user/login`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(`Res.Data:\n${res.data}`);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      console.log(`Decoded:\n${JSON.stringify(decoded)}`);
      dispatch(setCurrentUser(decoded));
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
