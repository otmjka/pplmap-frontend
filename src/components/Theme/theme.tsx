import { createMuiTheme } from '@material-ui/core/styles';
import { grey, blue, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: '#fff',
      light: '#032c54',
    },
    secondary: {
      main: green[500],
      contrastText: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
  overrides: {
    MuiInputLabel: {
      outlined: {
        color: grey[500],
      },
    },
    MuiTypography: {
      h1: {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      h2: {
        fontSize: 28,
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
      },
      h3: {
        fontSize: 28,
        textTransform: 'none',
      },
      h4: {
        fontSize: 21,
        textTransform: 'none',
      },
      h5: {
        fontSize: 15,
        textTransform: 'none',
      },
      h6: {
        fontSize: 13,
        textTransform: 'none',
      },
      subtitle1: {
        fontSize: 18,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
      },
      caption: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
      },
    },
  },
});

export default theme;
