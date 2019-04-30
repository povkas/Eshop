import axios from 'axios';
import { allUsers } from '../utils/constants/api';

export const deleteUsers = email => {
  return axios.delete(allUsers + email);
};
