import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <div className={classes.footer}>
                <p>Created by <a href="https://twitter.com/tristan_virtual">Tristan Espinoza</a>.</p>
                <p>If you have a comment or suggestion for the API, feel free to get in touch or open an issue on <a href="https://github.com/tespin/banned-prison-book-api">GitHub</a>.</p>
            </div>
        </>
    );
}

export default Footer;