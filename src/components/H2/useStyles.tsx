import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      background: 'red',
    },
    authGroup: {
      display: 'flex',
      '& > *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

export default useStyles;
