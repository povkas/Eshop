import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Styles from './Styles';

class ColorSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      isSelectOpened: false
    };
  }

  handleChange = event => {
    const { getColor } = this.props;
    this.setState({ [event.target.name]: event.target.value });
    getColor(event.target.value);
  };

  handleClose = () => {
    this.setState({ isSelectOpened: false });
  };

  handleOpen = () => {
    this.setState({ isSelectOpened: true });
  };

  render() {
    const { classes } = this.props;
    const { isSelectOpened, color } = this.state;

    return (
      <form>
        <FormControl className={classes.formControl}>
          <InputLabel>Select color</InputLabel>
          <Select
            open={isSelectOpened}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={color}
            onChange={this.handleChange}
            inputProps={{
              name: 'color'
            }}
            id="color"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="red">Red</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ColorSelect.propTypes = {
  classes: PropTypes.shape().isRequired,
  getColor: PropTypes.func.isRequired
};

export default withStyles(Styles)(ColorSelect);
