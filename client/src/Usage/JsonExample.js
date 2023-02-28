import React from 'react';
import classes from './JsonExample.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Snippet from './Snippet';
import Response from './Response';

const JsonExample = (props) => {    
    return (
        <>
            <div className={classes.jsonExample}>
                <p className={classes.desc}>Example JSON response:</p>
                { !props.response
                ? <div className={classes.loader}></div>
                : <Snippet snippetClass={props.snippetClass} reqClass={props.reqClass}>
                    <Response response={props.response}></Response>
                </Snippet>
                }
                <Card>
                    {props.response 
                        ? <Button className={classes.loadButton} onClick={props.onLoadExample} disabled={false}>Get a random banned book.</Button>
                        : <Button className={classes.loadButton} onClick={props.onLoadExample} disabled={true}>Get a random banned book.</Button>
                    }
                </Card>
            </div>
        </>
    );
}

export default JsonExample;