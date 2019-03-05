import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/Navbar/NavBarContainer';

import Store from '../utils/redux/store';

const a = () => <div />;
export default () => (
  <Provider store={Store}>
    <NavBar />
    <BrowserRouter>
      <Route path="/" component={a} />
    </BrowserRouter>
  </Provider>
);
