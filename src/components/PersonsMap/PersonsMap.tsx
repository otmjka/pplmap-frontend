import React, { useState } from 'react';
import { parse } from 'date-fns';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import SimpleModal from '../SimpleModal';
import AddPersonForm from '../AddPersonForm';
import { Person, PersonUIData } from '../../types/Person';
import usePersons from './usePersons';
import MoveContainer from '../MoveContainer';
import MapPerson from '../MapPerson/MapPerson';
import EnvLabel from '../EnvLabel';

const AddButtonWrapper = styled(Box)({
  position: 'absolute',
  zIndex: 100,
});

const PersonsMap = () => {
  const [personsList, addPerson] = usePersons(); // fetch from server
  type LocState = (Person & { custom: string | Date }) | null;
  const [formValues, setFormValues] = useState<LocState>(null);
  const [open, setOpen] = useState(false);

  const handleAddPerson = async (person: Person) => {
    // eslint-disable-next-line no-console
    console.log(person);
    setFormValues({
      ...person,
      custom: parse(person.birthday, 'dd.MM.yyyy', new Date()),
    });
    await addPerson(person);
  };

  return (
    <div>
      <AddButtonWrapper>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(!open)}
        >
          Add a Person
        </Button>
      </AddButtonWrapper>
      <EnvLabel />

      <SimpleModal open={open} setOpen={setOpen}>
        <AddPersonForm
          onClose={() => setOpen(false)}
          onSubmit={handleAddPerson}
        />
        {formValues && <div>{JSON.stringify(formValues, null, 2)}</div>}
      </SimpleModal>

      <div className="wideScreenContainer">
        {personsList.map((person: PersonUIData) => (
          <MoveContainer key={person.id}>
            <MapPerson person={person} />
          </MoveContainer>
        ))}
      </div>
    </div>
  );
};

export default PersonsMap;
