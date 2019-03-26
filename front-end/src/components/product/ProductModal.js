import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Modal, Divider, Typography, Grid } from '@material-ui/core';
import Star from '@material-ui/icons/Star';
import ColorSelect from './ColorSelect';

function getModalStyle() {
  const top = 42;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '40vw',
    minHeight: '50vh',
    maxHeight: '82vh',
    margin: '2vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  },
  // added image styles
  image: {
    height: '24.5vmin',
    width: '24.5vmin'
  },
  star: {
    width: '24px',
    height: '24px',
    fill: '#000000'
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    };
  }

  getColor = childColor => {
    // eslint-disable-next-line no-unused-vars
    const { color } = this.state;
    this.setState({ color: childColor });
  };

  handleToCart = e => {
    e.preventDefault();
    const { color } = this.state;
    // eslint-disable-next-line no-console
    console.log(`#color is: ${color}`);
  };

  render() {
    const { classes, openModal2 } = this.props;

    return (
      <div>
        {/* <ProductIcon passOpen={this.handleOpen} /> */}
        {/* <ProductIcon product={product} key={key} passOpen={this.handleOpen} /> */}
        <Button onClick={this.handleOpen}>Open</Button>
        <Modal open={openModal2} onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid container direction="row" justify="space-evenly" alignItems="center">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className={classes.image}
              />
            </Grid>
            <Divider className={classes.divider} />
            <Grid container direction="row" alignItems="center" justify="space-around">
              <Grid item xs={4}>
                <Typography variant="h5">Cost: 3€</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5">Rating:</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button disableRipple>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={this.handleToCart}>
                  <Typography variant="h6">Add to cart</Typography>
                </Button>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Typography variant="h4">Toilet paper</Typography>
            <Typography variant="h6">Description</Typography>
            <Typography align="justify">{text}</Typography>
            <Grid container direction="row" alignItems="center" justify="space-between">
              <ColorSelect getColor={this.getColor} />
              <Typography variant="h5">Amount: 6</Typography>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

ProductModal.propTypes = {
  classes: PropTypes.shape().isRequired
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis, orci at hendrerit lacinia, risus eros dignissim tortor, id porttitor leo ante ut tortor.
Phasellus luctus nulla ante, sit amet faucibus dui tempus sed. Integer volutpat cursus sollicitudin. Integer eget nulla vel nisi aliquam elementum non vitae justo. Aenean
dignissim pellentesque ante, non malesuada ante scelerisque nec. Suspendisse tincidunt hendrerit augue, vitae malesuada magna dapibus placerat. Sed posuere id odio non
convallis. Nunc quis nulla blandit, sagittis erat ut, sagittis felis. Pellentesque eleifend ut eros ut placerat. Fusce at tellus ac odio tincidunt rhoncus vel sit amet
quam. Donec tellus elit, ultrices eu luctus scelerisque, pharetra id ligula. Cras ligula neque, commodo nec porta a, tincidunt a neque. Vivamus eu erat quis eros
gravida rhoncus vel non libero. Vivamus at risus quis tellus lobortis hendrerit. Morbi facilisis dignissim bibendum. Sed venenatis arcu eget ipsum porttitor sodales. In
suscipit odio nec massa imperdiet, vel auctor lorem ultrices. Nullam eu purus odio. Etiam nec accumsan ex. Cras bibendum mi aliquet sapien accumsan cursus. In imperdiet
dolor sem, elementum dictum turpis varius non. Nunc placerat ante faucibus cursus accumsan. Mauris a quam ac neque gravida bibendum ac eu nisl. Nulla sed sem ultricies,
congue nunc id, vulputate purus.`;

export default withStyles(styles)(ProductModal);
