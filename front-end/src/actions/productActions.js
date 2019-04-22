import axios from 'axios';
import { products } from '../utils/constants';

export const getProducts = () => {
  return axios.get(products).then(res => res.data);
};
