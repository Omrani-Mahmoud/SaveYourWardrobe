import React from 'react';
import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom'
import Home from './Home';
import HomeAfterLogin from './HomeAfterLogin';
import LoginPage from './components/Login/LoginPage';
import AddNewItem from './components/Items/AddNewItem';
import Donations from './components/Donations/Donations';
import HomeAdmin from './AdminPanel/HomeAdmin';
import HomeAssociation from './AssociationPanel/HomeAssociation';
import SignUp from './components/SignUp/SignUp';
import EmailItemView from './Email items View/EmailItemView';
import HomeStore from './StorePanel/HomeStore';
function App() {
  



  return (
   <Router>
     <Route path="/" exact component={Home} />
     <Route path="/login" exact component={LoginPage} />
     <Route path="/home" component={HomeAfterLogin} />
     <Route path="/admin" component={HomeAdmin} />
     <Route path="/association" component={HomeAssociation} />
     <Route path="/store" component={HomeStore} />
     <Route path="/signup" component={SignUp} />
     

 
     

   </Router>
  );
}

export default App;
