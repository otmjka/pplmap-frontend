/* eslint-disable */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import PersonsMap from '../PersonsMap';
import theme from '../Theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersonsMap />
    </ThemeProvider>
  );
};

export default App;
