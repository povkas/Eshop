import { createStore } from 'redux';
// eslint-disable-next-line import/no-unresolved
import rootReducer from '../../Reducers';

const store = createStore(rootReducer);

export default store;
