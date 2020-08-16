import React from 'react'
import { Link } from 'react-router-dom';

const Winner = () => {
    return (
        <div>
            <p>THIS IS THE WINNER SCREEN!</p>
            <Link to="/"><button className="buttonStyle">GO HOME</button></Link>
        </div>
    )
}

export default Winner;
