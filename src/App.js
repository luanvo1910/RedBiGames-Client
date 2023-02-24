import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Auth from './views/Auth'
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import PublicRoute from './components/routing/PublicRoute';

import AuthContextProvider from './contexts/AuthContext';
import ProductContextProvider from './contexts/ProductContext';

import Dashboard from './views/Dashboard'
import ProductsManage from './views/ProductsManage'

function App() {
  return (
  <AuthContextProvider>
    <ProductContextProvider>
        <Router>
          <Switch>
            <PublicRoute exact path='/' component={Dashboard} />
            <AdminRoute exact path='/admin/products' component={ProductsManage} />
            <Route exact path='/login' render={(props =><Auth {...props} authRoute='login' />)} />
            <Route exact path='/register' render={(props =><Auth {...props} authRoute='register' />)} />
            <PublicRoute exact path='/dashboard' component={Dashboard}/>
          </Switch>
        </Router>
    </ProductContextProvider>
  </AuthContextProvider>
  )
}

export default App;