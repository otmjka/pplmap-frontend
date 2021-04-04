import { makeStyles } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolBar: {
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      margin: 'auto',
      maxWidth: 970, // TODO: get from theme
      width: '100%',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
    background: 'red',
  },
  authGroup: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(2),
    },
  },
  drawerAuthGroup: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '70%',
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: '70%',
    backgroundColor: 'red',
  },
  closeMenuButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
  profileMenuLink: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: blue[400],
  },
  profileMenuItem: {
    color: blue[500],
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontSize: '20px',

    borderBottom: `1px solid ${grey[300]}`,
    '&.MuiMenuItem-root': {
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    },
  },
  listItemTextRoot: {
    color: blue[200],
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontSize: '20px',
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
