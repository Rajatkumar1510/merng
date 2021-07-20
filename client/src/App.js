import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import MenuBar from "./components/MenuBar";
import { Container } from "@material-ui/core";
import { AuthProvider } from "./context/auth/auth";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/posts/:id" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
