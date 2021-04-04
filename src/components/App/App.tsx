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
import { PersonService, personService } from '../../Persons';
import DebugContext from '../../contexts/DebugContext';

type AuthState = {
  isUserAuthicated: boolean;
  user: User;
};

const App = () => {
  // const auth = useAppLoading();
  // console.log({ 'auth.loading': auth.loading });
  const [authState, setAuthState] = useState<{
    isUserAuthicated: boolean;
    user?: { uid: string; displayName: string | null };
    loading: boolean;
  }>({
    isUserAuthicated: false,
    user: undefined,
    loading: true,
  });
  const auth = {
    ...authState,
    logout: () => {
      firebaseService.logout();
    },
  };

  useEffect(() => {
    firebaseService.setListener('onMessage', (event) => {
      console.log({
        message: '[fect] firebaseService receive message: ',
        event,
      });
      let user;
      if (!!event.payload?.uid) {
        user = {
          uid: event.payload.uid,
          displayName: event.payload.displayName,
        };
      }

      setAuthState({
        loading: false,
        isUserAuthicated: !!user?.uid,
        user,
      });
    });
  }, []);
  return (
    <authContext.Provider value={auth}>
      <PersonService.Provider value={personService}>
        <DebugContext.Provider value={{ debug: false }}>
          {/* <ThemeContext.Provider value={themeService}> */}
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
          {/* </ThemeContext.Provider> */}
        </DebugContext.Provider>
      </PersonService.Provider>
    </authContext.Provider>
  );
};

export default App;
