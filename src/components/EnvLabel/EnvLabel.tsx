import React from 'react';

import { styled } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const EnvBadgeWrapper = styled(Chip)({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 'auto',
  bottom: 'auto',
  zIndex: 1,
});

const EnvLabel = () => (
  <EnvBadgeWrapper
    size="small"
    label={process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'}
    color="primary"
  />
);

export default EnvLabel;
