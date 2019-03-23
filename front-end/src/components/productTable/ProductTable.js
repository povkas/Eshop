import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ProductIcon from './ProductIcon';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  container: {
    flexWrap: 'wrap'
  }
});

function ProductTable(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container justify="flex-start" className={classes.container}>
        <ProductIcon />
        <ProductIcon />
        <ProductIcon />
        <ProductIcon />
        <ProductIcon />
        <ProductIcon />
        <ProductIcon />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ProductTable);
