import React from 'react';
// import { FormattedMessage } from 'react-intl';

import Grid from '@material-ui/core/Grid';

import H2 from '../../H2';
import Layout from '../../Layout';
import LoginForm from './LoginFormContainer';

export default function LoginScreen() {
  return (
    <>
      <Layout>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <H2>title</H2>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
            <LoginForm />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
