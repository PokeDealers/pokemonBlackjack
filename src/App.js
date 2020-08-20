import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import axios from 'axios'
import BattleScreen from './BattleScreen';
import Home from './Home';
import Winner from './Winner';
import Footer from './Footer';
import './styles.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            deckId: "",
            deckOfCards: [],
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
            pokemonOneCardsValue: "",
            pokemonTwoCardsValue: "",
            pokemonOneWins: false,
            pokemonTwoWins: false,
            buttonDisabledOne: false,
            buttonDisabledTwo: true,
            // noWinners: false,
            // tieGame: false,
            // winnerDisabled: true,
        }
    }

    // ********** POKEMON FUNCTIONS **********

    // Function to get pokemon
    getPokemon = (playerNumber) => {
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
                this.getPokemon()
            } else {
            // if yes, save the pokemon name and evolved pokemon name into variables
                const pokemonName = res.data.chain.species.name;
                const evolvedPokemonName = evolutionApiArray[0].species.name;

                // set state for pokemon(Number)Name and pokemon(Number)EvolvedName
                this.setState({
                    [`pokemon${playerNumber}Name`]: pokemonName,
                    [`pokemon${playerNumber}EvolvedName`]: evolvedPokemonName
                }, () => {
                    this.getPokemonImages(playerNumber);
                })
            }
        })
    }

    // Function to get pokemon images
    getPokemonImages = (playerNumber) => {
        // Create empty array for Pokemon image promises 
        const imagePromises =[];

        const pokemonName = this.state[`pokemon${playerNumber}Name`];

        const evolvedPokemonName = this.state[`pokemon${playerNumber}EvolvedName`];

        // Axios promise for getting the image for pokemon
        const pokemonImagePromise = axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
            responseType: `json`,
            method: `GET`
        })

        setTimeout(imagePromises.push(pokemonImagePromise), 100);

        // Axios promise for getting the image for the evolved version of pokemon
        const evolvedPokemonImagePromise = axios({
            url: `https://pokeapi.co/api/v2/pokemon/${evolvedPokemonName}`,
            responseType: `json`,
            method: `GET`
        })

        setTimeout(imagePromises.push(evolvedPokemonImagePromise), 100);

        // When both Promises are fulfilled, set state for both pokemon images (regular and evolved)
        Promise.all(imagePromises).then((res) => {
            this.setState({
                [`pokemon${playerNumber}Img`]: res[0].data.sprites.front_default,
                [`pokemon${playerNumber}EvolvedImg`]: res[1].data.sprites.front_default
            })
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
            setTimeout(this.getInitialCards('One'), 100);
            setTimeout(this.getInitialCards('Two'), 300);
        })
    }

    // Function for getting first two cards from the draw card endpoint
    getInitialCards = (playerNumber) => {
        const deckId = this.state.deckId;
        axios({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`,
            responseType: 'json',
            method: 'GET',
        })
        .then ((response) => {
            const cards = response.data.cards;
            // First, create empty array called playerOneCards, which will then be filled with results from the API, and then be set to state for pokemonOneCards
            const playerCards = [];

            // Loop through the API array result with .forEach, and push the value, image, suit, and code to the empty playerOneCards array
            cards.forEach((card) => {
                playerCards.push({
                    value: card.value,
                    image: card.image,
                    suit: card.suit,
                    code: card.code
                })
            })

            // Set state so that the previously empty pokemonOneCards array in state is now set with the playerOneCards array, which holds the value, image, suit, and code 
            this.setState({
                [`pokemon${playerNumber}Cards`]: playerCards
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
            
            this.setState({
                pokemonOneCardsValue: pokemonOneTotal
            })
            if (pokemonOneTotal > 21) {
                this.setState({
                    buttonDisabledOne: true,
                    buttonDisabledTwo: false
                })
            }
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

            // Check for if pokemonOne's total is greater than 21, and if there is an Ace in the hand; if yes, change the value of the Ace to 1
            while (pokemonTwoTotal > 21 && cardValuesArray.includes(11)) {
                cardValuesArray[cardValuesArray.indexOf(11, 0)] = 1;
                pokemonTwoTotal = cardValuesArray.reduce((a, b) => a + b, 0);
            }
            
            this.setState({
                pokemonTwoCardsValue: pokemonTwoTotal
            })   

            if (pokemonTwoTotal > 21) {
                this.setState({
                    buttonDisabledTwo: true
                })
            }

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

        // Set state for pokemonTwoCardsValue to be the total value of their cards
        this.setState({
            pokemonTwoCardsValue: pokemonTwoTotal
        }, () => {
            this.standButtonPokemonTwo();
        })
    }


    // Function for when Pokemon One clicks "Stand" button
    standButtonPokemonOne = () => {
        // On click of the "Stand Button":
        // (1) call the checkPokemonOneScore function, so that we can update state for pokemonOneCardsValue, and store the total value of the cards there
        this.checkPokemonOneScore();
        
        // When the stand button is clicked, disable button functionality for player 1 and enable button functionality for player 2
        this.setState({
            buttonDisabledOne: true,
            buttonDisabledTwo: false
        })

        document.querySelector('.dynamicP').innerHTML = "Player Two's turn!";
    }

    // Function for when Pokemon Two clicks "Stand" button
    standButtonPokemonTwo = () => {
        const playerOneScore = this.state.pokemonOneCardsValue;
        const playerTwoScore = this.state.pokemonTwoCardsValue;

        if (playerOneScore > playerTwoScore) {
            if (playerOneScore <= 21) {
                document.querySelector('.dynamicP').innerHTML = "Player One Wins!";
                document.querySelector('.winnerEvolution').classList.toggle('visible');
                this.setState({
                    pokemonOneWins: true,
                });
            } else if (playerOneScore > 21) {
                document.querySelector('.dynamicP').innerHTML = "Player Two Wins!";
                document.querySelector('.winnerEvolution').classList.toggle('visible');
                this.setState({
                    pokemonTwoWins: true,
                });
            }
        } else if (playerTwoScore > playerOneScore) {
            if (playerTwoScore <= 21) {
                document.querySelector('.dynamicP').innerHTML = "Player Two Wins!";
                document.querySelector('.winnerEvolution').classList.toggle('visible');
                this.setState({
                    pokemonTwoWins: true,
                });
            } else if (playerTwoScore > 21) {
                document.querySelector('.dynamicP').innerHTML = "Player One Wins!";
                document.querySelector('.winnerEvolution').classList.toggle('visible');
                this.setState({
                    pokemonOneWins: true,
                });
            }
        } else if (playerOneScore === playerTwoScore) {
            if ( playerOneScore > 21 && playerTwoScore > 21) {
                document.querySelector('.dynamicP').innerHTML = "You both bust - no winners!";
                document.querySelector('.playAgain').classList.toggle('visible');
                this.setState({
                    // noWinners: true,
                    // winnerDisabled: true
                });
            } else if (playerOneScore <= 21 && playerTwoScore <= 21) {
                document.querySelector('.dynamicP').innerHTML = "Tie game - no winners!";
                document.querySelector('.playAgain').classList.toggle('visible');
                this.setState({
                    // tieGame: true,
                    // winnerDisabled: true
                });
            }
        } 
    }

    componentDidMount = () => {
        this.getPokemon('One');
        this.getPokemon('Two');
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
                                pokemonTwoCheckScoreButton={ () => this.checkPokemonTwoScore() }
                            /> } />

                    <Route 
                        path="/Winner" 
                        render= { () => <Winner passState= {this.state} />} 
                    />
                        
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;