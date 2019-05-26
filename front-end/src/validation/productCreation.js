import errorMessages from '../utils/constants/productCreationErrors';

function notEmpty(myString) {
  return myString !== '';
}

export const titleValidation = title => {
  if (title.length !== 0) {
    if (title.length > 30) {
      return errorMessages.titleError;
    }
  } else {
    return errorMessages.isEmptyTitle;
  }
  return '';
};

export const descriptionValidation = description => {
  if (description.length !== 0) {
    if (description.length > 300) {
      return errorMessages.descriptionError;
    }
  } else {
    return errorMessages.isEmptyDescription;
  }
  return '';
};

export const priceValidation = price => {
  const priceRegex = /^[1-9]\d{0,3}(\.\d{1,4})?$/;

  if (price.length !== 0) {
    if (!priceRegex.test(price)) {
      return errorMessages.priceError;
    }
  } else {
    return errorMessages.isEmptyPrice;
  }
  return '';
};

export const quantityValidation = quantity => {
  const quantityRegex = /^[1-9]\d{0,3}$/;

  if (quantity.length !== 0) {
    if (!quantityRegex.test(quantity)) {
      return errorMessages.quantityError;
    }
  } else {
    return errorMessages.isEmptyQuantity;
  }
  return '';
};

export const categoryValidation = category => {
  if (!notEmpty(category) || category === undefined) {
    return errorMessages.isEmptyCategory;
  }
  return '';
};
