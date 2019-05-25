import axios from 'axios';
import { products } from '../utils/constants';

export const getProducts = () => {
  return axios.get(products).then(res => res.data);
};

export const patchProducts = (id, quantity, setError, close) => {
  axios
    .patch(`${products}/${id}`, [{ value: quantity, path: '/quantity', op: 'replace' }])
    .then(() => close())
    .catch(err => setError(err.response.data.Message));
};
