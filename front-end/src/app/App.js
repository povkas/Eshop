import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBarContainer from '../components/Navbar/NavBarContainer';
import Store from '../utils/redux/store';

const a = () => <div />;
export default () => (
  <Provider store={Store}>
    <NavBarContainer />
    <BrowserRouter>
      <Route path="/" component={a} />
    </BrowserRouter>
  </Provider>
);
