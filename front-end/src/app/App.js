import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/Navbar/Login';
import store from '../utils/redux/store';

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
    </BrowserRouter>
  </Provider>
);
