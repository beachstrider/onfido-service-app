import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import RestrictRoute from './RestrictRoute';
import NotFound from '../components/error/NotFound';

const Home = loadable(() => import('../containers/Home'));
const Process = loadable(() => import('../containers/Process'));
const Dashboard = loadable(() => import('../containers/dashboard/DashboardContainer'));

const Router = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/process" component={Process} />

      
      <Route exact path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
