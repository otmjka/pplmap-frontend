import React, { useEffect, useState } from 'react';
import { load } from 'recaptcha-v3';

import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import Layout from '../../Layout/Layout';
import SimpleModal from '../../SimpleModal';
import AddPersonForm from '../../AddPersonForm';

import PersonsMap from '../../PersonsMap/PersonsMapContainer';
import addPerson from '../../../Persons/addPerson';
import { AddPersonFormData } from '../../../types/Person';

const AddButtonWrapper = styled(Box)({
  position: 'absolute',
  zIndex: 100,
  top: '40px',
  left: 0,
});

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const handleAddPerson = async (values: AddPersonFormData) => {
    await addPerson({ personData: values });
    setOpen(false);
  };

  // useEffect(() => {
  //   (async () => {
  //     const recaptcha = await load('6LfRRFkaAAAAAOpuxwDp8SsbzpJT4HmlQQYPjH_V');
  //     const token = await recaptcha.execute(
  //       '6LfRRFkaAAAAAOpuxwDp8SsbzpJT4HmlQQYPjH_V',
  //     );
  //     console.log(token);
  //   })();
  // }, []);

  return (
    <Layout>
      <AddButtonWrapper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(!open)}
        >
          Add a Person
        </Button>
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
