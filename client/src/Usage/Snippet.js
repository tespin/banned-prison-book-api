import React from 'react';

import classes from './Snippet.module.css';

const Snippet = (props) => {
    return (
        <>
            <pre className={`${classes.snippet} ${props.snippetClass}`}>
                <code className={`${classes.content} ${props.reqClass}`}>
                    {props.children}
                    {/* {`https://banned-books-api.onrender.com/api/books?${props.endpoint}${props.params ? `=${props.params}` : ''}`} */}
                    {/* {`https://banned-books-api.onrender.com/api/books${props.endpoint == 'random' ? `/${props.endpoint}` : `?${props.endpoint}` }${props.params ? `=${props.params}` : ''}`} */}
                </code>
            </pre>
        </>
    );
};

export default Snippet;

