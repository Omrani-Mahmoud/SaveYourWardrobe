import React from 'react';
import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom'
import Home from './Home';
import Darkmode from 'darkmode-js';
import LoginPage from './components/Login/LoginPage';
import AddNewItem from './components/Items/AddNewItem';
import AddNewTrade from './components/Trades/AddNewTrade';
function App() {
  



  return (
   <Router>
     <Route path="/" exact component={Home} />
     <Route path="/login" exact component={LoginPage} />
     <Route path="/addItem" exact component={AddNewItem} />
     <Route path="/addTrade" exact component={AddNewTrade} />
   </Router>
  );
}

export default App;
