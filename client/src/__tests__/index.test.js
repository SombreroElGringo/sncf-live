import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../index';
import { mount } from 'enzyme';

jest.mock('react-dom', () => ({ render: jest.fn() }));

it('renders without crashing', () => {
  mount(<Main />);
});

it('should call render with Main component', () => {
  expect(ReactDOM.render).toHaveBeenCalledWith(<Main />, null);
});
