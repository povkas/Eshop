import React from 'react';
import { mount } from 'enzyme';

import Search from './Search';

describe('Search tests', () => {
  const wrapper = mount(<Search />);
  it('Search renders', () => {
    expect(wrapper.find('#searchInput').length).toBe(1);
  });

  it('Suggestion window renders on focus', () => {
    expect(wrapper.find('#suggestionList').length).toBe(0);
    wrapper.find('#searchInput').simulate('focus');
    expect(wrapper.find('#suggestionList').length).toBe(3);
  });
});
