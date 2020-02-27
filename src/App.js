import React from 'react';

import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom'
import Home from './Home';

function App() {

  return (
   <Router>
     <Route path="/" exact component={Home} />
   </Router>
  );
}

export default App;
