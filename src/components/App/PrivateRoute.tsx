import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../Auth/useAuth';

export const PrivateRoute = ({
  children,
  path,
  ...rest
}: {
  children: React.ReactNode;
  path: string;
}) => {
  const auth = useAuth();

  // eslint-disable-next-line no-console
  console.log('auth', auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isUserAuthicated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
