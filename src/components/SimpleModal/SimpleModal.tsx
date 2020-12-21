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
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = useState();
  // style={modalStyle}
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const body = <div className={classes.paper}></div>;

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
