import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import ProductTable from '../components/productTable/ProductTable';
import ProductModal from '../components/product/ProductModal';

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
      openModal: false
    };
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  render() {
    const { classes } = this.props;
    const { openModal } = this.state;
    return (
      <div>
        <ProductModal openModal2={openModal} />
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Grid item>
            <Paper className={classes.paper} elevation={24}>
              <BrowserRouter>
                <Route path="/" component={() => <ProductTable handleModal={this.handleOpen} />} />
              </BrowserRouter>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(Styles)(MainBody);
