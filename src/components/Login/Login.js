import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import googleicons from '../images/google.png';
import Navbar from "../Navbar/Navbar";
import config from './config';
import './Login.css';

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const [newUser, setnewUser] = useState(false)
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        password: "",
        newUser: false,
        error: "",
        success: "",
    })
    var provider = new firebase.auth.GoogleAuthProvider();

    const signInWithGoogle = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var { email, photoURL, displayName } = result.user;
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signInUser)
                setloggedInUser(signInUser)
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
            }
            setUser(signOutUser)
        }).catch((error) => {
            console.log("error", error);
        });
    }
    const onBlurHandler = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);

            // console.log(isFieldValid);
        }
        if (event.target.name === "password") {
            const isPasswordValidation = event.target.value.length > 8;
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValidation && passwordNumber);
            // console.log(isFieldValid);

        }
        if (event.target.name === "confirmPassword") {
            const isPasswordValidation = event.target.value.length > 8;
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFieldValid = (isPasswordValidation && passwordNumber);
            // console.log(isFieldValid);

        }
        if (isFieldValid) {
            const newUserinfo = { ...user };
            newUserinfo[event.target.name] = event.target.value;
            setUser(newUserinfo)
        }
        else {
            alert('you should enter correct email and use password as a 1 numaric number & 8 any letters')
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserinfo = { ...user };
                    newUserinfo.error = ''
                    newUserinfo.success = true;
                    setUser(newUserinfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserinfo = { ...user }
                    newUserinfo.error = error.message;
                    newUserinfo.success = false;
                    setUser(newUserinfo);
                });

        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserinfo = { ...user };
                    newUserinfo.error = ''
                    newUserinfo.success = true;
                    setUser(newUserinfo);
                    setloggedInUser(newUserinfo);
                    history.replace(from);

                })
                .catch((error) => {
                    const newUserinfo = { ...user }
                    newUserinfo.error = error.message;
                    newUserinfo.success = false;
                    setUser(newUserinfo);
                });
        }
        e.preventDefault();
    }
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(() => {
            console.log("User Update Successfully.")
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <Navbar />
                <div className="LoginDiv">

                    {
                        !newUser ? <h4>Log In</h4> : <h4>Create a new account</h4>
                    }
                    <form onSubmit={handleSubmit}>
                        {
                            newUser && <input type='text' onBlur={onBlurHandler} className='formControl' name='name' placeholder='name' required />

                        }

                        <br /><br />
                        <input type='text' onBlur={onBlurHandler} className='formControl' placeholder="Email" name="email" required /><br /><br />
                        <input type='password' onBlur={onBlurHandler} className='formControl' name="password" placeholder="Password" required /><br /><br />
                        { !newUser &&<div className="d-flex justify-content-center">
                        <div>
                        <input type='checkbox' name='checkbox'/>
                        <label htmlfor='checkbox'>Remember me </label>
                        </div>
                        <div>
                        <p style={{marginLeft:"150px", textDecoration:"underline", color:"#FF6E40"}}>forgot password</p>
                        </div>
                        </div>}
                        {
                            newUser && <input type='password' onBlur={onBlurHandler} className='formControl' name="confirmPassword" placeholder="Confirm Password" required />
                        }
                        <br /><br />
                        <input type='submit' className="registerLoginBtn" value={newUser ? "Register" : "Login"} />
                    </form>
                    <p>{newUser ? "Already have an account?" : "Don't have an account?"} <span onClick={() => setnewUser(!newUser)}
                        style={{ color: '#FF6E40', cursor: "pointer" }}>{newUser ? "login" : "Create an account"}</span></p>
                    {
                        user.success ? <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Loggedin'} Successfully</p> : <p style={{ color: 'red' }}>{user.error}</p>
                    }
                    <p>OR</p>
                    {
                        user.isSignedIn ? <button className="googleBtn" onClick={signOut}><img src={googleicons} height="60px" alt=""/> SignOut </button> : <button className="googleBtn" onClick={signInWithGoogle}><img src={googleicons} height="60px" alt=""/>Sign in with Google</button>
                    }
                </div>
            
        </div>
    );
};

export default Login;