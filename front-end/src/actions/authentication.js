import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { API } from '../utils/constants';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../components/login/setAuthToken';

export const loginUser = user => dispatch => {
  axios.post(API, user).then(res => {
    localStorage.setItem('jwtToken', res.data);
    setAuthToken(res.data);
    dispatch(setCurrentUser(jwtDecode(res.data)));
  });
  // .catch(err => {
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   });
  // });
};

// export function loginUser(user) {
//   return dispatch => {
//     return axios
//       .post(`http://localhost:5000/api/user/login`, JSON.stringify(user), {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(res => {
//         localStorage.clear();
//         localStorage.setItem('jwtToken', res.data);
//         // setAuthToken(token);
//         dispatch(setCurrentUser(jwtDecode(res.data)));
//       });
//   };
// }

// export function loginUser(user) {
//   return dispatch => {
//     const res = axios.post(`http://localhost:5000/api/user/login`, JSON.stringify(user), {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     console.log(`Res.Data:\n${res.data}`);
//     const { token } = res.data;
//     localStorage.clear();
//     localStorage.setItem('jwtToken', token);
//     // setAuthToken(token);
//     const decoded = jwtDecode(token);
//     console.log(`Decoded:\n${JSON.stringify(decoded)}`);
//     dispatch(setCurrentUser(decoded));
//   };
// }

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
