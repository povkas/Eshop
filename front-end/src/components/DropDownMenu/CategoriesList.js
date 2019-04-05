import React from 'react';
import { DropDownCategories } from '.';
import * as categoriesAction from '../../actions/categoriesAction';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    categoriesAction.getCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        {categories.map(category => (
          <DropDownCategories category={category} key={category.key} />
        ))}
      </div>
    );
  }
}

export default CategoriesList;
