import { createContext, useContext } from 'react';

const DebugContext = createContext({
  debug: false,
});
export const useDebug = () => useContext(DebugContext);
export default DebugContext;
