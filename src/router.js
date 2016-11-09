import React, {PropTypes} from "react";
import {Router, Route, IndexRedirect, IndexRoute} from "dva/router";
import IndexPage from "./routes/IndexPage";
import MainLayout from "./routes/MainLayout";
import Users from "./routes/Users";
import Login from "./routes/Login/Login";
import App from "./routes/App";
import getCookie from "./utils/index";


const validate = function (next, replace, callback) {

  const isLoggedIn = !!getCookie('uid');
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

export default function ({history}) {
  return (
    <Router history={history }>
      <Route path="/" onEnter={validate}>
        <IndexRedirect to="home"/>
        <Route component={MainLayout}>
          <Route path="users" component={Users}/>
          <Route path="home" component={IndexPage}/>
        </Route>
        <Route path="login" component={Login}/>
      </Route>
    </Router>
  );
};
