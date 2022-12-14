import React, { useState, useEffect } from 'react';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card';
import classes from './Home.module.css';
import Usage from '../Usage/Usage';

const Home = (props) => {
    const [data, setData] = useState('');

    useEffect( () => {
        const fetchData = async () => {
            const res = await fetch('/api');
            const json = await res.json();
            // return json;
            setData(json.message);
        }

        fetchData()
    })

    return (
        <Card className={classes.home}>
            <MainHeader />
            <main>
                <div className={classes.about}>
                    <p>Banned Book API is a free JSON API for banned texts in the United States. The API uses PEN America’s Index of School Book Bans which collects “cases of book bans reported directly to PEN America and/or covered in the media” from June 2021 to July 2022.</p>
                    {/* <p>Intentions, goals, other context</p> */}
                    <p>{data ? data : 'Loading ...'}</p>
                </div>
                <Usage />
            </main>
        </Card>
    );
};

export default Home;