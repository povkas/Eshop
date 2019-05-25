import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CategorySelect from './CategorySelect';
import {
  titleValidation,
  priceValidation,
  descriptionValidation,
  quantityValidation,
  categoryValidation
} from '../../validation';

function notEmpty(myString) {
  return myString !== '';
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      title: '',
      price: '',
      description: '',
      quantity: '',
      photo: {},
      category: '',
      titleError: '',
      priceError: '',
      descriptionError: '',
      quantityError: '',
      categoryError: '',
      disable: true
    };
    this.state = this.initialstate;
  }

  validate = (e, method) => {
    this.setState({ [`${e.target.name}Error`]: method(e.target.value) });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({ [`${e.target.name}Error`]: '' }, () => this.buttonDisable());
  };

  buttonDisable = () => {
    const {
      title,
      price,
      description,
      quantity,
      category,
      titleError,
      priceError,
      descriptionError,
      quantityError,
      categoryError
    } = this.state;

    if (
      !notEmpty(titleError) &&
      !notEmpty(priceError) &&
      !notEmpty(descriptionError) &&
      !notEmpty(quantityError) &&
      !notEmpty(categoryError) &&
      notEmpty(title) &&
      notEmpty(price) &&
      notEmpty(description) &&
      notEmpty(quantity) &&
      notEmpty(category)
    ) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  getCategory = category => {
    this.setState({ category }, () => this.buttonDisable());
  };

  validateCategory = category => {
    this.setState({ categoryError: categoryValidation(category) });
  };

  resetErrorMessage = () => {
    this.setState({ categoryError: '' });
  };

  changeImage = e => {
    this.setState({ photo: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, passClose } = this.props;
    const { title, price, description, quantity, category, photo } = this.state;

    const created = Date.now().toString();
    const productData = { title, description, category, created };
    productData.id = Date.now();
    productData.price = parseFloat(price);
    productData.quantity = parseInt(quantity);

    const reader = new FileReader();
    try {
      reader.readAsArrayBuffer(photo);
    } catch {
      onSubmit(productData);
      passClose();
    }

    reader.onload = () => {
      productData.image = Array.from(new Uint8Array(reader.result));
      onSubmit(productData);
      passClose();
    };
  };

  render() {
    const {
      title,
      price,
      description,
      quantity,
      titleError,
      priceError,
      descriptionError,
      quantityError,
      categoryError,
      disable
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          autoFocus
          name="title"
          label="Title"
          value={title}
          onChange={this.handleChange}
          error={notEmpty(titleError)}
          helperText={titleError}
          onBlur={e => this.validate(e, titleValidation)}
          margin="normal"
        />
        <br />
        <TextField
          name="price"
          label="Price (€)"
          value={price}
          onChange={this.handleChange}
          error={notEmpty(priceError)}
          helperText={priceError}
          onBlur={e => this.validate(e, priceValidation)}
          margin="normal"
        />
        <br />
        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={this.handleChange}
          error={notEmpty(descriptionError)}
          helperText={descriptionError}
          onBlur={e => this.validate(e, descriptionValidation)}
          margin="normal"
        />
        <br />
        <TextField
          name="quantity"
          label="Quantity"
          value={quantity}
          onChange={this.handleChange}
          error={notEmpty(quantityError)}
          helperText={quantityError}
          onBlur={e => this.validate(e, quantityValidation)}
          margin="normal"
        />
        <br />
        <CategorySelect
          getCategory={this.getCategory}
          validate={this.validateCategory}
          errorMessage={categoryError}
          resetMessage={this.resetErrorMessage}
        />
        <br />
        <input type="file" accept="image/*" onChange={this.changeImage} />
        <br />
        <br />
        <Button disabled={disable} variant="outlined" type="submit">
          Create Product
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  passClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
