import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from './LoginForm';

const loginUser = async (email: string, password: string) =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.log('handle loginUser Action', email, password);
    resolve({ email, password });
  });

// function mapStateToProps(state) {
//   return {
//     isLoggingIn: state.auth.isLoggingIn,
//     loginError: state.auth.loginError,
//     isAuthenticated: state.auth.isAuthenticated,
//   };
// }

const LoginFormContainer = () => {
  // const dispatch = useDispatch();
  const { isLoggingIn, loginError } = { isLoggingIn: false, loginError: '!!!' }; // useSelector(mapStateToProps);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('TODO');

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      await loginUser(email, password);
      return history.push('/groups');
    } catch (e) {
      setSubmitError(e.message);
    }
    setLoading(false);
    return null;
  };
  // TODO: if logged in use Redirect to '/'
  return (
    <LoginForm
      loading={loading}
      submitError={submitError}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginFormContainer;
