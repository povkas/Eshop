import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CategorySelect from './CategorySelect';

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
      titleErrorText: ' ',
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

  validateTitle = () => {
    const { title } = this.state;

    let titleErrorText = ' ';
    let isError = false;

    if (title.length === 0) {
      isError = true;
      titleErrorText = 'Title is required!';
    }

    this.setState({ titleErrorText });

    return isError;
  };

  validateDescription = () => {
    const { description } = this.state;

    let descriptionErrorText = ' ';
    let isError = false;

    if (description.length === 0) {
      isError = true;
      descriptionErrorText = 'Description is required!';
    }

    this.setState({ descriptionErrorText });

    return isError;
  };

  validatePrice = () => {
    const priceRegex = /^[1-9]\d{0,3}(\.\d{1,4})?$/;

    const { price } = this.state;
    let priceErrorText = ' ';
    let isError = false;

    if (price.length !== 0) {
      if (!priceRegex.test(price)) {
        isError = true;
        priceErrorText = 'Number is not valid!';
      }
    } else {
      isError = true;
      priceErrorText = 'Price is required!';
    }

    this.setState({ priceErrorText });

    return isError;
  };

  validateQuantity = () => {
    const quantityRegex = /^[1-9]\d{0,3}$/;

    const { quantity } = this.state;
    let quantityErrorText = ' ';
    let isError = false;

    if (quantity.length !== 0) {
      if (!quantityRegex.test(quantity)) {
        isError = true;
        quantityErrorText = 'Number is not valid!';
      }
    } else {
      isError = true;
      quantityErrorText = 'Quantity is required!';
    }

    this.setState({ quantityErrorText });

    return isError;
  };

  getCategory = category => {
    this.setState({ category });
  };

  validateCategorySelection = category => {
    let categoryErrorText = ' ';
    let isError = false;

    if (category === '' || category === undefined) {
      isError = true;
      categoryErrorText = 'Category is required!';
    }

    this.setState({ categoryErrorText });

    return isError;
  };

  resetErrorMessage = () => {
    this.setState({ categoryErrorText: ' ' });
  };

  validateForm = () => {
    let isError = false;
    const { category } = this.state;

    if (
      this.validateTitle() ||
      this.validateDescription() ||
      this.validatePrice() ||
      this.validateQuantity() ||
      this.validateCategorySelection(category)
    )
      isError = true;

    return isError;
  };

  changeImage = e => {
    this.setState({ photo: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, passClose } = this.props;
    const { title, price, description, quantity, category, photo } = this.state;

    const created = Date.now().toString();

    const reader = new FileReader();
    reader.readAsArrayBuffer(photo);
    reader.onloadend = () => {
      const typedArray = new Uint8Array(reader.result);
      const image = [...typedArray];
      const productData = {
        title,
        description,
        price,
        quantity,
        category,
        created,
        image
      };

      if (!this.validateForm()) {
        onSubmit(productData);
        passClose();
      }
    };
  };

  render() {
    const {
      title,
      price,
      description,
      quantity,
      titleErrorText,
      priceErrorText,
      descriptionErrorText,
      quantityErrorText,
      categoryErrorText
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          autoFocus
          name="title"
          label="Title"
          value={title}
          onChange={this.handleChange}
          error={titleErrorText !== ' '}
          helperText={titleErrorText}
          onBlur={this.validateTitle}
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
          onBlur={this.validateDescription}
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
        <CategorySelect
          getCategory={this.getCategory}
          validate={this.validateCategorySelection}
          errorMessage={categoryErrorText}
          resetMessage={this.resetErrorMessage}
        />
        <br />
        <input type="file" accept="image/*" onChange={this.changeImage} />
        <br />
        <br />
        <Button variant="outlined" type="submit">
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
