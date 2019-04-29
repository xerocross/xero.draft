import React, { Component } from "react";
import { createStore } from 'redux'
import "./TextCommitWidget.css";
import { getNewTextAction, COMMIT, GO_BACK, GO_FORWARD, RESET } from "../redux-actions";
import { textCommitApp } from "../redux-reducers";


class TextCommitWidget extends Component {
    constructor() {
        super();
        this.store = createStore(textCommitApp);
        this.store.subscribe(() => {
            this.setState(()=> {
                return this.store.getState()
            })
        });

        this.state = {
            text : "",
            previous : null,
            next: null,
            dirty : false
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.commit = this.commit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.reset = this.reset.bind(this);
        this.handleNewText = this.handleNewText.bind(this);
    }

    commit () {
        this.store.dispatch(COMMIT);
    }

    handleNewText (text) {
        this.store.dispatch(getNewTextAction(text));
    }

    handleTextChange (event) {
        this.handleNewText(event.target.value);
    }

    reset () {
        this.store.dispatch(RESET);
    }

    goBack () {
        this.store.dispatch(GO_BACK);
    }

    goForward () {
        this.store.dispatch(GO_FORWARD);
    }

    render() {
        return (
            <div className = "my-stateful-component">
                <p>
                    Click commit to save a snapshot of the current text.
                    Then you can use the back and forward buttons to browse 
                    among these commits.
                </p>
                <p>
                    <textarea 
                        className = "myTextarea" 
                        onChange = {this.handleTextChange}
                        value = {this.state.text}
                    >
                    </textarea>
                </p>
                <p>
                    <input 
                        type="button" 
                        value="commit" 
                        disabled= { !this.state.dirty }
                        onClick = {this.commit}
                    />
                </p>
                <p>
                    <input 
                        type="button" 
                        value="reset to last commit" 
                        disabled= { !this.state.dirty }
                        onClick = {this.reset}
                    />
                    <input 
                        type="button" 
                        value="back"
                        disabled= { (this.state.dirty || this.state.previous == null) }
                        onClick = {this.goBack}
                    />
                    <input 
                        type="button" 
                        value="forward" 
                        disabled= { (this.state.next == null) }
                        onClick = {this.goForward}
                    />
                </p>
            </div>
        );
    }
}
export default TextCommitWidget;