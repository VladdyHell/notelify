import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import '../main.scss';

import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";

import AuthPage from './AuthPage.js';
import NotesPage from "./NotesPage.js";
import Form from "./Form/Form";
import Notes from "./Notes";

import Footer from "./Footer";

import login from "../login";
import register from "../register";
import logout from "../logout";
import getStatus from "../getStatus";

function App() {
    const [isLoading, setLoading] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(async () => {
        setLoading(true);
        const status = await getStatus();
        console.log("Initial Status: " + status);
        try {
            setLoggedIn(status[0]);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    });
    const [errMes, setErrMes] = useState(null);
    const [isError, setError] = useState(false);

    async function handleStatus(event) {
        const { name } = event.target;
        console.log("Form Name:");
        console.log(name);
        const queryString = new URLSearchParams(
            new FormData(event.target)
        ).toString();
        console.log("Form Data: " + queryString);

        event.preventDefault();
        try {
            if (name === "login") {
                setLoading(true);
                const res = await login(queryString, setErrMes);
                console.log(`Logged In: ${res}`);
                setLoading(false);
            } else if (name === "register") {
                setLoading(true);
                const res = await register(queryString, setErrMes);
                console.log(`Registered: ${res}`);
                setLoading(false);
            } else if (name === "logout") {
                setLoading(true);
                const res = await logout();
                console.log(`Still logged in: ${res}`);
                setLoading(false);
            } else {
                console.log("Invalid operation");
            }
            setLoading(true);
            const status = await getStatus();
            // const status = resStatus.json();
            setLoggedIn(status[0]);
            setLoading(false);
        } catch (err) {
            console.log(err);
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

    return (
        <Router>
            <div>
                <LoadingScreen displayProp={isLoading} />
                <Navbar />
                <Routes>
                	<Route path='/' element={<LandingPage />} />

                	<Route 
                		element={
                			<AuthPage
                				isLoggedIn={isLoggedIn}
                				getStatus={getStatus}
                				setLoading={setLoading}
                			/>
                		}>
	                    <Route
	                        path="/account"
	                        element={
	                            <Form
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
                    <Route element={
                    	<NotesPage 
	                    	isLoggedIn={isLoggedIn} 
	                    	getStatus={getStatus}
	                    	setLoading={setLoading} 
	                    />
	                }>

                        <Route
                            path="/notes"
                            element={<Notes onLogout={handleStatus} />}
                        />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
