import React from "react";

async function login(queryString, setErrMes) {
    let res;
    let data;
    try {
        res = await fetch("http://localhost:8080/login", {
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
            console.log("Authorization Request Success");
            console.log(res);
        } else {
            console.log("Authorization Request Failed");
        }
    } catch (err) {
        console.log(err);
    }
    // console.log(data);
    setErrMes(data);
    return data;
}

export default login;
