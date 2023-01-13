import React from 'react';
import classes from './JsonExample.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Snippet from './Snippet';

const JsonExample = (props) => {    
    return (
        <>
            <div className={classes.jsonExample}>
                <p className={classes.desc}>Example JSON response:</p>
                { !props.response
                ? <div className={classes.loader}></div>
                : props.response.status === 'OK'
                ? <Snippet snippetClass={props.snippetClass} reqClass={props.reqClass}>
                    { `status: "${props.response.status}"
data: {
    _id: "${props.response.data._id}"
    publication: "${props.response.data.publication}"
    author: "${props.response.data.author}"
    date: "${props.response.data.date}"
    year: "${props.response.data.year}"
    month: "${props.response.data.month}"
    day: "${props.response.data.day}"
    reason: "${props.response.data.reason}"
    state_arc: "${props.response.data.state_arc}"
}`}
                </Snippet>
                : <Snippet snippetClass={props.snippetClass} reqClass={props.reqClass}>
                    {`status: "${props.response.status}`}
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