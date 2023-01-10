import React from 'react';

import classes from './Snippet.module.css';

const Snippet = (props) => {
    return (
        <>
            <pre className={classes.snippet}>
                <code className={props.reqClass}>
                    {`https://banned-books-api.onrender.com/api/books?${props.endpoint}${props.params ? `=${props.params}` : ''}`}
                    {/* {`https://banned-books-api.onrender.com/api/books${props.endpoint == 'random' ? `/${props.endpoint}` : `?${props.endpoint}` }${props.params ? `=${props.params}` : ''}`} */}
                </code>
            </pre>
        </>
    );
};

// ${`=`props.params : props.params ? ''}

export default Snippet;

