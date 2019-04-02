import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import blue from '@material-ui/core/colors/blue';
import CartItem from './CartItem/CartItem';

function modalPlace() {
  const top = 10;
  const left = 1;

  return {
    top: `${top}%`,
    right: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  close: {
    padding: theme.spacing.unit / 2
  },
  button: {
    float: 'right',
    width: 100
  },
  scrollBar: {
    overflowY: 'scroll'
  },
  Snackbar: {
    backgroundColor: blue[600]
  }
});

class CartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, openModal, handleClose } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Modal open={openModal} onClose={handleClose}>
          <div style={modalPlace()} className={classes.paper}>
            <h3> Your cart list</h3>
            <Grid container spacing={20}>
              <Grid xs={12}>
                <CartItem />
              </Grid>
              <Grid>
                <Button
                  className="btn btn-secondary float-left"
                  variant="outlined"
                  color="primary"
                  float="right"
                  size="small"
                >
                  Remove All
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  margin-right="10px"
                  variant="contained"
                  color="primary"
                  float="right"
                  size="small"
                  style={styles.button}
                  onClick={this.handleClick}
                >
                  CheckOut
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={700}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
            style: { backgroundColor: '#2d3a86' }
          }}
          message={<span id="message-id">Your purchase was successful</span>}
        />
      </div>
    );
  }
}
CartModal.propTypes = {
  classes: PropTypes.shape().isRequired
};
export default withStyles(styles)(CartModal);
