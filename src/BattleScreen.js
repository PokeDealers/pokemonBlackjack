import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const BattleScreen = (props) => {

        return (
            <div className="wrapper windowB">
                <h1>Let the battle begin!</h1>
                <div className="gameContainer">
                    <div className="pokemonOneContainer"> 
                        <div className="gameDetails">
                            <p>Player One</p>
                            <p>{props.passPokemonInfo.pokemonOneName}</p>
                            <p>{props.passPokemonInfo.pokemonOneCardsValue}</p>
                            {
                                    props.passPokemonInfo.pokemonOneCardsValue > 21 
                                    ? <p>You've busted!</p>
                                    : <p></p>
                            }
                            <div className="pokemonCards">
                            {
                                props.passPokemonInfo.pokemonOneCards.map( (card) => {
                                    return (
                                        <div key={card.code}>
                                            <img src={card.image} alt="" className="card"/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <button disabled={props.passPokemonInfo.buttonDisabledOne}  className="drawCard" onClick={ props.pokemonOneDrawCard }>Draw Card</button>
                            <button disabled={props.passPokemonInfo.buttonDisabledOne} className="stand" onClick={ props.pokemonOneStandButton }>Stand</button>
                        </div>
                        <div className="pokemonImgContainer">
                            <img src={props.passPokemonInfo.pokemonOneImg} alt=""/>
                        </div>
                    </div>
                    <div className="pokemonTwoContainer">
                        <div className="pokemonImgContainer">
                            <img src={props.passPokemonInfo.pokemonTwoImg} alt=""/>
                        </div>
                        <div className="gameDetails">
                            <p>Player Two</p>
                            <p>{props.passPokemonInfo.pokemonTwoName}</p>
                            <p>{props.passPokemonInfo.pokemonTwoCardsValue}</p>
                            
                                {
                                    props.passPokemonInfo.pokemonTwoCardsValue > 21 
                                    ? <p>You've busted!</p>
                                    : <p></p>
                                }
                            
                            <div className="pokemonCards">
                            {
                                props.passPokemonInfo.pokemonTwoCards.map( (card) => {
                                    return (
                                        <div key={card.code}>
                                            <img src={card.image} alt="" className="card"/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <button disabled={props.passPokemonInfo.buttonDisabledTwo} className="drawCard" onClick={ props.pokemonTwoDrawCard }>Draw Card</button>
                            <button disabled={props.passPokemonInfo.buttonDisabledTwo} className="stand" onClick={ props.pokemonTwoCheckScoreButton }>Stand</button>
                        </div>
                    </div>
                    <div className="notificationsContainer">
                        {
                        props.passPokemonInfo.tieGame === true 
                        ? <div><h2>It's a tie game!</h2><a href="/" className="buttonStyle">Play Again</a></div>
                        : <h2></h2>
                        }
                        {
                        props.passPokemonInfo.pokemonOneCardsValue > 21 && props.passPokemonInfo.pokemonTwoCardsValue > 21
                        ? <a href="/">Both players are bust! Click here to play again.</a>
                        : <h2></h2>
                        }
                    </div>
                    <Link to="/Winner" className={ props.passPokemonInfo.winnerDisabled ? "hidden" : "visible"}><button className="buttonStyle">Winner Evolution</button></Link>
                </div>
            </div>
        )
}


export default BattleScreen; 
