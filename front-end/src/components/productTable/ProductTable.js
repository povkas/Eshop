import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductIcon from './ProductIcon';
import { ProductModal } from '../product';

function ProductTable() {
  return (
    <Grid container justify="flex-start">
      <ProductModal />
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
