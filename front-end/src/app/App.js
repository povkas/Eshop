import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginButton from '../components/Navbar/Login';

import Store from '../utils/redux/store';

const a = () => <div />;
export default () => (
  <Provider store={Store}>
    <LoginButton />
    <BrowserRouter>
      <Route path="/" component={a} />
    </BrowserRouter>
  </Provider>
);
