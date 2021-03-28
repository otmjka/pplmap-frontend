import React, { useContext, useState } from 'react';

import Box from '@material-ui/core/Box';

import useStyles from './useStyles';
import MoveContainer from '../MoveContainer';
import MapPerson from '../MapPerson/MapPerson';
import { PersonUIData } from '../../types/Person';
import { PersonService } from '../../Persons';
import changePersonPosition from '../../Persons/changePersonPosition';

interface PersonsMapProps {
  selectedPerson: PersonUIData | undefined;
  personsList: Array<PersonUIData>;

  onSelectPerson: (value: PersonUIData) => void;
}

const PersonsMap = ({
  selectedPerson,
  personsList,
  onSelectPerson,
}: PersonsMapProps) => {
  const styles = useStyles();

  const personService = useContext(PersonService);
  return (
    <Box className={styles.root}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        onMouseDown={() => {
          // eslint-disable-next-line
          console.log('onMOuseDown');
        }}
        className="wideScreenContainer"
      >
        {personsList.map((person: PersonUIData) => (
          <MoveContainer
            name={person.person_name}
            key={person.id}
            offsetX={person.offsetX || 0}
            offsetY={person.offsetY || 0}
            onChange={async ({
              offset,
            }: {
              offset: { x: number; y: number };
            }) => {
              await personService.changePersonPosition(person.id, offset);
              console.log({ offset, person });
            }}
          >
            <MapPerson person={person} onPersonSelect={onSelectPerson} />
          </MoveContainer>
        ))}
      </div>
    </Box>
  );
};

export default PersonsMap;
