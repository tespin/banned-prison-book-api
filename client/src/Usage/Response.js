import React from 'react';

const Response = (props) => {
    return (
        <>
        {props.response.status === 200 
        ? (`data: {
        _id: "${props.response.data.data._id}"
        publication: "${props.response.data.data.publication}"
        author: "${props.response.data.data.author}"
        date: "${props.response.data.data.date}"
        year: "${props.response.data.data.year}"
        month: "${props.response.data.data.month}"
        day: "${props.response.data.data.day}"
        reason: "${props.response.data.data.reason}"
        state_arc: "${props.response.data.data.state_arc}"
}`) 
        : (`data: { 
        error: ${props.response.data.data.error}
}`)
        }
        </>
    )
}

export default Response;