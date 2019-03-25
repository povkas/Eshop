import axios from 'axios';
import { API } from '../utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const getProducts = () => {
  return axios.get(API).then(res => res.data);
};
