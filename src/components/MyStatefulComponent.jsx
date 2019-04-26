import React, { Component } from "react";
import "./MyStatefulComponent.css";

class MyStatefulComponent extends Component {
    constructor() {
        super();
        this.state = {
            text : "",
            previous : null,
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.commit = this.commit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
    }

    commit () {
        console.log("commit");
        console.log(this.state);
        this.setState((state, props)=>{
            return {
                text: state.text,
                previous: this.state,
            }
        });
    }

    goBack () {
        console.log("goBack");
        if (this.state.previous) {
            let prev = this.state.previous;
            this.setState((state, props)=> {
                return {
                    text: prev.text,
                    previous: prev.previous,
                    next: state
                };
            });
        }
    }

    goForward () {
        console.log("goForward");
        if (this.state.next) {
            let next = this.state.next;
            this.setState((state, props)=> {
                return {
                    text: next.text,
                    previous: state,
                    next: next.next
                };
            });
        }
    }

    handleTextChange (event) {
        event.persist();
        this.setState((state, props)=>{
            return {
                text: event.target.value,
                previous: state.previous
            }
        });
    }

    render() {
        return (
            <div>
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
                        onClick = {this.commit}
                    />
                    <input 
                        type="button" 
                        value="back" 
                        onClick = {this.goBack}
                    />
                    <input 
                        type="button" 
                        value="forward" 
                        onClick = {this.goForward}
                    />
                </p>
            </div>
        );
    }
}
export default MyStatefulComponent;