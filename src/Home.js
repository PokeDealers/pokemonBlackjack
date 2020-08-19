import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
        return (
            <div className="wrapper">
                <header>
                    <div className="headerTextContainer">
                    <h1 className="headerText">PokeDealers presents Pokemon Blackjack</h1>
                    </div>
                    
                </header>
                <section className="instructionSection">
                    <ul>
                        <li>The goal of pokemon blackjack is to beat your opponent's hand without going over 21.</li>
                        <li>Whoever is closest to 21 with going over is the winner. Going over 21 will result in busting. (which is a loss)</li>
                        <li>You can choose to stand or hit(to draw another card).</li>
                        <li>Face cards are worth 10</li>
                        <li>Ace can be worth 11 or 1 depending on if your cards exceed 21, if they do, ace will become worth 1.</li>
                        <li>If you win, you may get a chance to see something special!</li>
                    </ul>
                </section>

                <Link to="/BattleScreen">
                    <button className="buttonStyle">Start Game</button></Link>
               
            </div>
        )
    }


export default Home;
