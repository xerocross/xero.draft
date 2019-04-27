import React, { Component } from "react";
import "./MyStatefulComponent.css";

class MyStatefulComponent extends Component {
    constructor() {
        super();
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
        if (this.state.dirty === false) {
            return;
        } else {
            this.setState((state, props)=>{
                return {
                    text: state.text,
                    previous: state.previous,
                    next: null,
                    dirty : false
                }
            });
        }
    }

    handleNewText (text) {
        if (this.state.dirty) {
            this.setState((state, props)=>{
                return {
                    text: text,
                    previous: state.previous,
                    next: null,
                    dirty : true
                }
            });
        } else {
            this.setState((state, props)=>{
                return {
                    text: text,
                    previous: state,
                    next: null,
                    dirty : true
                }
            });
        }
    }

    handleTextChange (event) {
        this.handleNewText(event.target.value);
    }

    reset () {
        if (this.state.dirty) {
            this.setState((state, props)=>{
                let prev = state.previous;
                return {
                    text: prev.text,
                    previous: prev.previous,
                    next: null,
                    dirty : false
                }
            });
        }
    }

    goBack () {
        if (this.state.dirty) {
            alert("To go back, first you must commit current changes or else reset to the most recent commit.");
            return;
        } else {
            if (this.state.previous) {
                let prev = this.state.previous;
                this.setState((state, props)=> {
                    return {
                        text: prev.text,
                        previous: prev.previous,
                        next: state,
                        dirty : false
                    };
                });
            }
        }
    }

    goForward () {
        if (this.state.next) {
            let next = this.state.next;
            this.setState((state, props)=> {
                return {
                    text: next.text,
                    previous: state,
                    next: next.next,
                    dirty : false
                };
            });
        }
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
export default MyStatefulComponent;