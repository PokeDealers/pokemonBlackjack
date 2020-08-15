import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import axios from 'axios'

import './App.css';

class App extends Component {

    componentDidMount() {
    axios({
        url: '',
        responseType: 'json',
        method: 'GET',
        params: {
        // params here
        }
    })
        .then( (res) => {
            
        })
    }


    render() {
        return (
            <div className="App">
            <h1>Pokemon blackjack</h1>
            </div>
        )

    }
}

export default App;
