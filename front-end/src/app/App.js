import React from 'react';
import { Provider } from 'react-redux';
import { MainBody } from '../containers/mainBody';
import Store from '../utils/redux/store';

export default () => (
  <Provider store={Store}>
    <MainBody />
  </Provider>
);
