import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { DropDownCategories } from '.';
import * as categoriesAction from '../../actions/categoriesAction';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      anchorEl: null
    };
  }

  componentDidMount() {
    categoriesAction.getCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { categories, anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          open menu
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {categories.map(category => (
            <DropDownCategories category={category} />
          ))}
        </Menu>
      </div>
    );
  }
}

export default CategoriesList;
