import { createContext, useContext } from 'react';

type FullState = {
  isUserAuthicated: boolean;
  user?: { uid: string; displayName: string | null };
  loading: boolean;
} & { logout: () => void };

export const authContext = createContext<FullState>({
  isUserAuthicated: false,
  user: undefined,
  loading: true,
  logout: () => {},
});

export function useAuth() {
  return useContext(authContext);
}
