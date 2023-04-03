import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Auth from './views/Auth'
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import PublicRoute from './components/routing/PublicRoute';

import AuthContextProvider from './contexts/AuthContext';
import ProductContextProvider from './contexts/ProductContext';
import CartContextProvider from './contexts/CartContext';
import OrderContextProvider from './contexts/OrderContext';

import Dashboard from './views/Dashboard'
import ProductsManage from './views/ProductsManage'
import BrandsManage from './views/BrandsManage'
import CategoriesManage from './views/CategoriesManage'
import Checkout from './views/Checkout'
import Orders from './views/Orders'
import UserOrders from './views/UserOrders'

function App() {
  return (
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <Router>
            <Switch>
              <PublicRoute exact path='/' component={Dashboard} />
              <AdminRoute exact path='/admin/products' component={ProductsManage} />
              <AdminRoute exact path='/admin/brands' component={BrandsManage} />
              <AdminRoute exact path='/admin/categories' component={CategoriesManage} />
              <AdminRoute exact path='/admin/orders' component={Orders} />
              <Route exact path='/login' render={(props =><Auth {...props} authRoute='login' />)} />
              <Route exact path='/register' render={(props =><Auth {...props} authRoute='register' />)} />
              <ProtectedRoute exact path='/orders' component={UserOrders} />
              <ProtectedRoute exact path='/checkout' component={Checkout} />
              <PublicRoute exact path='/dashboard' component={Dashboard}/>
            </Switch>
          </Router>
        </OrderContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
  )
}

export default App;