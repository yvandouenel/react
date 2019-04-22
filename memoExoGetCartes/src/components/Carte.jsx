import React, { Component } from 'react';
class Carte extends Component {
    state = {
        question: this.props.question,
        reponse: this.props.reponse
    }
    render() {
        return (<div>
            <p>{this.state.question}</p>
            <p>{this.state.reponse}</p>
        </div>);
    }
}

export default Carte;