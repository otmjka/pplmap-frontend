import React from 'react';
import clsx from 'clsx';
import MUIAvatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiAvatar-img': {
      width: '100%',
      height: '100%',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  xl: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  purple: {
    backgroundColor: '#EC9FF2',
  },
  blue: {
    backgroundColor: '#6DBADB',
  },
  pink: {
    backgroundColor: '#FF9797',
  },
  green: {
    backgroundColor: '#7CCE87',
  },
  grey: {
    backgroundColor: '#B6B6B6',
  },
  yellow: {
    backgroundColor: '#FFCC77',
  },
}));

const Avatar = ({
  src,
  size = 'medium',
  color,
}: {
  src: string | undefined;
  // eslint-disable-next-line react/require-default-props
  size?: 'medium' | 'large' | 'small' | 'xl';
  color: 'blue' | 'green' | 'grey' | 'pink' | 'purple' | 'yellow';
}) => {
  const classes = useStyles();
  const props = {
    className: clsx(
      color && classes.root,
      size && classes[size],
      color && classes[color],
    ),
    alt: 'Slot',
    src,
  };
  return <MUIAvatar {...props} />;
};

export default Avatar;
