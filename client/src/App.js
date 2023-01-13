import React, { useState, useEffect } from 'react';
import Home from './Home/Home';
import Card from './UI/Card';

const App = () => {
    const [data, setData] = useState();

    const exampleHandler = async () => {
        setData();
        const res = await fetch('/api/v1/books/random');
        const json = await res.json();
        setData(json);
    }

    useEffect( () => {
        exampleHandler();
    }, []);

    return (
        <Card>
                <Home onLoadExample={exampleHandler} data={data}></Home>
        </Card>
    )
}

export default App;