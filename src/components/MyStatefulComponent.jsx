import React, { Component } from "react";
import "./MyStatefulComponent.css";

class MyStatefulComponent extends Component {
    constructor() {
        super();
        this.state = {
            text : ""
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    history = [];
    stateBuilder () {

    }

    handleTextChange (event) {
        console.log(event.target.value);
        this.setState({text: event.target.value});
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
                    <input type="button" value="commit"/>
                </p>
            </div>
        );
    }
}
export default MyStatefulComponent;