import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import useStyles from './useStyles';

const SimpleModal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Box className={classes.paper}>{children}</Box>
    </Dialog>
  );
};

export default SimpleModal;
