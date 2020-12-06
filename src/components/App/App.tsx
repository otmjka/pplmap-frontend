/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { format } from 'date-fns';

import { styled } from '@material-ui/core/styles';

import './App.css';
import { PersonMatrix } from '../PersonMatrix';
import SimpleModal from '../SimpleModal';

const AddButtonWrapper = styled(Box)({
  position: 'absolute',
  zIndex: 100,
});

const App = () => {
  interface PersonUIData {
    birthday: string; // should be date
    id: string;
    person_name: string;
  }
  const [persons, setPersons] = useState<Array<PersonUIData>>([]);
  useEffect(() => {
    (async () => {
      try {
        interface PersonData {
          birthday: string;
          id: string;
          person_name: string;
        }
        interface PersonsRespons {
          data: Array<PersonData>;
        }
        const response = await axios.get<Array<PersonData>>(
          'https://agile-earth-99949.herokuapp.com/persons',
        );
        console.log(response);
        const personsWithCorrectDate = response.data.map((rawPerson) => {
          const birsthdayDate = new Date(rawPerson.birthday);

          return {
            ...rawPerson,
            birthday: format(birsthdayDate, 'dd.MM.yyyy'),
          };
        });
        setPersons(personsWithCorrectDate);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <AddButtonWrapper>
        {/* <Button variant="contained">Add Person</Button> */}
        <SimpleModal />
      </AddButtonWrapper>
      <div className="wideScreenContainer">
        {persons.map((person: { birthday: string; id: string }) => (
          <PersonMatrix key={person.id} birthday={person.birthday} />
        ))}
      </div>
    </div>
  );
};

export default App;
