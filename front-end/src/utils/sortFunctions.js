export const compareByCriteria = criteria => {
  switch (criteria) {
    case 'nameAscending':
      return function compare(a, b) {
        if (a.title > b.title) return -1;
        if (b.title > a.title) return 1;
        return 0;
      };
    case 'priceDescending':
      return function compare(a, b) {
        return b.price - a.price;
      };
    case 'priceAscending':
      return function compare(a, b) {
        return a.price - b.price;
      };
    case 'dateAscending':
      return function compare(a, b) {
        if (a.created > b.created) return -1;
        if (b.created > a.created) return 1;
        return 0;
      };
    case 'dateDescending':
      return function compare(a, b) {
        if (a.created > b.created) return 1;
        if (b.created > a.created) return -1;
        return 0;
      };
    default:
      return function compare(a, b) {
        if (a.title > b.title) return 1;
        if (b.title > a.title) return -1;
        return 0;
      };
  }
};
