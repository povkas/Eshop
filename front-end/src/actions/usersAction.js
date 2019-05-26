import axios from 'axios';
import { allUsers } from '../utils/constants/api';

export const deleteUsers = email => {
  return axios.delete(allUsers + email);
};

export const getAllUsers = () => {
  return axios.get(allUsers).then(res => res.data);
};
export const validateInfo = email => {
  return axios
    .get(`${allUsers}/${email}`)
    .then(user => {
      return `${user.data.Address}, ${user.data.Country}`;
    })
    .catch(err => {
      return err.response.data.Message;
    });
};
