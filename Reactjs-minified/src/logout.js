import React from "react";

async function logout() {
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
        console.log(res);
    } catch (err) {
        console.log(err);
    }
    return data;
}

export default logout;
