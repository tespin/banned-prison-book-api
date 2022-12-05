import React from 'react';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card';
import classes from './Home.module.css';

const Home = (props) => {
    return (
        <Card className={classes.home}>
            <MainHeader />
        </Card>
    );
};

export default Home;