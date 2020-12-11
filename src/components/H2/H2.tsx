import React from 'react';
import Typography from '@material-ui/core/Typography';

import useStyles from './useStyles';

const H2 = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();

  return (
    <Typography classes={{ root: classes.root }} variant="h4" component="h2">
      {children}
    </Typography>
  );
};

export default H2;
