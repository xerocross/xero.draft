import React from 'react';
import ReactDOM from 'react-dom';
import MyStatefulComponent from './MyStatefulComponent.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyStatefulComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
