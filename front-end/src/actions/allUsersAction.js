import axios from 'axios';
import { allUsers } from '../utils/constants/api';

export const getAllUsers = () => {
  return axios.get(allUsers).then(res => res.data);
};
