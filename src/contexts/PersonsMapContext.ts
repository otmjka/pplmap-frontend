/* eslint-disable @typescript-eslint/indent */
import { createContext } from 'react';
import { PersonUIData } from '../types/Person';

const PersonsMapContext = createContext<{
  personsList: Array<PersonUIData>;
  selectedPerson?: PersonUIData;
  setSelectedPerson: (persondId: string) => void;
}>({
  personsList: [],
  selectedPerson: undefined,
  setSelectedPerson: (persondId: string) => {},
});

export default PersonsMapContext;
