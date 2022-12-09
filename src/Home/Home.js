import React from 'react';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card';
import classes from './Home.module.css';
import Snippet from '../Usage/Snippet';

const Home = (props) => {
    return (
        <Card className={classes.home}>
            <MainHeader />
            <main>
                <p>Banned Book API is a free JSON API for banned texts in the United States. The API uses PEN America’s Index of School Book Bans which collects “cases of book bans reported directly to PEN America and/or covered in the media” from June 2021 to July 2022.</p>
                <p>Intentions, goals, other context</p>
                <h2>Usage</h2>
                <h3>Title</h3>
                <p>Retrieve a banned book by its title.</p>
                <Snippet endpoint='title' params='the%wretched%of%the%earth'/>
            </main>
        </Card>
    );
};

export default Home;