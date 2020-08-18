import React from 'react'
import './styles.css';

const Winner = (props) => {
    // console.log('props in Winners', props);

    // if (props.passState.pokemonOneWins === true) {
         
    //     const pokemonOneWinner = <img src={props.passState.pokemonOneEvolvedImg} alt=""/>
        
    // } else if (props.passState.pokemonTwoWins === true) {
         
    //     const pokemonTwoWinner = <img src={props.passState.pokemonTwoEvolvedImg} alt=""/>
        
    // }



    return (
        <div className="specialTextContainer">
            <h1 className="specialText">Congratulations, you won!</h1>
            {/* changed "Play Again" from a Link to an anchor tag, because we need the app to refresh so that the battlescreen pokemon/cards refresh */}
            {
                props.passState.pokemonOneWins === true 
                ? <img src={props.passState.pokemonOneEvolvedImg} alt=""/>
                : <img src={props.passState.pokemonTwoEvolvedImg} alt=""/>
            }

            {
                props.passState.pokemonOneWins === true 
                ? <h2>Congratulations, you've won! Your Pokemon has evolved into {props.passState.pokemonOneEvolvedName}!</h2>
                : <h2>Congratulations, you've won! Your Pokemon has evolved into {props.passState.pokemonTwoEvolvedName}!</h2>
            }

            <a href="/">Play Again</a>
        </div>
    )
}

export default Winner;
