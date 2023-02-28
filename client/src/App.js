import React, { useState, useEffect } from 'react';
import Home from './Home/Home';
import Card from './UI/Card';

const App = () => {
    const [data, setData] = useState();

    const exampleHandler = async () => {
        setData();
        const res = await fetch('/api/v1/books/random');
        const json = await res.json();
        setData({status: res.status, data: json});
        // setData({status: 500, data: {data: {error: "error message"}}});
    }

    useEffect( () => {
        exampleHandler();
    }, []);

    return (
        <Card>
                <Home onLoadExample={exampleHandler} response={data}></Home>
        </Card>
    )
}

export default App;