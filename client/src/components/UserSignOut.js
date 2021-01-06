import React from 'react';
import { useHistory } from 'react-router-dom';

export default function UserSignOut (props) {

    let history = useHistory();

    const signOut = () => {
        history.push("/")
        props.handleSignOut();
    }
    
    return (
        signOut(),
        null
    );
}