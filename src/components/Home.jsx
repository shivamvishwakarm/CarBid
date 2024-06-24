import React from 'react';
import BuyDashBoard from './BuySearch';
import HowToBuy from './HowToBuy';
import WhyPeopleChooseUs from './WhyPeopleChooseUs';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div >
                <BuyDashBoard />
                <HowToBuy />
                <WhyPeopleChooseUs />
            </div>
        </div>
    );
};

export default Home;
