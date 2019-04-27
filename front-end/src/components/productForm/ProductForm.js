import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import Form from './Form';
import Styles, { getModalStyle } from './Styles';
import { createProduct } from '../../actions/productActions';

class ProductForm extends React.Component {
  addProduct = product => {
    const { createProductProp, createProductParent } = this.props;
    createProductProp(product);
    createProductParent(product); // only if success
  };

  render() {
    const { classes, open, close } = this.props;

    return (
      <div>
        <Modal open={open} onClose={close}>
          <div style={getModalStyle()} className={classes.paper}>
            <Form passClose={close} onSubmit={this.addProduct} />
          </div>
        </Modal>
      </div>
    );
  }
}

ProductForm.propTypes = {
  createProductParent: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  createProductProp: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    createProductProp: product => createProduct(product)(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(Styles)(ProductForm));
