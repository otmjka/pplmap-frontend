import React from 'react';
import changePersonPosition from './changePersonPosition';

export const PersonService = React.createContext({
  changePersonPosition: async (
    personId: string,
    value: { x: number; y: number },
  ) => Promise.resolve(),
});
