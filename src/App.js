import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import axios from 'axios'

import Header from './Header'

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemon: [],

        }
    }

    componentDidMount() {
        // axios({
        //     url: 'https://pokeapi.co/api/v2/pokemon',
        //     responseType: 'json',
        //     method: 'GET',
        //     params: {
        //         q: id
        //     }
        // }).then( (res) => {
        //     console.log(res);
        // })
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
