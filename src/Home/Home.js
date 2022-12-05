import React from 'react';

import Card from '../UI/Card';
import classes from './Home.module.css';

const Home = (props) => {
    return (
        <Card className={classes.home}>
            Home
            API
            Account
        </Card>
    );
};

export default Home;