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
      suggestions: [],
      hasFocus: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ hasFocus: false });
    }
  }

  changeValue(e) {
    this.setState({ searchValue: e.target.value }, () => this.changeSuggestions());
  }

  changeSuggestions() {
    const { products } = this.props;
    const qualifyingProducts = products.filter(product => this.checkIfIncludes(product));
    this.setState({ suggestions: qualifyingProducts });
  }

  checkIfIncludes(product) {
    const { searchValue } = this.state;
    const productName = product.title.toLowerCase();
    const searchString = searchValue.toLowerCase();

    return searchValue.length < 3 ? false : productName.includes(searchString);
  }

  showAllProducts() {
    const { handleSearch } = this.props;
    const { suggestions } = this.state;
    this.setState({ hasFocus: false }, () => handleSearch(suggestions));
  }

  handleSuggestionClick(product) {
    const { productHandler } = this.props;
    this.setState({ hasFocus: false, searchValue: product.title }, () => productHandler(product));
  }

  render() {
    const { classes } = this.props;
    const { searchValue, suggestions, hasFocus } = this.state;
    return (
      <div className={classes.searchDiv} ref={this.setWrapperRef}>
        <input
          id="searchInput"
          value={searchValue}
          className={classes.searchInput}
          onChange={e => this.changeValue(e)}
          onFocus={() => this.setState({ hasFocus: true })}
          placeholder="Search for products"
        />
        {hasFocus ? (
          <Paper className={classes.suggestionList} square>
            {suggestions.slice(0, 5).map(suggestion => (
              <div
                key={suggestion.id}
                className={classes.suggestion}
                onClick={() => this.handleSuggestionClick(suggestion)}
                role="button"
              >
                {suggestion.title}
              </div>
            ))}
            {suggestions.length > 5 ? (
              <div className={classes.showAll} onClick={() => this.showAllProducts()} role="button">
                Show all
              </div>
            ) : null}
            {searchValue.length > 3 && suggestions.length === 0 ? (
              <div className={classes.emptySuggestions}>There are no matching products</div>
            ) : null}
          </Paper>
        ) : null}
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  productHandler: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
};

export default withStyles(Styles)(Search);
