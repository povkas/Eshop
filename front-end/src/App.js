import React from 'react';
import { Provider } from 'react-redux';

import LoginButton from './Navbar/Login';

import Store from './redux/store';

export default () => (
  <Provider store={Store}>
    <LoginButton />
  </Provider>
);
