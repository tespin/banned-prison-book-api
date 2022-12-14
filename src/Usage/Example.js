import React from 'react';
import Snippet from './Snippet';
import classes from './Example.module.css';

const Example = (props) => {
    return (
        <>
            <div className={classes.example}>
                <h3 className={classes.heading}>{props.heading}</h3>
                <p className={classes.desc}>{props.desc}</p>
                <Snippet endpoint={props.endpoint} params={props.params}></Snippet>
            </div>
        </>
    );
}

export default Example;

{/* <h3>Title</h3>
                <p>Retrieve a banned book by its title.</p>
                <Snippet endpoint='title' params='the%wretched%of%the%earth'/> */}