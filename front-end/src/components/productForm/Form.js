import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CategorySelect from './CategorySelect';
import {
  titleValidation,
  priceValidation,
  descriptionValidation,
  quantityValidation,
  categoryValidation
} from '../../validation';
import Styles from './Styles';
import { defaultImage } from '../../utils/constants';

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
      imagePreviewUrl: '',
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

  uploadClick = () => {
    document.getElementById('uploadImageInput').click();
  };

  changeImage = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const readerForPreview = new FileReader();

    readerForPreview.onload = () => {
      this.setState({ photo: file, imagePreviewUrl: readerForPreview.result });
    };
    readerForPreview.readAsDataURL(file);
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
      disable,
      imagePreviewUrl
    } = this.state;
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item sm>
          <form onSubmit={this.handleSubmit} className={classes.typeface}>
            <TextField
              className={classes.textFields}
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
            <TextField
              className={classes.textFields}
              name="price"
              label="Price (€)"
              value={price}
              onChange={this.handleChange}
              error={notEmpty(priceError)}
              helperText={priceError}
              onBlur={e => this.validate(e, priceValidation)}
              margin="normal"
            />
            <TextField
              className={classes.textFields}
              name="description"
              label="Description"
              value={description}
              onChange={this.handleChange}
              error={notEmpty(descriptionError)}
              helperText={descriptionError}
              onBlur={e => this.validate(e, descriptionValidation)}
              margin="normal"
            />
            <TextField
              className={classes.textFields}
              name="quantity"
              label="Quantity"
              value={quantity}
              onChange={this.handleChange}
              error={notEmpty(quantityError)}
              helperText={quantityError}
              onBlur={e => this.validate(e, quantityValidation)}
              margin="normal"
            />
            <CategorySelect
              getCategory={this.getCategory}
              validate={this.validateCategory}
              errorMessage={categoryError}
              resetMessage={this.resetErrorMessage}
            />
            <Button disabled={disable} variant="outlined" type="submit">
              Create Product
            </Button>
          </form>
        </Grid>
        <Grid item sm>
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="" className={classes.image} />
          ) : (
            <img src={defaultImage} alt="" className={classes.image} />
          )}
          <Button variant="outlined" onClick={this.uploadClick}>
            {imagePreviewUrl ? 'Change Image' : 'Upload Image'}
          </Button>
          <input
            id="uploadImageInput"
            hidden="hidden"
            type="file"
            accept="image/*"
            onChange={this.changeImage}
          />
        </Grid>
      </Grid>
    );
  }
}

Form.propTypes = {
  passClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(Form);
