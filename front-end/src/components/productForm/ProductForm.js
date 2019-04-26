import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from './Form';
import Styles, { getModalStyle } from './Styles';

class ProductForm extends React.Component {
  addProduct = () => {
    // request
    // product vietoj ()
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
  classes: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default withStyles(Styles)(ProductForm);
