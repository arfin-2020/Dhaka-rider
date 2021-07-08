import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import Bike from '../../components/images/Bike.png';
import Bus from '../../components/images/Bus.png';
import Car from '../../components/images/car.png';
import TRAIN from '../../components/images/Train.png';
import map from '../images/map.png';
import './Search.css';



const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


const Search = () => {
    const { id } = useParams()
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
    const [search, setSearch] = useState(false);
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    const matchingData = vahicles.filter(dt => dt.id === id);
    const classes = useStyles();
    const [fieldData, setFieldData] = useState({})
    const handleBlur = (event) => {
        const newInput = { ...fieldData };
        newInput[event.target.name] = event.target.value;
        setFieldData(newInput);
    }
    return (
        <div>
            <div className="navbar">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">
                        <Link class="navbar-brand marginLeft" to="/">Dhaka Rider</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end marginRight" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item navbar-margin">
                                    <Link class="nav-link active" to="/">Home</Link>
                                </li>
                                <li class="nav-item navbar-margin">
                                    <Link class="nav-link active" to="/search">Destination</Link>
                                </li>
                                <li class="nav-item navbar-margin">
                                    <Link class="nav-link active " to="/">Blog</Link>
                                </li>
                                <li class="nav-item navbar-margin">
                                    <Link class="nav-link active" to="/">Contact</Link>
                                </li>
                                <li class="nav-item login-button">
                                    <Link class="nav-link active" onClick={() => setloggedInUser({})} to="/login">SignOut</Link>
                                </li>
                            </ul>
                            <h3 className="ms-5">{loggedInUser.name}</h3>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-div">
                        {!search && <div>
                            <form action=''>
                            <h3>Pick From</h3>
                            <input type='text' onBlur={handleBlur} className="input-field" name="from" placeholder="From" />
                            <h3>Pick To</h3>
                            <input type='text' onBlur={handleBlur} className="input-field" name="to" placeholder="To" />
                            </form>
                            <br /><br />
                            <div className="CalenderDiv">
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Book you Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form><br /><br />
                            </div>
                        </div>}
                        <button onClick={() => setSearch(!search)} className="searchButton btn btn-success">Search</button>
                    </div>

                    <br /><br />

                    {search && <div className="style">
                        <div className="timeline-Style">
                            <Timeline>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent><h4>{fieldData.from}</h4></TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot />
                                    </TimelineSeparator>
                                    <TimelineContent><h4>{fieldData.to}</h4></TimelineContent>
                                </TimelineItem>

                            </Timeline>
                        </div>
                        <div className="divStyle">
                            <img src={matchingData[0].img} alt="" height="90px" />{matchingData[0].type}
                            <FontAwesomeIcon className="m-1" icon={faUserFriends} />4 <strong style={{ marginLeft: "50px" }}>$67</strong>
                        </div>
                        <div className="divStyle">
                            <img src={matchingData[0].img} alt="" height="90px" />{matchingData[0].type}
                            <FontAwesomeIcon className="m-1" icon={faUserFriends} />4 <strong style={{ marginLeft: "50px" }}>$67</strong>
                        </div>
                        <div className="divStyle">
                            <img src={matchingData[0].img} alt="" height="90px" />{matchingData[0].type}
                            <FontAwesomeIcon className="m-1" icon={faUserFriends} />4 <strong style={{ marginLeft: "50px" }}>$67</strong>
                        </div>
                    </div>}
                </div>
                <div className="col-md-6">
                    <img src={map} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Search;