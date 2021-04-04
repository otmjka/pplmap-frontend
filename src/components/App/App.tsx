/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthState } from '../../types/Auth';
import firebaseService from '../../services/FirebaseService';
import { authContext } from '../../Auth/useAuth';
import { PersonService, personService } from '../../Persons';
import DebugContext from '../../contexts/DebugContext';

import AppLoader from '../AppLoader';
import theme from '../Theme';
import Routes from '../Routes/Routes';

import './App.css';

const App = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isUserAuthicated: false,
    user: null,
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
      // eslint-disable-next-line
      console.log({
        message: '[fect] firebaseService receive message: ',
        event,
      });
      const user = event.payload?.uid
        ? {
            uid: event.payload.uid,
            displayName: event.payload.displayName,
            photoURL: event.payload.photoURL,
          }
        : null;

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

          <ThemeProvider theme={theme}>
            <CssBaseline />

            {auth.loading && <AppLoader />}
            {!auth.loading && <Routes />}
          </ThemeProvider>

          {/* </ThemeContext.Provider> */}
        </DebugContext.Provider>
      </PersonService.Provider>
    </authContext.Provider>
  );
};

export default App;
