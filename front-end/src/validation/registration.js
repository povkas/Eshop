import errorMessages from '../utils/constants/registrationErrors';

function hasNumber(myString) {
  return /\d/.test(myString);
}

export const nameValidation = name => {
  if (name.length !== 0) {
    if (name.length > 30 || hasNumber(name)) {
      return errorMessages.nameError;
    }
  }
  return '';
};

export const emailValidation = email => {
  if (email.length !== 0) {
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length > 128) {
      return errorMessages.emailError;
    }
  }
  return '';
};

export const surnameValidation = surname => {
  if (surname.length !== 0) {
    if (surname.length > 30 || hasNumber(surname)) {
      return errorMessages.surnameError;
    }
  }
  return '';
};

export const countryValidation = country => {
  if (country.length !== 0) {
    if (country.length > 30 || hasNumber(country)) {
      return errorMessages.countryError;
    }
  }
  return '';
};

export const cityValidation = city => {
  if (city.length !== 0) {
    if (city.length > 30 || hasNumber(city)) {
      return errorMessages.cityError;
    }
  }
  return '';
};
export const passwordValidation = password => {
  if (password.length !== 0) {
    if (password.length < 8 || password.length > 255) {
      return errorMessages.password;
    }
  }
  return '';
};

export const confirmPasswordValidation = (password, confirmPassword) => {
  if (confirmPassword !== password) {
    return errorMessages.confirmPasswordError;
  }
  return '';
};

export const adresssValidation = adress => {
  if (adress.length !== 0) {
    if (adress.length > 30) {
      return errorMessages.adressError;
    }
  }
  return '';
};
