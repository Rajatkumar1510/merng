import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/auth/auth";
import { useHistory } from "react-router-dom";
const Login = () => {
  const { user, login, logout } = useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
  };
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState({});

  const [inputValue, setInpuValue] = useState(initialState);
  const history = useHistory();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      history.push("/");
      login(result.data.login);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: inputValue,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  const handleChange = (e) => {
    setInpuValue({
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
      <Form onSubmit={handleSubmit}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name="username"
          value={inputValue.username}
          onChange={handleChange}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
        />
        <Button
          style={{
            marginTop: "15px",
          }}
          type="submit"
        >
          Login
        </Button>
      </Form>
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Login;
