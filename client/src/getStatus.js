import React from "react";

async function getStatus(DEBUG) {
    let res;
    let data;
    try {
        res = await fetch("http://localhost:8080/checkauth", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Credentials": true,
            },
            credentials: "include",
        });
        data = await res.json();
        if (res.ok) {
            DEBUG && console.log("Status Request Success");
            // setLoggedIn(res)
            DEBUG && console.log(res);
        } else {
            DEBUG && console.log("Status Request Failed");
        }
    } catch (err) {
        DEBUG && console.log(err);
    }
    // console.log(data);
    return data;
}

export default getStatus;
