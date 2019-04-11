import Drawer from '@material-ui/core/Drawer';
// import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
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

  render() {
    const { left, categories } = this.state;
    const { selectedCategory, selectCategory } = this.props;
    // console.log(selectCategory);
    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}>
          <Menu />
        </IconButton>
        <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', true)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <List>
              {categories.map(category => (
                <DropDownCategories
                  selectedCategory={selectedCategory}
                  selectCategory={selectCategory}
                  category={category}
                  key={category.id}
                />
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  selectCategory: PropTypes.shape().isRequired,
  selectedCategory: PropTypes.shape().isRequired
};

export default CategoriesList;
