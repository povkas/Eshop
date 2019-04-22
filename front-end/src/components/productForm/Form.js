import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      name: '',
      price: '',
      description: '',
      quantity: '',
      photo: {},
      category: '',
      nameErrorText: ' ',
      priceErrorText: ' ',
      descriptionErrorText: ' ',
      quantityErrorText: ' ',
      categoryErrorText: ' '
    };
    this.state = this.initialstate;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateCategory = () => {
    const { category } = this.state;
    const errors = {
      categoryErrorText: ' '
    };

    if (category.length === 0) errors.categoryErrorText = 'Category is required!';

    this.setState({ ...errors });
  };

  validateName = () => {
    const { name } = this.state;
    const errors = {
      nameErrorText: ' '
    };

    if (name.length === 0) errors.nameErrorText = 'Name is required!';

    this.setState({ ...errors });
  };

  validatePrice = () => {
    const priceRegex = /^[1-9]\d{0,3}(\.\d{1,4})?$/;

    const { price } = this.state;
    const errors = {
      priceErrorText: ' '
    };

    if (price.length !== 0) {
      if (!priceRegex.test(price)) errors.priceErrorText = 'Number is not valid!';
    } else errors.priceErrorText = 'Price is required!';

    this.setState({ ...errors });
  };

  validateQuantity = () => {
    const quantityRegex = /^[1-9]\d{0,3}$/;

    const { quantity } = this.state;
    const errors = {
      quantityErrorText: ' '
    };

    if (quantity.length !== 0) {
      if (!quantityRegex.test(quantity)) errors.quantityErrorText = 'Number is not valid!';
    } else errors.quantityErrorText = 'Quantity is required!';

    this.setState({ ...errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { passClose } = this.props;
    passClose();
  };

  render() {
    const {
      name,
      price,
      description,
      quantity,
      category,
      nameErrorText,
      priceErrorText,
      descriptionErrorText,
      quantityErrorText,
      categoryErrorText
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          autoFocus
          name="name"
          label="Name"
          value={name}
          onChange={this.handleChange}
          error={nameErrorText !== ' '}
          helperText={nameErrorText}
          onBlur={this.validateName}
          margin="normal"
        />
        <br />
        <TextField
          name="price"
          label="Price (€)"
          value={price}
          onChange={this.handleChange}
          error={priceErrorText !== ' '}
          helperText={priceErrorText}
          onBlur={this.validatePrice}
          margin="normal"
        />
        <br />
        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={this.handleChange}
          error={descriptionErrorText !== ' '}
          helperText={descriptionErrorText}
          // onBlur={this.validateDescription}
          margin="normal"
        />
        <br />
        <TextField
          name="quantity"
          label="Quantity"
          value={quantity}
          onChange={this.handleChange}
          error={quantityErrorText !== ' '}
          helperText={quantityErrorText}
          onBlur={this.validateQuantity}
          margin="normal"
        />
        <br />
        <TextField
          name="category"
          label="Category"
          value={category}
          onChange={this.handleChange}
          error={categoryErrorText !== ' '}
          helperText={categoryErrorText}
          onBlur={this.validateCategory}
          margin="normal"
        />
        <br />
        <Button variant="outlined" type="submit">
          Create Product
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  passClose: PropTypes.func.isRequired
};

export default Form;
