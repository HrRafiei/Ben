import React, { Component } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
 
    <Route {...rest} render={props => (localStorage.getItem('token') ? <Component {...props} /> :
        <Redirect to="/login" />)} />
)
export default PrivateRoute;