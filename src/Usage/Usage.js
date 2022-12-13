import React from 'react';
import Example from './Example';
import classes from './Usage.module.css';

const Usage = (props) => {
    return (
        <>
            <h2 className={classes.usage}>Usage</h2>
            <Example heading='Title' desc='Retrieve a banned book by its title.' endpoint='title' params='the%wretched%of%the%earth'/>
            <Example heading='Author' desc='Retrieve all banned books by a specific author.' endpoint='author' params='frantz%fanon'/>
            <Example heading='ISBN' desc='Retrieve a banned book by its ISBN.' endpoint='isbn' params='080214323'/>
            <Example heading='State' desc='Retrieve all banned book in a specific state.' endpoint='state' params='california'/>
            <Example heading='Genre' desc='Retrieve all banned books in a specific genre.' endpoint='genre' params='lgbtq'/>
            <Example heading='Random' desc='Retrieve a random banned book.' endpoint='random' params=''/>
            <Example heading='Multiple Results' desc='Retrieve a random banned book.' endpoint='random' params='results=10'/>
            <Example heading='All' desc='Retrieve all banned books, in random order.' endpoint='all' params=''/>
        </>
    );
};

export default Usage;