import axios from 'axios';
import { products } from '../utils/constants';
import { ADD_PRODUCT } from './types';

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

export const getProducts = () => {
  return axios.get(products).then(res => res.data);
};

export const createProduct = product => dispatch => {
  axios.post(products, product).then(res => {
    dispatch(addProduct(res.data));
  });
};
