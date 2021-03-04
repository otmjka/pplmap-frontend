import React from 'react';
import { useForm } from 'react-hook-form';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './firebaseui-styling.global.css';
import useStyles from './styles';

interface LoginFormProps {
  loading: boolean;
  submitError: Record<string, string> | string;
  onSubmit: (values: { email: string; password: string }) => void;
}

const signInOptions = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
];

export const uiLoginConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/groups',
  signInOptions,
};

const LoginForm = ({ loading, submitError, onSubmit }: LoginFormProps) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  return (
    <>
      <Card classes={{ root: classes.cardRoot }}>
        {/* <AuthCardHeader title={messages.formTitle} /> */}
        <Divider />
        <CardContent classes={{ root: classes.contentRoot }}>
          <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="emailPlaceholder"
              type="email"
              variant="outlined"
              fullWidth
              name="email"
              helperText={!!errors.email && 'fieldRequired'}
              error={!!errors.email}
              inputRef={register({ required: true })}
            />
            <TextField
              label="passwordPlaceholder"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              name="password"
              helperText={!!errors.password && 'fieldRequiredAndMin6'}
              error={!!errors.password}
              inputRef={register({ required: true })}
            />

            {submitError && <Box>{submitError}</Box>}

            <Button disabled={loading} fullWidth color="primary" type="submit">
              {!loading && 'signinLabel'}
              {loading && 'signinLabel'}
            </Button>
          </form>
          <StyledFirebaseAuth
            uiConfig={uiLoginConfig}
            firebaseAuth={firebase.auth()}
          />
        </CardContent>
      </Card>
      {/* <AuthFormBottom
        leftTo="/signup"
        leftLabel={messages.signupLink}
        rightTo="/forgot"
        rightLabel={messages.forgotLink}
      /> */}
    </>
  );
};

export default LoginForm;
