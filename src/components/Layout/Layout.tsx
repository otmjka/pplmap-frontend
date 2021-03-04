import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Link } from '@material-ui/core';

import { useAuth } from '../../Auth/useAuth';
import EnvLabel from '../EnvLabel';

interface LayoutProps {
  children: React.ReactNode;
}
const useStyles = makeStyles({
  root: { minHeight: 'auto', background: 'black' }, // a style rule
  label: {}, // a nested style rule
});
const Layout = ({ children }: LayoutProps) => {
  const auth = useAuth();
  const styles = useStyles();

  return (
    <Box>
      <AppBar className={styles.root}>
        <Toolbar className={styles.root}>
          <Button
            component={RouterLink}
            to="/"
            color="secondary"
            variant="outlined"
          >
            Home
          </Button>
          <EnvLabel />
          <Box flex="1" />
          {auth.isUserAuthicated && (
            <Button onClick={auth.logout} color="primary" variant="outlined">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
