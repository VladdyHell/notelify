import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

function RightCol(props) {
  const [key, setKey] = useState("signin");

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="signup" title="SignUp">
          <SignupForm
            onRegister={props.onRegister}
            message={props.message}
            errorStatus={props.errorStatus}
            onClose={props.onClose}
          />
        </Tab>
        <Tab eventKey="signin" title="SignIn">
          <SigninForm
            onLogin={props.onLogin}
            message={props.message}
            errorStatus={props.errorStatus}
            onClose={props.onClose}
          />
        </Tab>
      </Tabs>
    </>
  );
}

export default RightCol;
