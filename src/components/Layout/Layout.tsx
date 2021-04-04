import React, { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Hidden, IconButton, makeStyles } from '@material-ui/core';

import { useAuth } from '../../Auth/useAuth';
import EnvLabel from '../EnvLabel';
import Avatar from '../Avatar';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

interface LayoutProps {
  children: React.ReactNode;
}
const useStyles = makeStyles({
  root: { minHeight: 'auto', background: '#e7b6fd' }, // a style rule
  label: {}, // a nested style rule
});
const Layout = ({ children }: LayoutProps) => {
  const auth = useAuth();
  const styles = useStyles();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const photoUrl = auth?.user?.photoURL || undefined;
  const color = 'yellow';
  const handleMenuOpen = (event: React.MouseEvent) => {
    // @ts-ignore
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logout();
  };
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

          {/* Logged state */}
          {auth.isUserAuthicated && (
            <div>
              <Hidden smUp implementation="css">
                <IconButton onClick={() => setMobileOpen(true)}>
                  <Avatar src={photoUrl} color={color} />
                </IconButton>
              </Hidden>
              <Hidden xsDown implementation="css">
                <IconButton onClick={handleMenuOpen}>
                  <Avatar src={photoUrl} color={color} />
                </IconButton>
              </Hidden>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ProfileMenu
        userProfile={auth.user}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        logoutUser={handleLogout}
      />
      {children}
    </Box>
  );
};

export default Layout;
