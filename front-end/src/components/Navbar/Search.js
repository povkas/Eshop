import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Styles from './Styles';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      hasFocus: document.activeElement.id === 'searchInput',
      suggestions: []
    };
  }

  changeValue = e => {
    this.setState({ searchValue: e.target.value }, () => this.changeSuggestions());
  };

  changeSuggestions() {
    const { searchValue } = this.state;
    const { products } = this.props;
    if (searchValue.length >= 3) {
      const qualifyingProducts = products.filter(product => product.title.includes(searchValue));
      this.setState({ suggestions: qualifyingProducts });
    }
  }

  render() {
    const { classes } = this.props;
    const { searchValue, hasFocus, suggestions } = this.state;
    return (
      <div className={classes.searchDiv}>
        <input id="searchInput" value={searchValue} onChange={this.changeValue} />
        {hasFocus ? (
          <Paper>
            {suggestions.map(suggestion => (
              <div>{suggestion.title}</div>
            ))}
          </Paper>
        ) : null}
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default withStyles(Styles)(Search);
