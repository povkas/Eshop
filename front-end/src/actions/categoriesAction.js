import axios from 'axios';
import { categoriesAPI } from '../utils/constants';

export const getCategories = () => {
  return axios.get(categoriesAPI).then(res => res.data);
};
