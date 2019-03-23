import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
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

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/products').then(res => {
      this.setState({ products: res.data });
    });
  }

  render() {
    const { classes } = this.props;
    const { products } = this.state;
    return (
      <div className={classes.root}>
        <Grid container justify="space-evenly" alignItems="center" className={classes.container}>
          {products.map(product => (
            <ProductIcon product={product} key={product.key} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProductTable);
