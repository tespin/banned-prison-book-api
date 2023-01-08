import React from 'react';

import classes from './Snippet.module.css';

const Snippet = (props) => {
    return (
        <>
            <pre className={classes.snippet}>
                <code>
                    {`https://banned-prison-books-api.onrender.com/api/v1/books?${props.endpoint}${props.params ? `=${props.params}` : ''}`}
                </code>
            </pre>
        </>
    );
};

// ${`=`props.params : props.params ? ''}

export default Snippet;

