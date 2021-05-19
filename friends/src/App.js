import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './utils/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/login">Login</Link><br/>
        <Link to="/friendslist">Friends List!</Link>
      </div>

      <Switch>
        <PrivateRoute exact path="/friendslist" component={FriendsList}/>
        <Route path="/" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
