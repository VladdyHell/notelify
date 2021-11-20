import React from "react";
import ReactLoading from "react-loading";

function LoadingScreen(props) {
    return (
        <div
            id="loading-screen"
            style={{ display: props.displayProp ? "flex" : "none" }}
        >
            <ReactLoading
                className="loading-icon"
                type="bars"
                color="#fff"
                height={83.375}
                width={46.875}
            />
        </div>
    );
}

export default LoadingScreen;
