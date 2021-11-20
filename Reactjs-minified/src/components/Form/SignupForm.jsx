import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

function SigninForm(props) {
  const [textInput, setTextInput] = useState({
    user: "",
    username: "",
    password: ""
  });
  function handleChange(event) {
    const { name, value } = event.target;

    return setTextInput((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
    console.log(textInput);
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Form
            name="register"
            onSubmit={(e) => props.onRegister(e)}
            // method="POST"
            // action="../..login"
          >
            <Form.Group className="mb-3" controlId="user">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChangename="user"
                name="user"
                onChange={handleChange}
                value={textInput.name}
                type="text"
                placeholder="Enter username"
                // required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChangename="username"
                name="username"
                onChange={handleChange}
                value={textInput.username}
                type="email"
                placeholder="Enter email"
                // required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                value={textInput.password}
                type="password"
                placeholder="Password"
                // required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              {/*<Form.Check type="checkbox" label="Keep me logged in for 30 days" name="rememberpass" />*/}
            </Form.Group>
            <Button bg="primary" variant="tertiary-analogous" type="submit">
              Sign Up
            </Button>
            {props.errorStatus ? (
              <Alert
                variant="danger"
                onClose={() => props.onClose(false)}
                dismissible
              >
                {props.message}
              </Alert>
            ) : null}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default SigninForm;
