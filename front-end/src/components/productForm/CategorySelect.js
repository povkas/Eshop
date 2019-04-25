import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Styles from './Styles';
import * as categoriesAction from '../../actions/categoriesAction';

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
      isSelectOpened: false
    };
  }

  componentDidMount() {
    categoriesAction.getCategories().then(res => {
      res.sort((a, b) => a.category.localeCompare(b.category));
      this.setState({ categories: res });
    });
  }

  handleOpen = () => {
    this.setState({ isSelectOpened: true });
  };

  handleChange = event => {
    const { getCategory, resetMessage } = this.props;
    this.setState({ [event.target.name]: event.target.value });
    getCategory(event.target.value);
    resetMessage();
  };

  handleClose = () => {
    const { validate } = this.props;
    const { category } = this.state;
    this.setState({ isSelectOpened: false });
    validate(category);
  };

  render() {
    const { classes, errorMessage } = this.props;
    const { isSelectOpened, categories, category } = this.state;

    return (
      <FormControl className={classes.formControl} error={errorMessage !== ' ' && category === ''}>
        <InputLabel>Select category</InputLabel>
        <Select
          open={isSelectOpened}
          onOpen={this.handleOpen}
          onChange={this.handleChange}
          onClose={this.handleClose}
          name="category"
          value={category}
        >
          {categories.map(Category => (
            <MenuItem key={Category.category} value={Category.category}>
              {Category.category}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    );
  }
}

CategorySelect.propTypes = {
  classes: PropTypes.shape().isRequired,
  getCategory: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  resetMessage: PropTypes.func.isRequired
};

export default withStyles(Styles)(CategorySelect);
