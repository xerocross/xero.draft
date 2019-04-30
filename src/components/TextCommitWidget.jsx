import React, { Component } from "react";
import { createStore } from 'redux'
import "./TextCommitWidget.css";
import { getNewTextAction, COMMIT, GO_BACK, GO_FORWARD, RESET, CLEAR_ALL } from "../redux-actions";
import { draftApp } from "../reducers";
import { persistStateToStorage } from "../bottle";
import debounce from "lodash.debounce";

class TextCommitWidget extends Component {
    constructor() {
        super();
        this.store = createStore(draftApp);
        this.updateStorage = debounce((state) => {
            console.log("updating storage");
            persistStateToStorage(state);
        }, 200);

        this.store.subscribe(() => {
            let state = this.store.getState();
            this.updateStorage(state);
            this.setState(()=> {return this.updateFromState(state)});
        });
        this.state = this.updateFromState(this.store.getState());

        this.handleTextChange = this.handleTextChange.bind(this);
        this.commit = this.commit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.reset = this.reset.bind(this);
        this.handleNewText = this.handleNewText.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.updateFromState = this.updateFromState.bind(this);
    }


    updateFromState (state) {
        let existsNext = state.currentCommitIndex < state.commits.length - 1;
        let existsPrevious = state.currentCommitIndex > 0;
        return {
            text : state.currentText,
            dirty : state.dirty,
            existsNext : existsNext,
            existsPrevious : existsPrevious
        }
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
        if (window.confirm("Lose any current edits and go back to last commit?  (This cannot be undone.)")) {
            this.store.dispatch(RESET);
        }
    }

    goBack () {
        this.store.dispatch(GO_BACK);
    }

    goForward () {
        this.store.dispatch(GO_FORWARD);
    }

    clearAll () {
        if (window.confirm("Delete all contents and all commits?  (This cannot be undone.)")) {
            this.store.dispatch(CLEAR_ALL);
        }
    }

    render() {
        return (
            <div className = "outer">
                <p className = "instructions">
                    Click commit to save a snapshot of the current text.
                    Then you can use the back and forward buttons to browse 
                    among these commits.
                </p>
                <p>
                    <textarea 
                        className = {`form-control my-textarea`}
                        onChange = {this.handleTextChange}
                        value = {this.state.text}
                    >
                    </textarea>
                </p>
                <div>
                    <p className = "btn-group">
                        <input 
                            type="button" 
                            value="back"
                            className = "btn btn-primary"
                            disabled= { (this.state.dirty || this.state.existsPrevious == false) }
                            onClick = {this.goBack}
                        />
                        <input 
                            type="button" 
                            value="commit" 
                            className = "btn btn-primary"
                            disabled= { !this.state.dirty }
                            onClick = {this.commit}
                        />
                        <input 
                            type="button" 
                            value="forward" 
                            className = "btn btn-primary"
                            disabled= { (this.state.existsNext == false) }
                            onClick = {this.goForward}
                        />
                    </p>
                </div>
                <div>
                    <p className = "btn-group">
                        <input 
                            type="button" 
                            value="reset to last commit"
                            className = "btn btn-warning"
                            disabled= { !this.state.dirty }
                            onClick = {this.reset}
                        />
                        <input 
                            type="button" 
                            value="clear all"
                            onClick = {this.clearAll}
                            className = "btn btn-danger"
                        />
                    </p>
                </div>
            </div>
        );
    }
}
export default TextCommitWidget;