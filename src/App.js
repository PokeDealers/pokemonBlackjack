import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
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
            pokemonOneName: "",
            pokemonTwoName: "",
            pokemonOneImg: [],
            pokemonTwoImg: [], 
            pokemonOneCards: [],
            pokemonTwoCards: [],
            deckOfCards: [],
            deckId: ""
        }
    }


    getPokemonOne = () => {
        const numGenerator = Math.floor(Math.random() * 200);

        axios({
                url: `https://pokeapi.co/api/v2/pokemon/${numGenerator}`  ,
                responseType: 'json',
                method: 'GET',
        })
        .then( (res) => {
            console.log('api results', res)
            this.setState({
                pokemonOneName: res.data.name,
                pokemonOneImg: res.data.sprites,
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
                pokemonTwoName: res.data.name,
                pokemonTwoImg: res.data.sprites,
            })
        })
    }

    // Function to get a new deck of cards (with deck_id)
    getDeckOfCards = () => {
        axios({
            url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
            responseType: 'json',
            method: 'GET',
        })
        .then ((res) => {
            console.log('deck of cards API', res);
            // storing the deck_id in a variable since we need to re-use it
            const deckId = res.data.deck_id;
            // also added "deckId" to state...maybe this will be useful somewhere below?
            this.setState({
                deckId: res.data.deck_id
            })

            // Another axios call, this time using the draw 2 cards endpoint (for pokemonOneCards)
            axios({
                url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
                responseType: 'json',
                method: 'GET',
            })
            .then ((response) => {
                console.log("draw 2 cards API", response.data.cards);
                // Setting the cards into state for pokemonOneCards
                this.setState({
                    pokemonOneCards: response.data.cards
                })
            })

            // Same axios call as above, but to get pokemonTwoCards
            axios({
                url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
                responseType: 'json',
                method: 'GET',
            })
            .then ((response) => {
                console.log("draw 2 cards API", response.data.cards);
                this.setState({
                    // Setting the cards into state for pokemonTwoCards
                    pokemonTwoCards: response.data.cards
                })
            })
        })
    }

    // started trying to work out the logic of clicking the "Draw Card" button, and having the API call to the same deck_id again, to draw 1 more card, but got stumped here lol
    // drawCardButton = () => {
    //     axios({
    //         url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
    //         responseType: 'json',
    //         method: 'GET',
    //     })
    //     .then ((response) => {
    //         console.log("drawing one card at a time", response.data.cards);
    //     })
    // }

    componentDidMount = () => {
        this.getPokemonOne();
        this.getPokemonTwo();
        this.getDeckOfCards();
    }

        
        
        // Code for trying to get pokemon that evolves - to revisit later!
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

                    <Route 
                        path="/BattleScreen" 
                        render={ () => 
                            <BattleScreen 
                                passPokemonInfo={ this.state } 
                            /> } />

                    <Route path="/Winner" component={ Winner } />
                    

                </div>
            </Router>
        )

    }
}

export default App;
