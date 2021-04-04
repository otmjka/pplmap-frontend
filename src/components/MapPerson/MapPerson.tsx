import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { PersonMatrix } from '../PersonMatrix';
import { PersonUIData } from '../../types/Person';

interface MapPersonProps {
  person: PersonUIData;
}
const MapPerson = ({ person }: MapPersonProps) => {
  return (
    <div>
      <Box display="flex" p={1}>
        <Box mr={1}>
          <Typography>{person.person_name}</Typography>
        </Box>
        <Box>
          <Typography>{person.birthday}</Typography>
        </Box>
      </Box>
      <PersonMatrix birthday={person.birthday} />
    </div>
  );
};

export default MapPerson;
