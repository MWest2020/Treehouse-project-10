import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function UserSignOut (props) {

    let history = useHistory();

    useEffect(() => {
        history.push("/")
        props.handleSignOut();
    });

    
    return (
        null
    );
}