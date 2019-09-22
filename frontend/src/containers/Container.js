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
            <Route exact path="/" component={() => <Redirect to='/home' />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route path="/home" component={() => <Home />} />
            <Route exact path="/register" component={() => <Register />} />
            <Route exact path="/logout" component={() => window.location='/api/v1/logout'} />
        </Switch>
    );
}


export default Container;