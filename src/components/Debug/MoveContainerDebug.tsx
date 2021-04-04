import React from 'react';

import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

export const DebugBlock = styled(Box)({
  position: 'absolute',
  zIndex: 101,
  bottom: '40px',
  left: 0,
  background: 'red',
  fontSize: '8px',
});

const crossColor = 'purple';

export const AxisX = styled(({ top, ...other }) => <Box {...other} />)({
  position: 'absolute',
  zIndex: 102,
  top: (props: { top: string }) => props.top,
  left: 0,
  width: '150px',
  height: '1px',
  background: crossColor,
});

export const AxisY = styled(({ top, ...other }) => <Box {...other} />)({
  position: 'absolute',
  zIndex: 102,
  top: 0,
  left: (props: { left: string }) => props.left,
  width: '1px',
  height: '150px',
  background: crossColor,
});
