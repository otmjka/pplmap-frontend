import { createContext, useContext } from 'react';
import { UseAppLoadingState } from '../components/App/useAppLoading';

export const authContext = createContext<UseAppLoadingState>({
  isUserAuthicated: false,
  user: null,
  loading: true,
  logout: () => {},
});

export function useAuth() {
  return useContext(authContext);
}
