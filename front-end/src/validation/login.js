import { authErrors } from '../utils/constants';

export const validateEmail = email => {
  const { validEmail } = authErrors;
  const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  if (email.length !== 0) {
    if (email.length > 128 || !emailRegex.test(email)) {
      return validEmail;
    }
  }
  return '';
};

export const validatePassword = password => {
  const { passwordLength } = authErrors;
  if (password.length !== 0) {
    if (password.length < 8 || password.length > 255) {
      return passwordLength;
    }
  }
  return '';
};
