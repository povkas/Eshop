import React from 'react';
import { Input, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';

class QuantitySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantitySelected: 1,
      incrDisable: false,
      decrDisable: false,
      inputDisable: false
    };
  }

  componentDidMount() {
    const { quantity } = this.props;
    const { quantitySelected } = this.state;
    if (quantitySelected === 1) this.setState({ decrDisable: true });
    if (quantitySelected === quantity) this.setState({ incrDisable: true, inputDisable: true });
  }

  increment = () => {
    const { getQuantity, quantity } = this.props;
    const { quantitySelected } = this.state;
    if (parseInt(quantitySelected + 1) < quantity) {
      this.setState({ quantitySelected: parseInt(quantitySelected + 1) });
      getQuantity(parseInt(quantitySelected + 1));
    }
    if (quantitySelected === quantity) this.setState({ incrDisable: true });
  };

  decrement = () => {
    const { getQuantity } = this.props;
    const { quantitySelected } = this.state;
    if (quantitySelected > 1) this.setState({ quantitySelected: quantitySelected - 1 });
    if (quantitySelected === 1) this.setState({ decrDisable: true });
    getQuantity(parseInt(quantitySelected - 1));
  };

  handleChange = event => {
    const { value } = event.target;
    const { quantity, getQuantity } = this.props;
    if (value >= 1) {
      if (value > quantity) {
        this.setState({ quantitySelected: quantity });
        getQuantity(quantity);
      } else {
        this.setState({ quantitySelected: parseInt(value) });
        getQuantity(value);
      }
    } else {
      this.setState({ quantitySelected: 1 });
      getQuantity(1);
    }
  };

  render() {
    const { classes } = this.props;
    const { quantitySelected, decrDisable, incrDisable, inputDisable } = this.state;
    return (
      <div>
        <IconButton onClick={this.decrement} disabled={decrDisable}>
          <Remove />
        </IconButton>
        <Input
          onChange={this.handleChange}
          value={parseInt(quantitySelected)}
          className={classes.input}
          disabled={inputDisable}
        />
        <IconButton onClick={this.increment} disabled={incrDisable}>
          <Add />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(Styles)(QuantitySelect);
