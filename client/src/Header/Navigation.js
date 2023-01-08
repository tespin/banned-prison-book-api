import React from 'react';
import Card from '../UI/Card';
import classes from './Navigation.module.css';

const Navigation = (props) => {
    return (
        <nav className={classes.nav}>
            <h1>📚🚫 Banned Prison Books API</h1>
            {/* <ul className={classes.links}>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>API</a></li>
                <li><a href='#'>Sign in</a></li>
            </ul> */}
        </nav>
    );
};

export default Navigation;
