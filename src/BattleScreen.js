import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './styles.css';

//BattleScreen.js
// Low - i icon appears to remind player of the rules
// High - The two pokemon battling are displayed as well as the cards
// High - Accept the props: 
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

const BattleScreen = (props) => {
        return (
            <div>
                <div>
                    <h1>THIS IS THE BATTLESCREEN!</h1>

                    
                    {/* <h2>It's {props.name}</h2>
                    <img src={props.sprites.front_default} alt={ props.name }/> */}
                </div>
                <Link to="/Winner"><button className="buttonStyle">Show me the winner!</button></Link>
            </div>
        )
}






export default BattleScreen;
