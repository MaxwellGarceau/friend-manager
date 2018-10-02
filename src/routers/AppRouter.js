import React from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';

import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/user-area/LoginPage';
import SignUpPage from '../components/user-area/SignUpPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = ({ location }) => (
  <section className="route-section">
    <Switch location={location}>
      <PublicRoute path="/" component={LoginPage} exact={true} />
      <PublicRoute path="/signup" component={SignUpPage} />
      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </section>
);

export default AppRouter;
