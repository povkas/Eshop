import axios from 'axios';
import { products, snackbarMessages, defaultImage } from '../utils/constants';
import { SET_PRODUCT } from './types';

export const addProduct = product => {
  return {
    type: SET_PRODUCT,
    payload: product
  };
};

export const getProducts = () => {
  return axios.get(products).then(res =>
    res.data.map(product => {
      const prod = product;
      if (product.image === '') prod.image = defaultImage.substr(defaultImage.indexOf(',') + 1);

      return prod;
    })
  );
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
