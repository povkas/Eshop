import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Styles';

function LoadingSpinner(props) {
  const { classes } = props;
  return (
    <div className={classes.loadingSpinner}>
      <CircularProgress size={40} thickness={5} />
    </div>
  );
}

LoadingSpinner.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LoadingSpinner);
