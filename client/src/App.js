import React, { Component } from 'react';
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

class App extends Component {

  render() {
    const handleSignIn = async (username, password) => {
      let user;

      await axios.get(`http://localhost:5000/api/users`, {
        headers: {
          'Authorization': {
            'UserName': username,
            'Password': password
          } 
        }
      })
        .then((res) => {
          if (res.status === 200) {
            user = res.data;
            this.setState(() => {
              return {
                authenticatedUser: {
                  userName: username,
                  passWord: password
                },
              };
            });
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
      this.setState({ authenticatedUser: null });
    }

    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Courses}/>
            <Route exact path="/courses/:id" component={CourseDetail}/>
            <Route path="/signin" render={() => (<UserSignIn handleSignIn={handleSignIn} />)}
/>
            <Route path="/signup" component={UserSignUp}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
