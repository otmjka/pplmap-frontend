import React from 'react';

import { styled } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const EnvBadgeWrapper = styled(Chip)({
  zIndex: 1,
  background: 'red',
});

const EnvLabel = () => (
  <EnvBadgeWrapper
    size="small"
    label={process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD'}
  />
);

export default EnvLabel;
