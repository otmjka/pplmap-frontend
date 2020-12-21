import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { PersonMatrix } from '../PersonMatrix';
import { PersonUIData } from '../../types/Person';

const MapPerson = ({ person }: { person: PersonUIData }) => {
  return (
    <Paper square>
      <Box display="flex" p={1}>
        <Box mr={1}>
          <Typography>{person.person_name}</Typography>
        </Box>
        <Box>
          <Typography>{person.birthday}</Typography>
        </Box>
      </Box>
      <PersonMatrix birthday={person.birthday} />
    </Paper>
  );
};

export default MapPerson;
