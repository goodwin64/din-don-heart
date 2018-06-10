import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeConnected from './components/Home/Home';
import LoginFormConnected from './components/LoginForm/LoginForm';
import NotFound from './components/NotFound/NotFound';

export default function () {
  return (
    <Switch>
      <Route path="/" exact component={LoginFormConnected} />
      <Route path="/login" exact component={LoginFormConnected} />
      <Route path="/home" exact component={HomeConnected} />
      <Route component={NotFound} />
    </Switch>
  );
}
