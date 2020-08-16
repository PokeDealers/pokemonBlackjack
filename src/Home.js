import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
        return (
            <div>
                <header>
                    <div className="headerTextContainer">
                    <h1 className="headerText">PokeDealers presents Pokemon BlackJack</h1>
                    </div>
                    
                </header>
                <section className="instructionSection">
                    <p>These will be blackjack instructions. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio animi earum cupiditate magni dolor ea dolore officiis aliquam temporibus blanditiis, aut explicabo. Repellat eveniet eius enim consequuntur nobis esse molestias odio voluptatem, maiores dolorum id suscipit in doloremque dicta illum consectetur facilis! Suscipit, ducimus quasi culpa commodi corporis saepe totam.</p>
                </section>
            
                <Link to="/BattleScreen"><button className="buttonStyle">Start Game</button></Link>
                
            </div>
        )
    }


export default Home;
