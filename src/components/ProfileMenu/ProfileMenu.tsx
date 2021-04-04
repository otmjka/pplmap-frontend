import React from 'react';
import clsx from 'clsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './useStyles';
import { AppUser } from '../../types/User';

type Props = {
  userProfile: AppUser;
  anchorEl: Element | null;
  onClose: () => void;
  logoutUser: () => void;
};

const ProfileMenu = ({ userProfile, anchorEl, onClose, logoutUser }: Props) => {
  const classes = useStyles();
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      getContentAnchorEl={null}
      open={isMenuOpen}
      onClose={onClose}
    >
      <MenuItem
        className={clsx(classes.profileMenuLink, classes.profileMenuItem)}
        onClick={logoutUser}
      >
        logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
