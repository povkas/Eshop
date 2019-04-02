import { createStore } from 'redux';
// ideti middleWare
const initialState = {
  shoppingCart: [],
  items: []
};

const myReducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.items = action.items;
  return newState;
};

const store = createStore(myReducer);

export default store;
