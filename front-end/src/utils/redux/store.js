import { createStore } from 'redux';
// eslint-disable-next-line import/no-unresolved
import rootReducer from '../../reducers';

const store = createStore(rootReducer);

export default store;
