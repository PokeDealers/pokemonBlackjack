import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
        return (
            <div className="wrapper">
                <header>
                    <div className="headerTextContainer">
                    <h1 className="headerText">PokeDealers presents Pokemon BlackJack</h1>
                    </div>
                    
                </header>
                <section className="instructionSection">
                    <ul>
                        <li>Each Pokemon will start with two cards.</li>
                        <li>You can choose to stand or draw another card.</li>
                        <li>The goal of the game is to get the total value of your cards as close to 21, without going over!</li>
                        <li>If your cards total over 21, you lose!</li>
                    </ul>
                </section>

                
                <Link to="/BattleScreen">
                    <button className="buttonStyle">Start Game</button></Link>
                    <img src="./assets/pokeball.png" alt=""/>
            </div>
        )
    }


export default Home;
