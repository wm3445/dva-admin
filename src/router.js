import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link,IndexRedirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainLayout from './routes/MainLayout';
import Users from './routes/Users';
import NotFound from './routes/NotFound';
import Login from './routes/Login/Login';
import getCookie from './utils/index'


const validate = function (next, replace, callback) {

  const isLoggedIn = !!getCookie('uid');
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/"  onEnter={validate}   >
        <IndexRedirect to="/home" />
        <Route component={MainLayout}>
          <Route path="/users" component={Users} />
          <Route path="/home" component={IndexPage} />
        </Route>

        <Route path="/login" component={Login}/>
        <Route path="*" component={NotFound} />
      </Route>

    </Router>
  );
};
