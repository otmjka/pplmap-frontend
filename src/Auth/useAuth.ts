import { createContext, useContext } from 'react';
import { AppUser } from '../types/User';

type FullState = {
  isUserAuthicated: boolean;
  user: AppUser | null;
  loading: boolean;
} & { logout: () => void };

export const authContext = createContext<FullState>({
  isUserAuthicated: false,
  user: null,
  loading: true,
  logout: () => {},
});

export function useAuth() {
  return useContext(authContext);
}
