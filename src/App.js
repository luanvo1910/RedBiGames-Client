import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Create from './components/product/create';
import Index from './components/product/index';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />>
          <div className="container">
            <Switch>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/index">
              <Index />
            </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;