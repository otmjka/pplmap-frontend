/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AppLoader from '../AppLoader';
// import PersonsMap from '../PersonsMap';
import theme from '../Theme';

import './App.css';
import useAppLoading from './useAppLoading';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import firebaseService, { User } from '../../services/FirebaseService';
import { useAuth, authContext } from '../../Auth/useAuth';
import HomeScreen from '../Screens/HomeScreen';
import { PersonService } from '../../Persons';
import changePersonPosition from '../../Persons/changePersonPosition';

function PrivateRoute({
  children,
  path,
  ...rest
}: {
  children: React.ReactNode;
  path: string;
}) {
  let auth = useAuth();
  console.log('auth', auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isUserAuthicated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

type AuthState = {
  isUserAuthicated: boolean;
  user: User;
};

const App = () => {
  // const auth = useAppLoading();
  // console.log({ 'auth.loading': auth.loading });
  const [authState, setAuthState] = useState({
    isUserAuthicated: false,
    user: null,
    loading: false,
  });
  const auth = {
    ...authState,
    logout: () => {
      console.log({ message: 'logout' });
    },
  };

  useEffect(() => {
    firebaseService.setListener('onMessage', (event) => {
      console.log('[fect] firebaseService receive message: ', event);
    });
  }, []);
  return (
    <authContext.Provider value={auth}>
      <PersonService.Provider
        value={{
          changePersonPosition: async (personId, value) => {
            await changePersonPosition({ personId, offset: value });
          },
        }}
      >
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {auth.loading && <AppLoader />}
            {!auth.loading && (
              <Switch>
                <Route path="/about">About</Route>
                <Route path="/users">Users</Route>
                <Route path="/login">
                  <LoginScreen />
                </Route>
                <Route
                  path="/"
                  render={({ location }) => {
                    console.log({ message: 'a-la private route', auth });
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
            )}
          </ThemeProvider>
        </Router>
      </PersonService.Provider>
    </authContext.Provider>
  );
};

export default App;
