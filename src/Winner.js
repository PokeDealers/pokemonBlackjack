import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';

const Winner = () => {
    return (
        <div className="specialTextContainer">
            <h1 className="specialText">Congratulations, you won!</h1>
            <Link to="/"><button className="buttonStyle">GO HOME</button></Link>
        </div>
    )
}

export default Winner;
