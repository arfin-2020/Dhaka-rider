import React from 'react';
import Bike from '../../images/Bike.png';
import Bus from '../../images/Bus.png';
import Car from '../../images/car.png';
import TRAIN from '../../images/Train.png';
import Navbar from '../../Navbar/Navbar';
import Booking from '../Booking/Booking';
import './Home.css';
const Home = () => {
    const vahicles = [
        {
            id: "1",
            type: "BIKE",
            img: Bike
        },
        {
            id: "2",
            type: "Car",
            img: Car
        },
        {
            id: "3",
            type: "BUS",
            img: Bus
        },
        {
            id: "4",
            type: "TRAIN",
            img: TRAIN
        }
    ]
    return (
        
            <div className="container header justify-content-center align-items-center ">
            <Navbar/>
                <div className = 'row'>
                        {
                            vahicles.map(vahicle=><Booking key={vahicle.id} vahicle={vahicle}/>)
                        }
                </div>
    
            </div>
    );
};

export default Home;