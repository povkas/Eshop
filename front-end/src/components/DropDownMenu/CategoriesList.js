import Drawer from '@material-ui/core/Drawer';
// import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import List from '@material-ui/core/List';
import { Menu } from '@material-ui/icons';
import { DropDownCategories } from '.';
import * as categoriesAction from '../../actions/categoriesAction';
// import products from '../../utils/constants/api';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      left: false
    };
  }

  componentDidMount() {
    categoriesAction.getCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { left, categories, anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.toggleDrawer('left', true)}
        >
          <Menu />
        </IconButton>
        <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <List>
              {categories.map(category => (
                <DropDownCategories category={category} />
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default CategoriesList;
