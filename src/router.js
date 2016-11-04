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
  if (!true && next.location.pathname != '/login') {
    console.log("next",next);

    replace('/login')
  }
  callback()
}

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/"  onEnter={validate} component={MainLayout}  >
        <IndexRedirect to="/home" />

        <Route path="/users" component={Users} />
        <Route path="/home" component={IndexPage} />
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="*" component={NotFound} />
    </Router>
  );
};
