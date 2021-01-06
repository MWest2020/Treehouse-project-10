import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';
import axios from 'axios';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

function App () {

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [userCredentials, setUserCredentials] = useState(null);

  const handleSignIn = async (username, password) => {
    let user;

    await axios.get(`http://localhost:5000/api/users`, {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          user = res.data;
          setUserCredentials(user);
          setAuthenticatedUser(btoa(`${username}:${password}`));
        } else {
          user = null;
        }
      })
      .catch(err=>{
        console.log(err);
    });

    return user;
  }

  const handleSignOut = () => {
    setAuthenticatedUser(null);
    setUserCredentials(null);
  }

  return (
    <Router>
      <div>
        <Header handleSignOut={handleSignOut}/>

        <Switch>
          <Route exact path="/" component={Courses}/>
          <Route exact path="/courses/:id" component={CourseDetail}/>
          <Route path="/signin" render={() => (<UserSignIn handleSignIn={handleSignIn} />)}/>
          <Route path="/signup" render={() => (<UserSignUp handleSignIn={handleSignIn} />)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;