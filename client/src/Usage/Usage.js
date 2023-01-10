import React from 'react';
import Example from './Example';
import classes from './Usage.module.css';

const Usage = (props) => {
    return (
        <>
            <div className={classes.usage}>
                <h2>Usage</h2>
                <Example heading='Random' desc='Retrieve a random banned book.' endpoint='random' reqClass={classes.get} params=''/>
                <Example heading='Publication' desc='Retrieve a banned book by its title.' endpoint='publication' reqClass={classes.get} params='blood%20in%20my%20eye'/>
                <Example heading='Author' desc='Retrieve banned books by a specified author.' endpoint='author' reqClass={classes.get} params='george%20jackson'/>
                <Example heading='Year' desc='Retrieve books banned in a specific year.' endpoint='year' reqClass={classes.get} params='2013'/>
                <Example heading='Reason' desc='Retrieve banned books according to the reason they were banned.' endpoint='reason' reqClass={classes.get} params='security'/>
                <Example heading='State' desc='Retrieve all banned books in a specific state.' endpoint='state_arc' reqClass={classes.get} params='wi'/>
                <Example heading='Length' desc='Retrieve a specified number of banned books. Can be combined with other queries.' endpoint='length' reqClass={classes.get} params='5'/>
                {/* <Example heading='ISBN' desc='Retrieve a banned book by its ISBN.' endpoint='isbn' params='080214323'/>
                <Example heading='Genre' desc='Retrieve all banned books in a specific genre.' endpoint='genre' params='lgbtq'/>
                <Example heading='Random' desc='Retrieve a random banned book.' endpoint='random' params=''/>
                <Example heading='Multiple Results' desc='Retrieve a random banned book.' endpoint='random' params='results=10'/>
                <Example heading='All' desc='Retrieve all banned books, in random order.' endpoint='all' params=''/> */}
            </div>
        </>
    );
};

export default Usage;