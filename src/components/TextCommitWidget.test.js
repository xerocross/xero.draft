import React from 'react';
import ReactDOM from 'react-dom';
import TextCommitWidget from './TextCommitWidget.jsx';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup)

let textarea;
let commitButton;
let backButton;
let resetButton;
let forwardButton;


beforeEach(()=>{
    const {  getByText, container } = render(<TextCommitWidget />);
    textarea = container.querySelector("textarea");
    commitButton = getByText("commit");
    backButton = getByText("back");
    resetButton = getByText("reset to last commit");
    forwardButton = getByText("forward");
})


test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextCommitWidget />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("commit text and reset to last commit functions as expected", ()=> {
    fireEvent.change(textarea, { target: { value: 'adam' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'adam cross' } });
    // textarea is dirty
    fireEvent.click(resetButton);
    expect(textarea.value).toBe("adam");
});

test("two commits, one back", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.click(backButton);
    expect(textarea.value).toBe("apple");
});

test("three commits, two back", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear orange' } });
    fireEvent.click(commitButton);
    fireEvent.click(backButton);
    fireEvent.click(backButton);
    expect(textarea.value).toBe("apple");
});

test("two back, one forward", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear orange' } });
    fireEvent.click(commitButton);

    fireEvent.click(backButton);
    fireEvent.click(backButton);
    fireEvent.click(forwardButton);
    expect(textarea.value).toBe("apple pear");
});

test("two back, two forward", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear orange' } });
    fireEvent.click(commitButton);

    fireEvent.click(backButton);
    fireEvent.click(backButton);
    fireEvent.click(forwardButton);
    fireEvent.click(forwardButton);
    expect(textarea.value).toBe("apple pear orange");
});

test("double commit has no effect", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.click(commitButton);  // duplicate commit intentional
    fireEvent.change(textarea, { target: { value: 'apple pear orange' } });
    fireEvent.click(commitButton);

    fireEvent.click(backButton);
    // since the form isn't dirty, we expect
    expect(textarea.value).toBe("apple pear");
});

test("forward does nothing if we haven't gone backward first", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.click(forwardButton);
    fireEvent.click(forwardButton); // duplicate intentional, but it should not matter
    fireEvent.click(backButton);
    expect(textarea.value).toBe("apple");
});

test("back plus dirty means forward is gone", () => {
    fireEvent.change(textarea, { target: { value: 'apple' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear' } });
    fireEvent.click(commitButton);
    fireEvent.change(textarea, { target: { value: 'apple pear orange' } });
    fireEvent.click(commitButton);
    fireEvent.click(backButton);
    //  now the text should be "apple pear".
    fireEvent.change(textarea, { target: { value: 'apple pear banana' } });
    // we dirtied the form
    fireEvent.click(forwardButton);
    // there is no forward anymore, so we expect to see no change
    expect(textarea.value).toBe("apple pear banana");
});