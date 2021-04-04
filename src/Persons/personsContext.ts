import React, { createContext } from 'react';
import { Person } from '../types/Person';

export const personsContext = createContext({
  addPerson: async (person: Person) => {},
});
