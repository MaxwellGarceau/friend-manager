import React from 'react';
import { Route, Switch, Link, NavLink, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/user-area/LoginPage';
import SignUpPage from '../components/user-area/SignUpPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = ({ location }) => (
  <TransitionGroup className="transition-group">
    <CSSTransition
      key={location.key}
      timeout={{ enter: 300, exit: 300 }}
      classNames={'fade'}
    >
      <section className="route-section">
        <Switch location={location}>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PublicRoute path="/signup" component={SignUpPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </section>
    </CSSTransition>
  </TransitionGroup>
);

export default withRouter(AppRouter);
