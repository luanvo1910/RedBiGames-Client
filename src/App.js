import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard'

function App() {
  return (
  <AuthContextProvider>
    <Router>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/login' render={(props =><Auth {...props} authRoute='login' />)} />
      <Route exact path='/register' render={(props =><Auth {...props} authRoute='register' />)} />
    </Switch>
  </Router>
  </AuthContextProvider>
  )
}

export default App;