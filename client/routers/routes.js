import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import RestrictRoute from './RestrictRoute';
import NotFound from '../components/error/NotFound';

const Home = loadable(() => import('../containers/Home'));
const Process = loadable(() => import('../containers/Process'));
const Review = loadable(() => import('../containers/Review'));

const Router = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/process/:token" component={Process} />
      <Route exact path="/review" component={Review} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
