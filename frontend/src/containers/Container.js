import React from "react";
// import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './Login'
import Home from './Home'
import Register from './Register'
import { isAuthenticated } from '../util/auth'
import Cookies from 'js-cookie'

function Container() {
    console.log(Cookies.get('session'))
    return (
        <Switch>
            <PrivateRoute exact path="/" component={() => <Redirect to='/home' />} />
            <Route exact path="/login" component={() => <Login />} />
            <PrivateRoute path="/home" component={() => <Home />} />
            <Route exact path="/register" component={() => <Register />} />
        </Switch>
    );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)


export default Container;