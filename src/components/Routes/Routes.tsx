// eslint-disable-next-line
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../../Auth/useAuth';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';

const Routes = () => {
  const auth = useAuth();
  return (
    <Router>
      <Switch>
        <Route path="/about">About</Route>
        <Route path="/users">Users</Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route
          path="/"
          render={({ location }) => {
            return auth.isUserAuthicated ? (
              <HomeScreen />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
