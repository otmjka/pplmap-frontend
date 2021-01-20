import React, { useState } from 'react';
import { parse } from 'date-fns';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import SimpleModal from '../SimpleModal';
import AddPersonForm from '../AddPersonForm';
import { AddPersonFormData, Person, PersonUIData } from '../../types/Person';
import usePersons from './usePersons';
import MoveContainer from '../MoveContainer';
import MapPerson from '../MapPerson/MapPerson';
import EnvLabel from '../EnvLabel';

const AddButtonWrapper = styled(Box)({
  position: 'absolute',
  zIndex: 100,
});

const PersonsMap = () => {
  const [selectedPerson, selectPerson] = useState<PersonUIData>();
  const [personsList, addPerson, removePerson] = usePersons(); // fetch from server
  const [open, setOpen] = useState(false);

  const handleAddPerson = async (personFormData: AddPersonFormData) => {
    const response = await addPerson(personFormData);
    console.log(response);
    setOpen(false);
  };

  const handleRemovePerson = async () => {
    console.log('start', selectedPerson);
    if (!selectedPerson) {
      console.log('no selected person');
      return;
    }
    await removePerson(selectedPerson);
    console.log(selectedPerson);
  };

  return (
    <div>
      <AddButtonWrapper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(!open)}
        >
          Add a Person
        </Button>
        {selectedPerson && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemovePerson}
          >
            {`Delete [${selectedPerson.person_name}]`}
          </Button>
        )}
      </AddButtonWrapper>
      <EnvLabel />

      <SimpleModal open={open} setOpen={setOpen}>
        <AddPersonForm
          onClose={() => setOpen(false)}
          onSubmit={handleAddPerson}
        />
      </SimpleModal>

      <div className="wideScreenContainer">
        {personsList.map((person: PersonUIData) => (
          <MoveContainer key={person.id}>
            <MapPerson person={person} onPersonSelect={selectPerson} />
          </MoveContainer>
        ))}
      </div>
    </div>
  );
};

export default PersonsMap;
