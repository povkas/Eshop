import axios from 'axios';
import { deleteUser } from '../utils/constants/api';

export const deleteUsers = id => {
  return axios.post(deleteUser, id);
};
