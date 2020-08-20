import React from 'react'
import './styles.css';
import { Link } from 'react-router-dom';


const Winner = (props) => {

    return (
        <div className="wrapper specialTextContainer windowC">
            <h1 className="specialText">Congratulations!</h1>
            <div className="winnerContainer">
                {
                    props.passState.pokemonOneWins === true 
                    ? <h2>Congratulations Player One, you've won!</h2>
                    : <h2>Congratulations Player Two, you've won!</h2>
                }
                {
                    props.passState.pokemonOneWins === true 
                    ? <h2><span>{props.passState.pokemonOneName}</span> has evolved into <span>{props.passState.pokemonOneEvolvedName}</span>!</h2>
                    : <h2><span>{props.passState.pokemonTwoName}</span> has evolved into <span>{props.passState.pokemonTwoEvolvedName}</span>!</h2>
                }
                <div className="winnerImageContainer">
                    {
                        props.passState.pokemonOneWins === true 
                        ? <img src={props.passState.pokemonOneEvolvedImg} alt=""/>
                        : <img src={props.passState.pokemonTwoEvolvedImg} alt=""/>
                    }
                </div>
                <Link to="/" className="buttonStyle">Play Again</Link>
            </div>
        </div>
    )
}

export default Winner;
