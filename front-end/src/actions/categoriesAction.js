import axios from 'axios';
import { categories } from '../utils/constants/api';

export const getCategories = () => {
  return axios.get(categories).then(res => res.data);
};
