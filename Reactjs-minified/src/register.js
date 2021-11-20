import React from "react";

async function register(queryString, setErrMes) {
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
            console.log("Registration Request Success");
            console.log(data);
        } else {
            console.log("Registration Request Failed");
        }
    } catch (err) {
        console.log(err);
    }
    // console.log(data);
    setErrMes(data);
    return data;
}

export default register;
