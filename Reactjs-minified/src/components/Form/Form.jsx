import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import LeftCol from "./LeftCol";
import RightCol from "./RightCol";

function FormPage(props) {

  return (
    <>
      <Container className="login-form-container">
        <Row>
          <Col>
            <LeftCol />
          </Col>
          <Col>
            <RightCol
              onLogin={props.onLogin}
              onRegister={props.onRegister}
              message={props.message}
              errorStatus={props.errorStatus}
              onClose={props.onClose}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormPage;
