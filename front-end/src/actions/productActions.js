import axios from 'axios';
import { products, snackbarMessages } from '../utils/constants';
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

export const setProduct = (product, createProduct, openSnackbar, setError) => dispatch => {
  axios
    .post(products, product)
    .then(res => {
      dispatch(addProduct(res.data));
      openSnackbar({
        message: snackbarMessages.setProductSuccess,
        variant: 'success'
      });
      createProduct(product);
    })
    .catch(err => {
      setError(err);
    });
};
