import React from "react";

async function getStatus() {
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
            console.log("Status Request Success");
            // setLoggedIn(res)
            console.log(res);
        } else {
            console.log("Status Request Failed");
        }
    } catch (err) {
        console.log(err);
    }
    // console.log(data);
    return data;
}

export default getStatus;
