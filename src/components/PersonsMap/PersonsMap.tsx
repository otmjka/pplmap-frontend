import React, { useContext } from 'react';

import Box from '@material-ui/core/Box';

import useStyles from './useStyles';
import MoveContainer from '../MoveContainer';
import MapPerson from '../MapPerson/MapPerson';
import { PersonUIData } from '../../types/Person';
import { PersonService } from '../../Persons';
import { CoordsXY } from '../../types/Coords';
import PersonsMapContext from '../../contexts/PersonsMapContext';

const PersonsMap = () => {
  const styles = useStyles();

  const personService = useContext(PersonService);

  const handleItemPositionChange = (personId: string) => async ({
    offset,
  }: {
    offset: CoordsXY;
  }) => {
    await personService.changePersonPosition(personId, offset);
  };
  const { personsList, setSelectedPerson } = useContext(PersonsMapContext);
  const handleSelectPerson = (personId: string) => () => {
    setSelectedPerson(personId);
  };

  return (
    <Box className={styles.root}>
      <div className="wideScreenContainer">
        {personsList.map((person: PersonUIData) => (
          <MoveContainer
            name={person.person_name}
            key={person.id}
            offsetX={person.offsetX || 0}
            offsetY={person.offsetY || 0}
            onChange={handleItemPositionChange(person.id)}
            onClick={handleSelectPerson(person.id)}
          >
            <MapPerson person={person} />
          </MoveContainer>
        ))}
      </div>
    </Box>
  );
};

export default PersonsMap;
