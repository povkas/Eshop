import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Form from './Form';
import Styles, { getModalStyle } from './Styles';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes, className } = this.props;
    const { openModal } = this.state;

    return (
      <div>
        <IconButton className={className.menuButton} onClick={this.handleOpen}>
          Add Product
        </IconButton>
        <Modal open={openModal} onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Form
              passClose={this.handleClose}
              onSubmit={() => {
                // eslint-disable-next-line no-useless-return
                return;
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.shape().isRequired
};

export default withStyles(Styles)(ProductForm);
