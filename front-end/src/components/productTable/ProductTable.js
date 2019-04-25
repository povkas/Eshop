import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductItem from './ProductItem';
import Styles from './Styles';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };
  }

  changePage = e => {
    this.setState({ currentPage: parseInt(e.target.innerHTML) });
  };

  previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) this.setState({ currentPage: currentPage - 1 });
  };

  nextPage = () => {
    const { currentPage } = this.state;
    const { products, numberOfProducts } = this.props;
    if (currentPage < Math.ceil(products.length / numberOfProducts))
      this.setState({ currentPage: currentPage + 1 });
  };

  createButtons = () => {
    const { currentPage } = this.state;
    const { classes, products, numberOfProducts } = this.props;
    const buttons = [];
    const numberOfButtons = Math.ceil(products.length / numberOfProducts);

    for (let i = 1; i <= numberOfButtons; i += 1) {
      buttons.push(
        <Paper
          className={i !== currentPage ? classes.pageButtonPaper : classes.pageButtonPaperDisabled}
          onClick={this.changePage}
          key={i}
        >
          {i}
        </Paper>
      );
    }

    return buttons;
  };

  render() {
    const { currentPage } = this.state;
    const { productHandler, products, productsLoading, classes, numberOfProducts } = this.props;

    if (products.length === 0 || productsLoading) {
      return productsLoading ? (
        <div className={classes.loadingSpinner}>
          <CircularProgress size={40} thickness={5} />
        </div>
      ) : (
        <div className={classes.emptyMessage}>There are no products matching this criteria.</div>
      );
    }

    return (
      <Grid container justify="space-evenly" alignItems="center">
        {products
          .slice((currentPage - 1) * numberOfProducts, currentPage * numberOfProducts)
          .map(product => (
            <ProductItem
              product={product}
              key={product.id}
              selectProduct={() => productHandler(product)}
            />
          ))}
        <Divider className={classes.divider} />
        <Grid container justify="center" alignItems="center">
          <Paper
            className={currentPage > 1 ? classes.pageButtonPaper : classes.pageButtonPaperDisabled}
            onClick={this.previousPage}
          >
            {'<'}
          </Paper>
          {this.createButtons()}
          <Paper
            className={
              currentPage < Math.ceil(products.length / numberOfProducts)
                ? classes.pageButtonPaper
                : classes.pageButtonPaperDisabled
            }
            onClick={this.nextPage}
          >
            {'>'}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ProductTable.propTypes = {
  classes: PropTypes.shape().isRequired,
  productHandler: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  productsLoading: PropTypes.bool.isRequired,
  numberOfProducts: PropTypes.number.isRequired
};

export default withStyles(Styles)(ProductTable);
