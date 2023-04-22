import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Auth from './views/Auth'
import ProtectedRoute from './components/Routing/ProtectedRoute';
import AdminRoute from './components/Routing/AdminRoute';
import PublicRoute from './components/Routing/PublicRoute';

import AuthContextProvider from './contexts/AuthContext';
import ProductContextProvider from './contexts/ProductContext';
import CartContextProvider from './contexts/CartContext';
import OrderContextProvider from './contexts/OrderContext';
import ChatContextProvider from './contexts/ChatContext';

import Dashboard from './views/Dashboard'
import ProductsManage from './views/ProductsManage'
import BrandsManage from './views/BrandsManage'
import CategoriesManage from './views/CategoriesManage'
import Checkout from './views/Checkout'
import Orders from './views/Orders'
import UserOrders from './views/UserOrders'
import Conversations from './views/AdminConversations'
import Payment from './views/Payment';

function App() {
  return (
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <OrderContextProvider>
          <ChatContextProvider>
            <Router>
              <Switch>
                <PublicRoute exact path='/' component={Dashboard} />
                <AdminRoute exact path='/admin/products' component={ProductsManage} />
                <AdminRoute exact path='/admin/brands' component={BrandsManage} />
                <AdminRoute exact path='/admin/categories' component={CategoriesManage} />
                <AdminRoute exact path='/admin/orders' component={Orders} />
                <AdminRoute exact path='/admin/conversations' component={Conversations} />
                <Route exact path='/login' render={(props =><Auth {...props} authRoute='login' />)} />
                <Route exact path='/register' render={(props =><Auth {...props} authRoute='register' />)} />
                <ProtectedRoute exact path='/orders' component={UserOrders} />
                <ProtectedRoute exact path='/checkout' component={Checkout} />
                <ProtectedRoute exact path='/payment' component={Payment} />
                <PublicRoute exact path='/dashboard' component={Dashboard}/>
              </Switch>
            </Router>
          </ChatContextProvider>
        </OrderContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>
  )
}

export default App;