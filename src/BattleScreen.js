import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const BattleScreen = (props) => {
        return (
            <div className="wrapper windowB">
                <h1>Let the battle begin!</h1>
                <div className="notificationsContainer">
                    <Link to="/" className="hidden playAgain">Play Again</Link>
                    <p className="dynamicP">Player One goes first!</p>
                    <Link to="/Winner" className="hidden winnerEvolution">Winner Evolution</Link>
                        {/* {
                        props.passPokemonInfo.tieGame === true 
                        ? <div>
                            <h2>It's a tie game!</h2>
                            <Link to="/" className="buttonStyle">Play Again</Link>
                        </div>
                        : <p></p>
                        } */}
                    {
                    props.passPokemonInfo.pokemonOneCardsValue > 21 && props.passPokemonInfo.pokemonTwoCardsValue > 21
                    ? <div>
                        {document.querySelector('.dynamicP').innerHTML = "Both are bust! No Winners!"}
                        {document.querySelector('.playAgain').classList.toggle('visible')}
                    </div>
                    : <p></p>
                    }
                    {/* <Link to="/Winner" className={ props.passPokemonInfo.winnerDisabled ? "hidden" : "visible"}>Winner Evolution</Link> */}
                        {/* <Link to="/" className="hidden playAgain">Play Again</Link>
                        <Link to="/Winner" className="hidden winnerEvolution">Winner Evolution</Link> */}
                </div>
                <div className="gameContainer">
                    <div className="gameDetails pokemonOneContainer">
                        <div className="pokemonDetails">
                            <div>
                                <p>Player One</p>
                                <p>{props.passPokemonInfo.pokemonOneName}</p>
                            </div>
                            <div className="pokemonImgContainer">
                                <img src={props.passPokemonInfo.pokemonOneImg} alt=""/>
                            </div>
                        </div>
                        
                        <p>{props.passPokemonInfo.pokemonOneCardsValue}</p>
                        {
                                props.passPokemonInfo.pokemonOneCardsValue > 21 
                                ? <p>Bust!</p>
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
                    <div className="gameDetails pokemonTwoContainer">
                        <div className="pokemonDetails"> 
                            <div>
                                <p>Player Two</p>
                                <p>{props.passPokemonInfo.pokemonTwoName}</p>
                            </div>
                            <div className="pokemonImgContainer">
                                <img src={props.passPokemonInfo.pokemonTwoImg} alt=""/>
                            </div>
                        </div>
                        <p>{props.passPokemonInfo.pokemonTwoCardsValue}</p>
                            {
                                props.passPokemonInfo.pokemonTwoCardsValue > 21 
                                ? <p>Bust!</p>
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
            </div>
        )
}


export default BattleScreen; 