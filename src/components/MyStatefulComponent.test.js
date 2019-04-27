import React from 'react';
import ReactDOM from 'react-dom';
import MyStatefulComponent from './MyStatefulComponent.jsx';
import { render, fireEvent } from 'react-testing-library';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyStatefulComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("commit text and reset to last commmit function as expected", ()=> {
    const {  getByText, container } = render(<MyStatefulComponent />)
    let textarea = container.querySelector("textarea");
    fireEvent.change(textarea, { target: { value: 'adam' } });
    let commitButton = getByText("commit");
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'adam cross' } });
    let resetButton = getByText("reset to last commit");
    fireEvent.click(resetButton);
    expect(textarea.value).toBe("adam");
});
