import { createStore } from 'redux';

const initialState = {
  items: []
};

const myReducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.items = action.items;
  return newState;
};

const store = createStore(myReducer);

export default store;
