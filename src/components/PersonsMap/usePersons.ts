import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';

import {
  AddPersonFormData,
  Person,
  PersonData,
  PersonUIData,
} from '../../types/Person';
import config from '../../config';

const usePersons = (): [
  Array<PersonUIData>,
  (person: AddPersonFormData) => Promise<void>,
  (person: PersonUIData) => Promise<void>,
] => {
  const [persons, setPersons] = useState<Array<PersonUIData>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<Array<PersonData>>(
          `${config.api.baseUrl}/persons`,
        );

        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line
        console.log(error);
      }
    })();
  }, []);

  const addPerson = async (person: AddPersonFormData) => {
    await axios.post(`${config.api.baseUrl}/persons/add`, {
      name: person.name,
      birthday: parse(person.birthday, 'dd.MM.yyyy', new Date()),
    });
  };

  const removePerson = async ({ id }: PersonUIData) => {
    await axios.post(`${config.api.baseUrl}/persons/delete/${id}`);
  };

  return [persons, addPerson, removePerson];
};

export default usePersons;
