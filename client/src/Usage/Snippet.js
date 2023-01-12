import React from 'react';

import classes from './Snippet.module.css';

const Snippet = (props) => {
    return (
        <>
            <pre className={`${classes.snippet} ${props.snippetClass}`}>
                <code className={`${classes.content} ${props.reqClass}`}>
                    {props.children}
                </code>
            </pre>
        </>
    );
};

export default Snippet;

