import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import axios from 'axios'
import BattleScreen from './BattleScreen';
import Home from './Home';
import Winner from './Winner';
import './styles.css';


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
            pokemonOneCardsValue: "",
            pokemonTwoCardsValue: "",
            pokemonOneWins: false,
            pokemonTwoWins: false,
            noWinners: false
        }
    }


    // ********** POKEMON FUNCTIONS **********

    // Function to get pokemonOne
    getPokemonOne = () => {
        const numGenerator = Math.floor(Math.random() * 151);
        // API call to the Pokemon Evolution Chain Endpoint
        axios({
            url: `https://pokeapi.co/api/v2/evolution-chain/${numGenerator}/`,
            responseType: `json`,
            method: `GET`
        })
        .then((res) => {
            const evolutionApiArray = res.data.chain.evolves_to;
            // check to see if there is an evolution array; if no, call the same function again
            if (evolutionApiArray.length === 0) {
                this.getPokemonOne()
            } else {
            // if yes, save the pokemon name and evolved pokemon name into variables
                const pokemonName = res.data.chain.species.name;
                const evolvedPokemonName = evolutionApiArray[0].species.name;

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
        const numGenerator = Math.floor(Math.random() * 151);
        // API call to the Pokemon Evolution Chain Endpoint
        axios({
            url: `https://pokeapi.co/api/v2/evolution-chain/${numGenerator}/`,
            responseType: `json`,
            method: `GET`
        })
        .then((res) => {
            const evolutionApiArray = res.data.chain.evolves_to;
            // check to see if there is an evolution array; if no, call the same function again
            if (evolutionApiArray.length === 0) {
                this.getPokemonTwo()
            } else {
            // if yes, save the pokemon name and evolved pokemon name into variables
                const pokemonName = res.data.chain.species.name;
                const evolvedPokemonName = evolutionApiArray[0].species.name;

                // set state for pokemonTwoName and pokemonTwoEvolvedName
                this.setState({
                    pokemonTwoName: pokemonName,
                    pokemonTwoEvolvedName: evolvedPokemonName
                })

                // Create empty array for Pokemon image promises 
                const imagePromises =[];

                // Axios promise for getting the image for pokemonTwo
                const pokemonImagePromise = axios({
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
                    responseType: `json`,
                    method: `GET`
                })

                setTimeout(imagePromises.push(pokemonImagePromise), 100);

                // Axios promise for getting the image for the evolved version of pokemonTwo
                const evolvedPokemonImagePromise = axios({
                    url: `https://pokeapi.co/api/v2/pokemon/${evolvedPokemonName}`,
                    responseType: `json`,
                    method: `GET`
                })

                setTimeout(imagePromises.push(evolvedPokemonImagePromise), 100);

                // When both Promises are fulfilled, set state for both pokemon two's images
                Promise.all(imagePromises).then((res) => {
                    this.setState({
                        pokemonTwoImg: res[0].data.sprites.front_default,
                        pokemonTwoEvolvedImg: res[1].data.sprites.front_default
                    })
                })
            }
        })
    }


    // ********** DECK OF CARD FUNCTIONS **********

    // Function to get a new deck of cards from the new card endpoint (with deck_id) 
    getDeckOfCards = () => {
        axios({
            url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
            responseType: 'json',
            method: 'GET',
        })
        .then ((res) => {
            // set state for deckId for easier re-usability 
            this.setState({
                deckId: res.data.deck_id
            })
            // Based on this deckId, call functions for getting pokemonOne and pokemonTwo's initial two cards
            setTimeout(this.getPokemonOneInitialCards(), 100);
            setTimeout(this.getPokemonTwoInitialCards(), 300);
        })
    }


    // Function for getting pokemonOne's first two cards from the draw card endpoint
    getPokemonOneInitialCards = () => {
        const deckId = this.state.deckId;
        axios({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
            responseType: 'json',
            method: 'GET',
        })
        .then ((response) => {
            const cards = response.data.cards;
            // First, create empty array called playerOneCards, which will then be filled with results from the API, and then be set to state for pokemonOneCards
            const playerOneCards = [];

            // Loop through the API array result with .forEach, and push the value, image, suit, and code to the empty playerOneCards array
            cards.forEach((card) => {
                playerOneCards.push({
                    value: card.value,
                    image: card.image,
                    suit: card.suit,
                    code: card.code
                })
            })

            // Set state so that the previously empty pokemonOneCards array in state is now set with the playerOneCards array, which holds the value, image, suit, and code 
            this.setState({
                pokemonOneCards: playerOneCards
            })
        })
    }


    // Function for getting pokemonTwo's first two cards from the draw card endpoint 
    getPokemonTwoInitialCards = () => {
        const deckId = this.state.deckId;
        axios({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
            responseType: 'json',
            method: 'GET',
        })
        .then ((response) => {
            const cards = response.data.cards;
            // First, create empty array called playerTwoCards, which will then be filled with results from the API, and then be set to state for pokemonTwoCards
            const playerTwoCards = [];

            // Loop through the API array result with .forEach, and push the value, image, suit, and code to the empty playerTwoCards array
            cards.forEach((card) => {
                playerTwoCards.push({
                    value: card.value,
                    image: card.image,
                    suit: card.suit,
                    code: card.code
                })
            })

            // Set state so that the previously empty pokemonTwoCards array in state is now set with the playerTwoCards array, which holds the value, image, suit, and code 
            this.setState({
                pokemonTwoCards: playerTwoCards
            })
        })
    }


    // Function for when Pokemon One clicks "Draw Card"
    drawCardPokemonOne = () => {
        const deckId = this.state.deckId;
        // Make a call to the draw cards endpoint, using the same deckId as before, and only for 1 card
        axios ({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
            method: `GET`,
            responseType: `json`
        })
        .then((res) => {
            // Store the 1 new card in a variable
            const newCard = res.data.cards[0]

            // Make a duplicate of the this.state.pokemonOneCards array, which currently has just the initial two cards in it
            const newCardsArray = [...this.state.pokemonOneCards];

            // Push the new card into the newCardsArray, and re-set state so that pokemonOneCards is now the newCardsArray (so there should be 3 cards in there now)
            newCardsArray.push(newCard);
            this.setState({
                pokemonOneCards: newCardsArray
            })
        })
    }

    // Function for when Pokemon Two clicks "Draw Card"
    drawCardPokemonTwo = () => {
        const deckId = this.state.deckId;
        // Make a call to the draw cards endpoint, using the same deckId as before, and only for 1 card
        axios ({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
            method: `GET`,
            responseType: `json`
        })
        .then((res) => {
            // Store the 1 new card in a variable
            const newCard = res.data.cards[0]

            // Make a duplicate of the this.state.pokemonTwoCards array, which currently has just the initial two cards in it
            const newCardsArray = [...this.state.pokemonTwoCards];

            // Push the new card into the newCardsArray, and re-set state so that pokemonTwoCards is now the newCardsArray (so there should be 3 cards in there now)
            newCardsArray.push(newCard);
            this.setState({
                pokemonTwoCards: newCardsArray
            })
        })
    }

    // Function for checking the value of Pokemon One's cards
    checkPokemonOneScore = () => {
        //Empty array which will be filled with the values of the cards in this.state.pokemonOneCards
        const cardValuesArray = [];
        
        const faceCards = ["QUEEN", "KING", "JACK"];

        // Need to loop through the cards, and change the values for the faceCards to be 10, the value of the Ace to be 11, and to change the values that are strings into numbers; push the values to cardValuesArray
        this.state.pokemonOneCards.forEach((card) => {
            if (faceCards.includes(card.value)) {
                cardValuesArray.push(10);
            } else if (card.value === "ACE") {
                cardValuesArray.push(11);
            } else {
                cardValuesArray.push(parseInt(card.value))
            }
        })

        // Get the total of the values of the array
        let pokemonOneTotal = cardValuesArray.reduce((a, b) => a + b, 0);

        // Check for if pokemonOne's total is greater than 21, and if there is an Ace in the hand; if yes, change the value of the Ace to 1
        while (pokemonOneTotal > 21 && cardValuesArray.includes(11)) {
            cardValuesArray[cardValuesArray.indexOf(11, 0)] = 1;
            pokemonOneTotal = cardValuesArray.reduce((a, b) => a + b, 0);
        }

        console.log('pokemonOneCardsValue', pokemonOneTotal);

        // Set state for pokemonOneCardsValue to be the total value of their cards
        this.setState({
            pokemonOneCardsValue: pokemonOneTotal
        })
    }

    // Function for checking the value of Pokemon Two's cards
    checkPokemonTwoScore = () => {
        //Empty array which will be filled with the values of the cards in this.state.pokemonTwoCards
        const cardValuesArray = [];
        
        const faceCards = ["QUEEN", "KING", "JACK"];

        // Need to loop through the cards, and change the values for the faceCards to be 10, the value of the Ace to be 11, and to change the values that are strings into numbers; push the values to cardValuesArray
        this.state.pokemonTwoCards.forEach((card) => {
            if (faceCards.includes(card.value)) {
                cardValuesArray.push(10);
            } else if (card.value === "ACE") {
                cardValuesArray.push(11);
            } else {
                cardValuesArray.push(parseInt(card.value))
            }
        })

        // Get the total of the values of the array
        let pokemonTwoTotal = cardValuesArray.reduce((a, b) => a + b, 0);

        // Check for if pokemonTwo's total is greater than 21, and if there is an Ace in the hand; if yes, change the value of the Ace to 1
        while (pokemonTwoTotal > 21 && cardValuesArray.includes(11)) {
            cardValuesArray[cardValuesArray.indexOf(11, 0)] = 1;
            pokemonTwoTotal = cardValuesArray.reduce((a, b) => a + b, 0);
        }

        console.log('pokemonTwoCardsValue', pokemonTwoTotal);

        // Set state for pokemonTwoCardsValue to be the total value of their cards
        this.setState({
            pokemonTwoCardsValue: pokemonTwoTotal
        })
    }


    // Function for when Pokemon One clicks "Stand" button
    standButtonPokemonOne = () => {
        // On click of the "Stand Button":
        // (1) call the checkPokemonOneScore function, so that we can update state for pokemonOneCardsValue, and store the total value of the cards there
        this.checkPokemonOneScore();

        // (2) Disable the "Draw" button for Pokemon One

        // (3) Enable the Draw/Stand buttons for Pokemon Two

        // (4) Toggle-off box-highlight for Pokemon One, and toggle-on box highlight for Pokemon Two
        
    }


    // Function for when Pokemon Two clicks "Stand" button
    standButtonPokemonTwo = () => {
        // On click of the "Stand Button":
        // (1) call the checkPokemonTwoScore function, so that we can update state for pokemonTwoCardsValue, and store the total value of the cards there
        this.checkPokemonTwoScore();

        // (2) Disable the "Draw" button for Pokemon Two
        

    
        // (3) Determine who is the winner between Pokemon One and Pokemon Two
        const playerOneScore = this.state.pokemonOneCardsValue;
        // console.log(playerOneScore);

        const playerTwoScore = this.state.pokemonTwoCardsValue;
        // console.log(playerTwoScore);

        if ( playerOneScore <= 21 && playerOneScore > playerTwoScore ) {
            this.setState({
                pokemonOneWins: true
            });
        } else if (playerTwoScore <= 21 && playerTwoScore > playerOneScore) {
            this.setState({
                pokemonTwoWins: true
            });
        } else if ( playerOneScore > 21 && playerTwoScore > 21) {
            this.setState({
                noWinners: true
            });
        } else if ( playerOneScore === playerTwoScore) {
            this.setState({
                noWinners: true
            });
        } else if ( playerOneScore <=21 && playerTwoScore >= 22 ) {
            this.setState({
                pokemonOneWins: true
            });
        } else if (playerTwoScore <=21 && playerOneScore >= 22) {
            this.setState({
                pokemonTwoWins: true
            });
        }
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
                                pokemonOneStandButton={ () => this.standButtonPokemonOne() }
                                pokemonTwoStandButton={ () => this.standButtonPokemonTwo() }
                            /> } />

                    <Route path="/Winner" 
                            render= { () => <Winner passState= {this.state} />} />
                        
                    

                </div>
            </Router>
        )
    }
}

export default App;
