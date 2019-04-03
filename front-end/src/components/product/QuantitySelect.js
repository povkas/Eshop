import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';

class QuantitySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantitySelected: 1,
      helperText: ' ',
      incrDisable: false,
      decrDisable: false,
      inputDisable: false
    };
  }

  componentDidMount() {
    const { quantity } = this.props;
    const { quantitySelected } = this.state;
    if (quantitySelected === 1) this.setState({ decrDisable: true });
    if (quantitySelected === quantity)
      this.setState({ incrDisable: true, inputDisable: true, helperText: 'Last one!' });
  }

  incrementClick = () => {
    const { getQuantity, quantity } = this.props;
    const { quantitySelected } = this.state;
    if (parseInt(quantitySelected + 1) < quantity) {
      this.setState({ quantitySelected: parseInt(quantitySelected + 1), helperText: ' ' });
      getQuantity(parseInt(quantitySelected + 1));
    }
    if (parseInt(quantitySelected + 1) === quantity) this.setState({ incrDisable: true });
  };

  decrementClick = () => {
    const { getQuantity } = this.props;
    const { quantitySelected } = this.state;
    if (quantitySelected > 1)
      this.setState({ quantitySelected: parseInt(quantitySelected - 1), helperText: ' ' });
    if (parseInt(quantitySelected - 1) === 1) this.setState({ decrDisable: true });
    getQuantity(parseInt(quantitySelected - 1));
  };

  handleChange = event => {
    const { value } = event.target;
    const { quantity, getQuantity } = this.props;
    if (value >= 1) {
      if (value >= quantity) {
        this.setState({ quantitySelected: quantity, helperText: 'No more!', incrDisable: true });
        getQuantity(quantity);
      } else {
        this.setState({ quantitySelected: parseInt(value), helperText: ' ' });
        getQuantity(value);
      }
    } else {
      this.setState({ quantitySelected: 1, decrDisable: true });
      getQuantity(1);
    }
  };

  render() {
    const { classes } = this.props;
    const { quantitySelected, decrDisable, incrDisable, inputDisable, helperText } = this.state;
    return (
      <div>
        <IconButton onClick={this.decrementClick} disabled={decrDisable}>
          <Remove />
        </IconButton>
        <TextField
          className={classes.textField}
          onChange={this.handleChange}
          value={parseInt(quantitySelected)}
          disabled={inputDisable}
          helperText={helperText}
        />
        <IconButton onClick={this.incrementClick} disabled={incrDisable}>
          <Add />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(Styles)(QuantitySelect);
