import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const BattleScreen = (props) => {
        console.log("props in BattleScreen", props);

        return (
            <div className="wrapper windowB">
                <h1>Let the battle begin!</h1>
                <div className="notificationsContainer">
                    <p>Player One goes first!</p>
                    <Link to="/Winner"><button className="buttonStyle">Winner Evolution</button></Link>
                </div>
                <div className="gameContainer">
                    <div className="pokemonOneContainer"> 
                        <div className="gameDetails">
                            <p>Player One</p>
                            <p>{props.passPokemonInfo.pokemonOneName}</p>
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
                            <button className="drawCard" onClick={ props.pokemonOneDrawCard }>Draw Card</button>
                            <button className="stand" onClick={ props.pokemonOneStandButton }>Stand</button>
                        </div>
                        <div className="pokemonImgContainer">
                            <img src={props.passPokemonInfo.pokemonOneImg} alt=""/>
                        </div>
                        <button disabled={props.passPokemonInfo.buttonDisabledOne} className="drawCard" onClick={ props.pokemonOneDrawCard }>Draw Card</button>
                        <button disabled={props.passPokemonInfo.buttonDisabledOne} className="stand" onClick={ props.pokemonOneStandButton }>Stand</button>
                    </div>
                    <div className="pokemonTwoContainer">
                        <div className="pokemonImgContainer">
                            <img src={props.passPokemonInfo.pokemonTwoImg} alt=""/>
                        </div>
                        <div className="gameDetails">
                            <p>Player Two</p>
                            <p>{props.passPokemonInfo.pokemonTwoName}</p>
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
                            <button className="drawCard" onClick={ props.pokemonTwoDrawCard }>Draw Card</button>
                            <button className="stand" onClick={ props.pokemonTwoStandButton }>Stand</button>
                        </div>
                        <button disabled={props.passPokemonInfo.buttonDisabledTwo} className="drawCard" onClick={ props.pokemonTwoDrawCard }>Draw Card</button>
                        <button disabled={props.passPokemonInfo.buttonDisabledTwo} className="stand" onClick={ props.pokemonTwoStandButton }>Stand</button>
                    </div>
                </div>
            </div>
        )
}


export default BattleScreen; 
