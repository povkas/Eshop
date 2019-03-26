import axios from 'axios';
import { API } from '../utils/constants';

export const getProducts = () => {
  return axios.get(API).then(res => res.data);
};
