import React from 'react';
import Snippet from './Snippet';
import classes from './Example.module.css';

const Example = (props) => {
    return (
        <>
            <div className={classes.example}>
                <h3 className={classes.heading}>{props.heading}</h3>
                <p className={classes.desc}>{props.desc}</p>
                <Snippet snippetClass={props.snippetClass} reqClass={props.reqClass}>
                    {`https://banned-books-api.onrender.com/api/books${props.endpoint == 'random' ? `/${props.endpoint}` : `?${props.endpoint}` }${props.params ? `=${props.params}` : ''}`}
                </Snippet>
            </div>
        </>
    );
}

export default Example;