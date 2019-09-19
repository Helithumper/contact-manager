import React from "react";
// import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Login from './Login'
import Home from './Home'

function Container() {
  return (
    <Switch>
        <Route exact path="/" component={() => <Login/>} />
        <Route path="/home" component={() => <Home/>} />
    </Switch>
  );
}

// const Wrapper = styled.div`
// `;

export default Container;