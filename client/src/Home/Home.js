import React, { useState, useEffect } from 'react';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card';
import classes from './Home.module.css';
import Usage from '../Usage/Usage';
import Footer from '../Footer/Footer';

const Home = (props) => {
    // const [data, setData] = useState('');

    // useEffect( () => {
    //     const fetchData = async () => {
    //         const res = await fetch('/api');
    //         const json = await res.json();
    //         // return json;
    //         setData(json.message);
    //     }

    //     fetchData()
    // })

    return (
        <Card className={classes.home}>
            <MainHeader />
            <main>
                <div className={classes.about}>
                    <p>Banned Prison Books API is a free JSON API for banned texts in prisons within the United States. The API uses a dataset published by The Marshall Project that collects <a href="https://www.themarshallproject.org/2022/12/21/prison-banned-books-list-find-your-state">lists of banned publications in various state prison systems.</a></p>
                    {/* <p>Intentions, goals, other context</p>
                    <p>{data ? data : 'Loading ...'}</p> */}
                </div>
                <Usage />
                <Footer />
            </main>
        </Card>
    );
};

export default Home;