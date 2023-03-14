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
import BrandsManage from './views/BrandsManage'
import CategoriesManage from './views/CategoriesManage'
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <Router>
          <Switch>
            <PublicRoute exact path='/' component={Dashboard} />
            <AdminRoute exact path='/admin/products' component={ProductsManage} />
            <AdminRoute exact path='/admin/brands' component={BrandsManage} />
            <AdminRoute exact path='/admin/categories' component={CategoriesManage} />
            <Route exact path='/login' render={(props =><Auth {...props} authRoute='login' />)} />
            <Route exact path='/register' render={(props =><Auth {...props} authRoute='register' />)} />
            <PublicRoute exact path='/dashboard' component={Dashboard}/>
          </Switch>
        </Router>
      </CartContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
  )
}

export default App;