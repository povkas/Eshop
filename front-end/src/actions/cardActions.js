import axios from 'axios';
import { creditCard } from '../utils/constants';

export const validateCard = (setError, card, onSubmit) => {
  axios
    .post(creditCard, card)
    .then(() => onSubmit())
    .catch(err => setError(err.response.data.Message));
};

export const purchase = (card, saibos, setError, changeProducts) => {
  axios
    .patch(`${creditCard}/${card}`, { balance: saibos })
    .then(() => changeProducts())
    .catch(err => setError(err.response.data.Message));
};
