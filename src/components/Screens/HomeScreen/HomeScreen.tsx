import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';

import Layout from '../../Layout/Layout';
import SimpleModal from '../../SimpleModal';
import AddPersonForm from '../../AddPersonForm';

import PersonsMap from '../../PersonsMap/PersonsMap';
import addPerson from '../../../Persons/addPerson';
import { AddPersonFormData, PersonUIData } from '../../../types/Person';
import usePersons from '../../PersonsMap/usePersons';
import PersonsMapContext from '../../../contexts/PersonsMapContext';
import AddButtonWrapper from './AddButtonWrapper';

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const handleAddPerson = async (values: AddPersonFormData) => {
    await addPerson({ personData: values });
    setOpen(false);
  };

  const [selectedPerson, selectPerson] = useState<PersonUIData | undefined>();
  const [personsList] = usePersons(); // fetch from server

  const value = {
    personsList,
    selectedPerson,
    setSelectedPerson: (personId: string) => {
      // eslint-disable-next-line no-console
      console.log({ personId });
      selectPerson(personsList.find((p) => p.id === personId));
    },
  };

  return (
    <PersonsMapContext.Provider value={value}>
      <Layout>
        <AddButtonWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(!open)}
          >
            Add a Person
          </Button>
          {selectedPerson && <div>{selectedPerson.person_name}</div>}
        </AddButtonWrapper>
        <SimpleModal open={open} setOpen={setOpen}>
          <AddPersonForm
            onClose={() => setOpen(false)}
            onSubmit={handleAddPerson}
          />
        </SimpleModal>
        <Box
          left="10px"
          top="80px"
          position="absolute"
          width="calc(100% - 20px)"
          bottom="10px"
          right="10px"
        >
          <PersonsMap />
        </Box>
      </Layout>
    </PersonsMapContext.Provider>
  );
};
//
/*
{selectedPerson && (
          <Button variant="contained" color="secondary" onClick={removePerson}>
            {`Delete [${selectedPerson.person_name}]`}
          </Button>
        )} 
        <EnvLabel />

        <SimpleModal open={open} setOpen={setOpen}>
          <AddPersonForm onClose={() => setOpen(false)} onSubmit={addPerson} />
        </SimpleModal> 
        addPerson={handleAddPerson}
      removePerson={handleRemovePerson}
        */

export default HomeScreen;
