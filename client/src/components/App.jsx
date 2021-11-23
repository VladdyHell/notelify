import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import '../main.scss';

import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";

import AuthPage from "./AuthPage.js";
import NotesPage from "./NotesPage.js";
import Form from "./Form/Form";
import Notes from "./Notes";

import Footer from "./Footer";

import login from "../login";
import register from "../register";
import logout from "../logout";
import getStatus from "../getStatus";

const DEBUG = false;

function App() {
    const [isLoading, setLoading] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(null);
    const [errMes, setErrMes] = useState(null);
    const [isError, setError] = useState(false);

    async function handleStatus(event) {
        const { name } = event.target;
        DEBUG && console.log("Form Name: " + name);;
        const queryString = new URLSearchParams(
            new FormData(event.target)
        ).toString();
        DEBUG && console.log("Form Data: " + queryString);

        event.preventDefault();
        try {
            if (name === "login") {
                setLoading(true);
                const res = await login(DEBUG, queryString, setErrMes);
                DEBUG && console.log(`Logged In: ${res}`);
                setLoading(false);
            } else if (name === "register") {
                setLoading(true);
                const res = await register(DEBUG, queryString, setErrMes);
                DEBUG && console.log(`Registered: ${res}`);
                setLoading(false);
            } else if (name === "logout") {
                setLoading(true);
                const res = await logout(DEBUG);
                DEBUG && console.log(`Still logged in: ${res}`);
                setLoading(false);
            } else {
                DEBUG && console.log("Invalid operation");
            }
            setLoading(true);
            const status = await getStatus(DEBUG);
            DEBUG && console.log('STATUS: ' + status);
            // const status = resStatus.json();
            setLoggedIn(status[0]);
            setLoading(false);
        } catch (err) {
            DEBUG && console.log(err);
        }

        if (errMes !== "Successfully Authenticated") {
            setError(true);
        } else {
            setError(false);
        }
        if (isLoggedIn) {
            setError(false);
        }
    }

    async function noteOperation(event) {
        let res;
        let data;
        const queryString = new URLSearchParams(new FormData(event)).toString();
        console.log('Notes Param: ' + queryString);

        try {
            res = await fetch('http://localhost:8080/noteoperation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: queryString,
                credentials: 'include'
            });
            data = await res.json();
            if (res.ok) {
                console.log('Note Submission Request Success');
            } else {
                console.log('Note Submission Request Failed');
            }
        } catch(err) {
            console.log(err);
        }
        console.log(data);
        return data;
    }

    return (
        <Router>
            <div>
                <LoadingScreen displayProp={isLoading} />
                <Navbar
                    DEBUG={DEBUG}
                    isLoggedIn={isLoggedIn} 
                    getStatus={getStatus}
                    setLoggedIn={setLoggedIn}
                    setLoading={setLoading}
                    onLogout={handleStatus}
                />
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route
                        element={
                            <AuthPage
                                DEBUG={DEBUG}
                                isLoggedIn={isLoggedIn}
                                setLoggedIn={setLoggedIn}
                                getStatus={getStatus}
                                setLoading={setLoading}
                            />
                        }
                    >
                        <Route
                            path="/account"
                            element={
                                <Form
                                    DEBUG={DEBUG}
                                    onLogin={handleStatus}
                                    onRegister={handleStatus}
                                    getStatus={getStatus}
                                    message={errMes}
                                    errorStatus={isError}
                                    onClose={setError}
                                    setLoading={setLoading}
                                />
                            }
                        />
                    </Route>
                    <Route
                        element={
                            <NotesPage
                                isLoggedIn={isLoggedIn}
                                setLoggedIn={setLoggedIn}
                                getStatus={getStatus}
                                setLoading={setLoading}
                            />
                        }
                    >
                        <Route
                            path="/notes"
                            element={<Notes onOperateNote={noteOperation} />}
                        />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
