import React from 'react'
import './styles.css';

const Winner = () => {
    return (
        <div className="specialTextContainer">
            <h1 className="specialText">Congratulations, you won!</h1>
            {/* changed "Play Again" from a Link to an anchor tag, because we need the app to refresh so that the battlescreen pokemon/cards refresh */}
            <a href="/">Play Again</a>
        </div>
    )
}

export default Winner;
