// import React, { Component } from 'react';
// import { Route, Redirect, useHistory } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export default function PrivateRoute (props) {

//     // Declare history variable.
//     let history = useHistory();

//     const authenticatedUser = Cookies.getJSON('authenticatedUser');
//     const userCredentials = Cookies.getJSON('userCredentials')

//     return (
//         <Route
//             render={authenticatedUser ? (
//                 <Component authenticatedUser={authenticatedUser} userCredentials={userCredentials} />
//                 ) : (
//                 <Redirect to={{
//                     pathname: '/signin',
//                     state: { from: props.location }
//                 }} />)
//             }
//         />
//     )
// }