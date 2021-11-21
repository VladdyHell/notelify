import React from "react";

async function logout(DEBUG) {
    let res;
    let data;
    try {
        res = await fetch("http://localhost:8080/logout", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Credentials": true,
            },
            credentials: "include",
        });
        data = res.json();
        DEBUG && console.log(res);
    } catch (err) {
        DEBUG && console.log(err);
    }
    return data;
}

export default logout;
