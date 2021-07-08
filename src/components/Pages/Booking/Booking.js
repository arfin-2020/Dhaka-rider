import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { Link } from 'react-router-dom';
import './Booking.css';



export default function Booking({vahicle}) {
   
    return (
        <div className = "col-lg-3 col-md-6 mb-5 vahicle-container">
         <Link style={{textDecoration:"none"}} to={`/booked/${vahicle.id}`}>
            <Card className="">
                    <img src={vahicle.img} alt="" height="150px"/>
                    <CardHeader
                        title={vahicle.type}
                    />
            </Card>
        </Link>
        </div>
    );
};

