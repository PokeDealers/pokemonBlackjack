import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import axios from 'axios'
import BattleScreen from './BattleScreen';
import Home from './Home';
import Winner from './Winner';
import './styles.css';


//When user lands on page, they will be shown a “Pokemon blackjack instructions” screen that shows instructions of blackjack which is Home.js
//When user clicks “ok” that will link to the game screen
//On application start, store all the Pokemon into a Pokemon array
//	- create an axios call to the Pokemon api 

//Create logic for game
    //Generate random cards and display them (axios) and keep a counter for players. Start with two cards and store those into variables 
    //Store players' current scores and also their numbers (value of their cards) in the game.
    //Create two buttons, one for Standing and one for drawing.
        //- For the stand button, keep the players cards as is, and move on
        //- For the drawing button, give the player a new card.
    //When a player has a total card value of more than 21, alert that player that they are bust (Ternary operators if condition) 
    //When a player has a natural, they win automatically, unless another player has a natural. (Natural is a 10 or face card with an ace)
    //The player with the highest score without going over is the winner (one win)
    //Winner is taken to a new screen! (display pokemon)
    //Stretch: Style like pokemon battle screen.

//	- store Pokemon.id’s into a pokemon[] array
//	- grab two random id’s for Pokemon to play blackjack together and filter through them to only grab the pokemon who can evolve.
//		- run the array through a randomizer Math.floor(Math.whatever) * array.length to get the random pokemon
//		- store first result in firstPokemon
//		- store second result in secondPokemon
//Display two Pokemon that will be blackjacking
//When there is a winner (MVP: 1 win) the app will take you to a new screen (Winner.js)

//App.js
//Have a header that accurately describes the functionality of the app, as well as introduce the app with some style. 'Two friends battle it out'
//Picture of pokeball (or something decorative)
//Display basic rules of blackjack must be displayed on the intro screen.
//Have a button to start the game
//Pass props down to the battlescreen.js
    // The pokemon that are battling, cards


//BattleScreen.js
// i icon appears to remind player of the rules
// The two pokemon battling are displayed as well as the cards
// Accept the props: 
// The buttons are visible and functional(Stand and draw)
//Game logic:
    //Create logic for game
    //Generate random cards and display them (axios) and keep a counter for players. Start with two cards and store those into variables 
    //Store players' current scores and also their numbers (value of their cards) in the game.
    //Create two buttons, one for Standing and one for drawing.
        //- For the stand button, keep the players cards as is, and move on
        //- For the drawing button, give the player a new card.
    //When a player has a total card value of more than 21, alert that player that they are bust (Ternary operators if condition) 
    //When a player has a natural, they win automatically, unless another player has a natural. (Natural is a 10 or face card with an ace)
    //The player with the highest score without going over is the winner (one win)
    //Winner is taken to a new screen! (display pokemon)
    //Stretch: Style like pokemon battle screen.

    //	- store Pokemon.id’s into a pokemon[] array
    //	- grab two random id’s for Pokemon to play blackjack together and filter through them to only grab the pokemon who can evolve.
    //		- run the array through a randomizer Math.floor(Math.whatever) * array.length to get the random pokemon
    //		- store first result in firstPokemon
    //		- store second result in secondPokemon
    //Display two Pokemon that will be blackjacking
    //When there is a winner (MVP: 1 win) the app will take you to a new screen (Winner.js)


//Winner.js
//Heading saying '{ this.pokemon } has won'
//Show a picture of the pokmemon (using the api)
//Button saying play again (brings you back to the initial screen)
//Pokemon should evolve!



class App extends Component {
    constructor() {
        super();
        this.state = {
            pokemonOne: [],
            pokemonTwo: [], // store all the pokemon into initial state
            playerOneCards: [],
            playerTwoCards: [],
            deckOfCards: []
        }
    }

    // pokemonCall = () => {
    //     axios({
    //         url: 'https://pokeapi.co/api/v2/pokemon',
    //         responseType: 'json',
    //         method: 'GET',
    //     }).then( (res) => {
    //         console.log(res);
    //     })
    // }

    getPokemonOne = () => {
        const numGenerator = Math.floor(Math.random() * 200);

        axios({
                url: `https://pokeapi.co/api/v2/pokemon/${numGenerator}`  ,
                responseType: 'json',
                method: 'GET',
        })
        .then( (res) => {
            this.setState({
                pokemonOne: res.data,
            })
        })
    }

    getPokemonTwo = () => {
        const numGenerator = Math.floor(Math.random() * 200);

        axios({
                url: `https://pokeapi.co/api/v2/pokemon/${numGenerator}`  ,
                responseType: 'json',
                method: 'GET',
        })
        .then( (res) => {
            this.setState({
                pokemonTwo: res.data,
            })
        })
    }

    componentDidMount = () => {
        this.getPokemonOne();
        this.getPokemonTwo();
    }

        
        

       // const randomNumber = Math.ceil(Math.random() * 200);

        // Getting a random pokemon that evolves, and assigning this pokemon to either player 1 or 2
        // axios({
        //     url: `https://pokeapi.co/api/v2/evolution-chain/${randomNumber}/`,
        //     responseType: 'json',
        //     method: 'GET',
        // }).then( (res) => {
        //     console.log(res.data.chain.evolves_to);
        // }


    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div className="App">
                    <Route exact path="/" component= { Home } />
                    <Route path="/BattleScreen" render={ () => <BattleScreen passPokemonOne={this.state.pokemonOne} passPokemonTwo={this.state.pokemonTwo}/> } />
                    <Route path="/Winner" component={ Winner } />
                    


                    {/* <nav>
                        <Link to="/BattleScreen">BattleScreen</Link>
                    </nav> */}

                </div>
            </Router>
        )

    }
}

export default App;
