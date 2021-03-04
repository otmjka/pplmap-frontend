import React, { useState } from 'react';

import { AddPersonFormData, PersonUIData } from '../../types/Person';
import PersonsMap from './PersonsMap';
import usePersons from './usePersons';

interface PersonMapContainerProps {}

const PersonsMapContainer = ({}: PersonMapContainerProps) => {
  const [selectedPerson, selectPerson] = useState<PersonUIData | undefined>();
  const [personsList] = usePersons(); // fetch from server

  // const handleChangePersonPosition = async ({person, offsetX, offsetY}) => {
  //   await changePersonPosition({personId: person.id, offsetX, offsetY})
  // }
  // onChangePersonPosition={handleChangePersonPosition}
  return (
    <PersonsMap
      selectedPerson={selectedPerson}
      onSelectPerson={selectPerson}
      personsList={personsList}
    />
  );
};

export default PersonsMapContainer;
