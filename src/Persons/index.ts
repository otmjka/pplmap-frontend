import React from 'react';
import { AddPersonFormData } from '../types/Person';
import { CoordsXY } from '../types/Coords';
import addPerson from './addPerson';
import changePersonPosition from './changePersonPosition';

export const PersonService = React.createContext({
  changePersonPosition: async (personId: string, value: CoordsXY) =>
    Promise.resolve(),
  addPerson: async (person: AddPersonFormData) => Promise.resolve(),
});

export const personService = {
  changePersonPosition: async (personId: string, value: CoordsXY) => {
    await changePersonPosition({ personId, offset: value });
  },
  addPerson: async (person: AddPersonFormData) => {
    await addPerson({ personData: person });
  },
};
