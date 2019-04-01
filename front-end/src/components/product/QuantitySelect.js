import React from 'react';
import { Input, IconButton } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

class Quantity extends React.Component {
  constructor(props) {
    super(props);
    const { quantity } = this.props;
    this.state = {
      quantitySelected: quantity
    };
  }

  increment = () => {
    const { getQuantity } = this.props;
    const { quantitySelected } = this.state;
    this.setState({ quantitySelected: parseInt(quantitySelected + 1) });
    getQuantity(parseInt(quantitySelected + 1));
  };

  decrement = () => {
    const { getQuantity } = this.props;
    const { quantitySelected } = this.state;
    if (quantitySelected > 1) this.setState({ quantitySelected: quantitySelected - 1 });
    getQuantity(parseInt(quantitySelected - 1));
  };

  handleChange = event => {
    const { value } = event.target;
    const { quantity, getQuantity } = this.props;
    if (value >= 1) {
      this.setState({ quantitySelected: parseInt(value) });
      getQuantity(value);
    } else {
      this.setState({ quantitySelected: quantity });
      getQuantity(quantity);
    }
  };

  render() {
    // const { quantity } = this.props;
    const { quantitySelected } = this.state;
    return (
      <div>
        <IconButton onClick={this.decrement}>
          <Remove />
        </IconButton>
        <Input
          onChange={this.handleChange}
          value={parseInt(quantitySelected)}
          placeholder="Enter your desired quantity"
        />
        <IconButton onClick={this.increment}>
          <Add />
        </IconButton>
      </div>
    );
  }
}

export default Quantity;
