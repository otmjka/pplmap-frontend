import * as React from 'react';
import { Formik } from 'formik';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import H2 from '../H2';

const formValidate = (values: {
  name: string;
  birthday: string;
}): { name?: string; birthday?: string } => {
  const errors: { name?: string; birthday?: string } = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

const AddPersonForm = () => {
  return (
    <Box>
      <H2>Add a Person</H2>
      <Formik
        initialValues={{ name: '', birthday: '' }}
        validate={formValidate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Box mb={1}>
                <TextField
                  label="name"
                  type="name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  helperText={!!errors.name && 'required'}
                  error={!!errors.name}
                  onChange={handleChange}
                  value={values.name}
                />
              </Box>
              <Box mb={1}>
                <TextField
                  name="birthday"
                  onChange={handleChange}
                  value={values.birthday}
                  variant="outlined"
                />
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    alert('!');
                  }}
                >
                  Close
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Add
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPersonForm;
