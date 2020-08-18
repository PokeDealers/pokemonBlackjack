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
            pokemonOneImg: [],
            pokemonOneEvolvedName: "",
            pokemonOneEvolvedImg: [],
            pokemonTwoName: "",
            pokemonTwoImg: [], 
            pokemonTwoEvolvedName: "",
            pokemonTwoEvolvedImg: [],
            pokemonOneCards: [],
            pokemonTwoCards: [],
            deckOfCards: [],
            deckId: "",
            pokemonOneTotalValue: "",
        }
    }

    // Function to get pokemonOne
    getPokemonOne = () => {

        const numGenerator = Math.floor(Math.random() * 200);
        // API call to the Pokemon Evolution Chain Endpoint
        axios({
            url: `https://pokeapi.co/api/v2/evolution-chain/${numGenerator}/`,
            responseType: `json`,
            method: `GET`
        })
        .then((res) => {
            const evolutionArray = res.data.chain.evolves_to;
            // check to see if there is an evolution array; if no, call the same function again
            if (evolutionArray.length === 0) {
                this.getPokemonOne()
            } else {
            // if yes, save the pokemon name and evolved pokemon name into variables
                const pokemonName = res.data.chain.species.name;
                const evolvedPokemonName = evolutionArray[0].species.name;

                // set state for pokemonOneName and pokemonOneEvolvedName
                this.setState({
                    pokemonOneName: pokemonName,
                    pokemonOneEvolvedName: evolvedPokemonName
                })

                // Create empty array for Pokemon image promises 
                const imagePromises =[];

                // Axios promise for getting the image for pokemonOne
                const pokemonImagePromise = axios({
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
                    responseType: `json`,
                    method: `GET`
                })

                setTimeout(imagePromises.push(pokemonImagePromise), 100);

                // Axios promise for getting the image for the evolved version of pokemonOne
                const evolvedPokemonImagePromise = axios({
                    url: `https://pokeapi.co/api/v2/pokemon/${evolvedPokemonName}`,
                    responseType: `json`,
                    method: `GET`
                })

                setTimeout(imagePromises.push(evolvedPokemonImagePromise), 100);

                // When both Promises are fulfilled, set state for both pokemon one's images
                Promise.all(imagePromises).then((res) => {
                    this.setState({
                        pokemonOneImg: res[0].data.sprites.front_default,
                        pokemonOneEvolvedImg: res[1].data.sprites.front_default
                    })
                })
            }
        })
    }

    // Function to get pokemonTwo
    getPokemonTwo = () => {

        const numGenerator = Math.floor(Math.random() * 200);
        // API call to the Pokemon Evolution Chain Endpoint
        axios({
            url: `https://pokeapi.co/api/v2/evolution-chain/${numGenerator}/`,
            responseType: `json`,
            method: `GET`
        })
        .then((res) => {
            const evolutionArray = res.data.chain.evolves_to;
            // check to see if there is an evolution array; if no, call the same function again
            if (evolutionArray.length === 0) {
                this.getPokemonTwo()
            } else {
            // if yes, save the pokemon name and evolved pokemon name into variables
                const pokemonName = res.data.chain.species.name;
                const evolvedPokemonName = evolutionArray[0].species.name;

                // set state for pokemonOneName and pokemonOneEvolvedName
                this.setState({
                    pokemonTwoName: pokemonName,
                    pokemonTwoEvolvedName: evolvedPokemonName
                })

                // Create empty array for Pokemon image promises 
                const imagePromises =[];

                // Axios promise for getting the image for pokemonOne
                const pokemonImagePromise = axios({
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
                    responseType: `json`,
                    method: `GET`
                })

                setTimeout(imagePromises.push(pokemonImagePromise), 100);

                // Axios promise for getting the image for the evolved version of pokemonOne
                const evolvedPokemonImagePromise = axios({
                    url: `https://pokeapi.co/api/v2/pokemon/${evolvedPokemonName}`,
                    responseType: `json`,
                    method: `GET`
                })

                setTimeout(imagePromises.push(evolvedPokemonImagePromise), 100);

                // When both Promises are fulfilled, set state for both pokemon one's images
                Promise.all(imagePromises).then((res) => {
                    this.setState({
                        pokemonTwoImg: res[0].data.sprites.front_default,
                        pokemonTwoEvolvedImg: res[1].data.sprites.front_default
                    })
                })
            }
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
            this.setState({
                deckId: res.data.deck_id
            })

            // put deckId into a variable so we can re-use it 
            const deckId = this.state.deckId;

            // Another axios call, this time using the draw 2 cards endpoint (to get pokemonOneCards)
            axios({
                url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
                responseType: 'json',
                method: 'GET',
            })
            .then ((response) => {
                // *****Commented this part out, because I think it might be better to setState on pokemonOneCards further down, using the playerOneCards array
                // Setting the cards into state for pokemonOneCards
                // this.setState({
                //     pokemonOneCards: response.data.cards
                // })

                const cards = response.data.cards;
                const playerOneCards = [...this.state.pokemonOneCards];

                console.log('API result - 2 cards', cards);

                cards.forEach((card) => {
                    playerOneCards.push({
                        number: card.value,
                        image: card.image,
                        suit: card.suit,
                        code: card.code
                    })
                })

                this.setState({
                    pokemonOneCards: playerOneCards
                })

                console.log('playerOneCards', playerOneCards)
                console.log('state for pokemonOneCards',this.state.pokemonOneCards);

                // ****** At this point, pokemonOneCards in state is set, and the commented out code below works to calculate the sum of the value of the cards....but only for the two cards that are initially on the screen. Currently trying out to figure out if the below code can be moved to the "Draw Card" function for when a 3rd card gets added
                // const arrayOfValues = [];
                // const suits = ["QUEEN", "KING", "JACK"];

                // playerOneCards.forEach((card) => {
                //     if (suits.includes(card.number)) {
                //         arrayOfValues.push(10);
                //     } else if (card.number === "ACE") {
                //         arrayOfValues.push(11);
                //     } else {
                //         arrayOfValues.push(parseInt(card.number))
                //     }
                    
                // })

                // let playerOneTotal = arrayOfValues.reduce((a, b) => a + b, 0);

                // while (playerOneTotal > 21 && arrayOfValues.includes(11)) {
                //     arrayOfValues[arrayOfValues.indexOf(11, 0)] = 1;
                //     playerOneTotal = arrayOfValues.reduce((a, b) => a + b, 0);
                // }

                // console.log('playerOneTotal', playerOneTotal);

                // this.setState({
                //     pokemonOneTotalValue: playerOneTotal
                // })


            })

            // Same axios call as above, but to get pokemonTwoCards
            axios({
                url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
                responseType: 'json',
                method: 'GET',
            })
            .then ((response) => {
                this.setState({
                    // Setting the cards into state for pokemonTwoCards
                    pokemonTwoCards: response.data.cards
                })
            })
        })
    }

    // Function for when Pokemon One clicks "Draw Card"
    drawCardPokemonOne = () => {
        const deckId = this.state.deckId;
        
        axios ({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
            method: `GET`,
            responseType: `json`
        })
        .then((res) => {
            const newCard = res.data.cards[0]

            const newCardsArray = [...this.state.pokemonOneCards];

            newCardsArray.push(newCard);
            this.setState({
                pokemonOneCards: newCardsArray
            })

            console.log('newCardsArray', newCardsArray);
            console.log('updated state for pokemon cards', this.state.pokemonOneCards)

            // **** currently working here, to see if I can get the same code that worked above (currently commented out) that calculates the sum of pokemonOne's cards, but for it to take into consideration when a 3rd card is added 
            const arrayOfValues = [];
            const suits = ["QUEEN", "KING", "JACK"];

            this.state.pokemonOneCards.forEach((card) => {
                if (suits.includes(card.number)) {
                    arrayOfValues.push(10);
                } else if (card.number === "ACE") {
                    arrayOfValues.push(11);
                } else {
                    arrayOfValues.push(parseInt(card.number))
                }
                
            })

            let playerOneTotal = arrayOfValues.reduce((a, b) => a + b, 0);

            while (playerOneTotal > 21 && arrayOfValues.includes(11)) {
                arrayOfValues[arrayOfValues.indexOf(11, 0)] = 1;
                playerOneTotal = arrayOfValues.reduce((a, b) => a + b, 0);
            }

            console.log('playerOneTotal', playerOneTotal);

            this.setState({
                pokemonOneTotalValue: playerOneTotal
            })
        })
    }

    // Function for when Pokemon Two clicks "Draw Card"
    drawCardPokemonTwo = () => {
        const deckId = this.state.deckId;
        
        axios ({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
            method: `GET`,
            responseType: `json`
        })
        .then((res) => {
            const newCard = res.data.cards[0]

            const newCardsArray = [...this.state.pokemonTwoCards];
            
            newCardsArray.push(newCard);
            this.setState({
                pokemonTwoCards: newCardsArray
            })
        })
    }

    componentDidMount = () => {
        this.getPokemonOne();
        this.getPokemonTwo();
        this.getDeckOfCards();
    }

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
                                pokemonOneDrawCard={ () => this.drawCardPokemonOne() }
                                pokemonTwoDrawCard={ () => this.drawCardPokemonTwo() }
                            /> } />

                    <Route path="/Winner" component={ Winner } />
                    

                </div>
            </Router>
        )
    }
}

export default App;
