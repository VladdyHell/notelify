import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function SigninForm(props) {

  const navigate = useNavigate();

  const [textInput, setTextInput] = useState({
    username: "",
    password: "",
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
            name="login"
            onSubmit={ async (e) => {
                await props.onLogin(e)
                navigate('/notes');
              }
            }
            // method="POST"
            // action="../..login"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChangename="username"
                name="username"
                onChange={handleChange}
                value={textInput.username}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleChange}
                value={textInput.password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Keep me logged in for 30 days"
                name="rememberpass"
              />
            </Form.Group>
            <Button bg="primary" variant="tertiary-analogous" type="submit">
              Sign In
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
