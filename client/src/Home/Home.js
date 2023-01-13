import React from 'react';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card';
import classes from './Home.module.css';
import Usage from '../Usage/Usage';
import Footer from '../Footer/Footer';

const Home = (props) => {
    return (
        <Card className={classes.home}>
            <MainHeader />
            <main>
                <div className={classes.about}>
                    <p>Banned Prison Books API is a free JSON API for banned texts in prisons within the United States. The API uses a dataset published by The Marshall Project that collects lists of banned publications in various prison systems throughout the United States. <a href="https://www.themarshallproject.org/2022/12/21/prison-banned-books-list-find-your-state">Find out which books are banned in your state's prisons.</a></p>
                </div>
                <Usage onLoadExample={props.onLoadExample} data={props.data}  />
            </main>
            <Footer />
        </Card>
    );
};

export default Home;