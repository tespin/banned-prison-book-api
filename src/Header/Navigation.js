import React from 'react';
import Card from '../UI/Card';
import classes from './Navigation.module.css';

const Navigation = (props) => {
    return (
        <nav className={classes.nav}>
            {/* <a href="https://freecodecamp.org" className="logo">
                <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="freeCodeCamp logo"></img>
            </a> */}
            <ul className={classes.links}>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>API</a></li>
                <li><a href='#'>Sign in</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;
