import axios from 'axios';
import { products } from '../utils/constants';
import { SET_PRODUCT } from './types';

export const addProduct = product => {
  return {
    type: SET_PRODUCT,
    payload: product
  };
};

export const getProducts = () => {
  return axios.get(products).then(res => res.data);
};

export const setProduct = (product, createProduct) => dispatch => {
  axios.post(products, product).then(res => {
    dispatch(addProduct(res.data));
    createProduct(product);
  });
};
