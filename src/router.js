import React, {PropTypes} from "react";
import {Router, Route, IndexRedirect} from "dva/router";
import IndexPage from "./routes/IndexPage";
import MainLayout from "./routes/MainLayout";
import Users from "./routes/Users";
import Login from "./routes/Login/Login"
import Register from "./routes/Login/Register"

import getCookie from "./utils/index";


const validate = function (next, replace, callback) {

  const isLoggedIn = !!getCookie('uid');
  if (!isLoggedIn && next.location.pathname != '/login' && next.location.pathname != '/register') {
    replace('/login')
  }
  callback()
}

export default function ({history}) {
  return (
    <Router history={history }>
      <Route path="/" onEnter={validate}>
        <IndexRedirect to="home"/>
        <Route component={MainLayout} onEnter={validate}>
          <Route path="users" component={Users}/>
          <Route path="home" component={IndexPage}/>
        </Route>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>

      </Route>
    </Router>
  );
};
