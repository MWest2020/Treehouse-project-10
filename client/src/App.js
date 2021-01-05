import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';

// Import Components
import Header from './components/header';
import Courses from './components/courses';

function App() {

  return (
    <Router>
    <div>
      <Header />

      <Switch>
        <Route path="/" component={Courses} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
