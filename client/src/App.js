import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';
import Cookies from 'js-cookie';
import axios from 'axios';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

function App (props) {

  const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null);
  const [userCredentials, setUserCredentials] = useState(Cookies.getJSON('userCredentials') || null);

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
          setUserCredentials(btoa(`${username}:${password}`));
          Cookies.set('userCredentials', JSON.stringify(btoa(`${username}:${password}`)), {expires: 2});
          setAuthenticatedUser(user);
          Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 2});
        } else {
          user = null;
        }
      })
      .catch(err=>{
        console.log(err);
        props.history.push("/error");
    });

    return user;
  }

  const handleSignOut = () => {
    Cookies.remove('authenticatedUser');
    Cookies.remove('userCredentials');
    setAuthenticatedUser(null);
    setUserCredentials(null);
  }

  return (
    <Router>
      <div>
        <Header authenticatedUser={authenticatedUser}/>

        <Switch>
          <Route exact path="/" render={() => (<Courses authenticatedUser={authenticatedUser}/>)}/>
          <Route exact path="/courses/create" render={() => (<CreateCourse authenticatedUser={authenticatedUser} userCredentials={userCredentials}/>)}/>
          <Route exact path="/courses/:id/update" render={() => (<UpdateCourse authenticatedUser={authenticatedUser} userCredentials={userCredentials} />)}/>
          <Route exact path="/courses/:id" render={() => (<CourseDetail userCredentials={userCredentials} authenticatedUser={authenticatedUser} />)}/>
          <Route path="/signin" render={() => (<UserSignIn handleSignIn={handleSignIn}/>)}/>
          <Route path="/signup" render={() => (<UserSignUp handleSignIn={handleSignIn}/>)}/>
          <Route path="/signout" render={() => (<UserSignOut handleSignOut={handleSignOut}/>)}/>
          <Route path="/error" component={UnhandledError}/>
          <Route path="/forbidden" component={Forbidden}/>
          <Route path="/notfound" component={NotFound}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;