import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import Form from './Form';
import Styles, { getModalStyle } from './Styles';
import { setProduct } from '../../actions/productActions';

class ProductForm extends React.Component {
  createProduct = product => {
    const { setProductProp, createProduct } = this.props;
    setProductProp(product, createProduct);
  };

  render() {
    const { classes, open, close } = this.props;

    return (
      <div>
        <Modal open={open} onClose={close}>
          <div style={getModalStyle()} className={classes.paper}>
            <Form passClose={close} onSubmit={this.createProduct} />
          </div>
        </Modal>
      </div>
    );
  }
}

ProductForm.propTypes = {
  createProduct: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
  setProductProp: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setProductProp: (product, createProduct) => setProduct(product, createProduct)(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(Styles)(ProductForm));
