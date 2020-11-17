import * as React from 'react';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './App.css';
import { PersonMatrix } from '../PersonMatrix';

const AddButtonWrapper = styled(Box)({
  position: 'absolute',
  zIndex: 100,
});

const App = () => {
  return (
    <div>
      <AddButtonWrapper>
        {/* <Button variant="contained">Add Person</Button> */}
        <SimpleModal />
      </AddButtonWrapper>
      <div className="wideScreenContainer">
        <PersonMatrix birthday="10.09.1985" />
        <PersonMatrix birthday="23.06.1987" />
      </div>
    </div>
  );
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h5">Add a Person</Typography>

      <form>
        <Box mt={2}>
          <Box mb={1}>
            <TextField id="name" label="name" variant="outlined" />
          </Box>
          <Box>
            <TextField id="birthday" label="birthday" variant="outlined" />
          </Box>
        </Box>
      </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default App;
