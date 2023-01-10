import React from 'react';
import Snippet from './Snippet';
import classes from './Example.module.css';

const Example = (props) => {
    return (
        <>
            <div className={classes.example}>
                <h3 className={classes.heading}>{props.heading}</h3>
                <p className={classes.desc}>{props.desc}</p>
                <Snippet endpoint={props.endpoint} reqClass={props.reqClass} params={props.params}></Snippet>
            </div>
        </>
    );
}

export default Example;