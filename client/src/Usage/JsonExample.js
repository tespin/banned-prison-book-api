import React from 'react';
import Snippet from './Snippet';
import classes from './JsonExample.module.css';
import Button from '../UI/Button';

const JsonExample = (props) => {    
    return (
        <>
            <div className={classes.jsonExample}>
                <p>{props.data.publication}</p>
                {/* {props.data.map( data => <p>data.publication</p>)} */}
                {/* <p>{props.data.data || "Loading ..."}</p> */}
                {/* <p className={classes.desc}>Example JSON response:</p>
                <Snippet snippetClass={props.snippetClass} reqClass={props.reqClass}>
                    {`status: ${props.data.status || "OK"}
data: {
    _id: ""
    publication: ""
    author: ""
    date: ""
    year: ""
    month: ""
    day: ""
    reason: ""
    state_arc: ""
}
`
                    }
                </Snippet> */}
                <Button onClick={props.onLoadExample}>Load a new example.</Button>
            </div>
        </>
    );
}

export default JsonExample;