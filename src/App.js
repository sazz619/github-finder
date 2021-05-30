import './App.css';
import React from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import Home from './components/pages/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';

import AlertState from './context/alert/AlertState';

const App = () => {
  //get single user info

  return (
    <GithubState>
      <AlertState>
        <Router>
          <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
          <div className='container'>
            <Alert></Alert>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/user/:login' component={User} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
