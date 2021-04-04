import { AppUser } from './User';

export type AuthState = {
  isUserAuthicated: boolean;
  user: AppUser;
  loading: boolean;
};
