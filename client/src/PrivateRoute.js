import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute ({ component: Component, ...rest }) {

    const authenticatedUser = Cookies.getJSON('authenticatedUser');
    const userCredentials = Cookies.getJSON('userCredentials');

    return (
        <Route {...rest}>
            {authenticatedUser ? (
                <Component authenticatedUser={authenticatedUser} userCredentials={userCredentials} />
                ) : (
                <Redirect to={{
                    pathname: '/signin'
                }} />)
            }
        </Route>
    )
}