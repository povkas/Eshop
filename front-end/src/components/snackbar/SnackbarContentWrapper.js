import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { SnackbarContent, withStyles, IconButton } from '@material-ui/core';
// import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

// const variantIcon = {
//   error: ErrorIcon
// };

const styles1 = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

class MySnackbarContent extends React.PureComponent {
  render() {
    const { classes, className, message, onClose, variant, ...other } = this.props;
    // const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        // className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={[
          <span id="client-snackbar" className={classes.message} key="close">
            {/* <Icon className={classNames(classes.icon, classes.iconVariant)} /> */}
            {message}
          </span>
        ]}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        headlineMapping={{
          body1: 'div',
          body2: 'div'
        }}
        {...other}
      />
    );
  }
}

MySnackbarContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
};

export default withStyles(styles1)(MySnackbarContent);
