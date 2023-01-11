import React, {useState} from 'react';
import classes from './JsonExample.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Snippet from './Snippet';

const JsonExample = (props) => {    
    // const [response, setResponse] = useState();

    // const responseHandler = () => {
    //     if (props.data) {
    //         setResponse(props.data);
    //     }
    // }

    // responseHandler();
    
    /*

    if (there is a props response) 
        if (props response status is OK)
            render status and response
        else
            render status
    else
        render loading

    ( if no data has been fetched
        ? render loading
        : if status of fetched data is ok
        ? render status and response
        : render response
    )

    */

    return (
        <>
            <div className={classes.jsonExample}>
                {/* {props.data.map( data => <p>data.publication</p>)} */}
                {/* <p>{props.data.data || "Loading ..."}</p> */}
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
                    <Button className={classes.loadButton} onClick={props.onLoadExample}>Get a random banned book.</Button>
                </Card>
            </div>
        </>
    );
}

export default JsonExample;