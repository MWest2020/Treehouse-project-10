import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';

// Import Components
import Header from './components/header';

function App() {

  return (
    <Router>
      <Header></Header>
    </Router>
  );
}

export default App;
