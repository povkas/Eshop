import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductIcon from './ProductIcon';

function ProductTable() {
  return (
    <Grid container justify="flex-start">
      <ProductIcon />
      <ProductIcon />
      <ProductIcon />
      <ProductIcon />
      <ProductIcon />
      <ProductIcon />
      <ProductIcon />
    </Grid>
  );
}

export default ProductTable;
