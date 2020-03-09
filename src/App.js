import React from 'react';
import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom'
import Home from './Home';
import Darkmode from 'darkmode-js';
import LoginPage from './components/Login/LoginPage';
function App() {
  



  return (
   <Router>
     <Route path="/" exact component={Home} />
     <Route path="/login" exact component={LoginPage} />
   </Router>
  );
}

export default App;
