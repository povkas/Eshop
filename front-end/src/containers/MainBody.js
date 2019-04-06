import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import ProductModal from '../components/productModal/ProductModal';
import ProductTable from '../components/productTable/ProductTable';
import { getProducts } from '../actions/productActions';

const color = grey[100];

const Styles = () => ({
  paper: {
    flexGrow: 1,
    backgroundColor: color,
    width: '50vw',
    minHeight: '90vh',
    margin: '2vh'
  }
});

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductModalOpen: false,
      selectedProduct: {},
      products: []
    };

    this._isMounted = false;
  }

  componentDidMount() {
    getProducts().then(res => {
      this.setState({ products: res });
    });
    this._isMounted = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isModalToggled = !isEqual(this.state, nextState);
    return isModalToggled;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOpen = () => {
    if (this._isMounted === true) {
      this.setState({ isProductModalOpen: true });
    }
  };

  handleClose = () => {
    this.setState({ isProductModalOpen: false });
  };

  changeProduct = product => {
    if (this._isMounted === true) {
      this.setState({
        selectedProduct: product,
        isProductModalOpen: true
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { isProductModalOpen, selectedProduct, products } = this.state;
    return (
      <div>
        <ProductModal
          openModal={isProductModalOpen}
          handleClose={this.handleClose}
          product={selectedProduct}
        />
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Grid item>
            <Paper className={classes.paper} elevation={24}>
              <BrowserRouter>
                <Route
                  path="/"
                  component={() => (
                    <ProductTable
                      openProduct={this.handleOpen}
                      productHandler={this.changeProduct}
                      products={products}
                    />
                  )}
                />
              </BrowserRouter>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainBody.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(Styles)(MainBody);
