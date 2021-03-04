import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

import useStyles from './useStyles';
import MoveContainer from '../MoveContainer';
import MapPerson from '../MapPerson/MapPerson';
import { PersonUIData } from '../../types/Person';

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

  const [debugInfo, setDebugInfo] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });
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
          <MoveContainer key={person.id} onChange={setDebugInfo}>
            <MapPerson person={person} onPersonSelect={onSelectPerson} />
          </MoveContainer>
        ))}
      </div>
    </Box>
  );
};

export default PersonsMap;
