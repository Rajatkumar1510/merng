import React, { useState, useContext } from "react";
import { Form, Container, Button, Alert, Spinner } from "react-bootstrap";

import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth/auth";
const Register = () => {
  const { login, user } = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({});
  const initialState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [inputValue, setInputValue] = useState(initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      login(result.data.register);
      console.log(result.register);
      history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: inputValue,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };
  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container
      style={{
        width: "400px",
        margin: "auto",
      }}
    >
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={inputValue.email}
            onChange={handleChange}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={inputValue.username}
            onChange={handleChange}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={inputValue.password}
            onChange={handleChange}
          />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={inputValue.confirmPassword}
            onChange={handleChange}
          />
          <Button
            style={{
              marginTop: "15px",
            }}
            variant="dark"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      )}

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <ul>
            {Object.values(errors).map((value) => {
              return <li key={value}>{value}</li>;
            })}
          </ul>
        </Alert>
      )}
    </Container>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Register;
