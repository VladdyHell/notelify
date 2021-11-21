import React from "react";

async function register(DEBUG, queryString, setErrMes) {
    let res;
    let data;
    try {
        res = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "http://localhost:8080"
            },
            body: queryString,
            credentials: "include",
        });
        data = await res.json();
        if (res.ok) {
            DEBUG && console.log("Registration Request Success");
            DEBUG && console.log(data);
        } else {
            DEBUG && console.log("Registration Request Failed");
        }
    } catch (err) {
        DEBUG && console.log(err);
    }
    // DEBUG && console.log(data);
    setErrMes(data);
    return data;
}

export default register;
