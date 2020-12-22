import * as React from 'react';
import { Formik } from 'formik';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import H2 from '../H2';
import { AddPersonFormData } from '../../types/Person';

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
const AddPersonForm = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (person: AddPersonFormData) => Promise<void>;
}) => {
  return (
    <Box>
      <H2>Add a Person</H2>
      <Formik
        initialValues={{ name: '', birthday: '' }}
        validate={formValidate}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
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
                  name="name"
                  label="name"
                  type="name"
                  variant="outlined"
                  fullWidth
                  helperText={!!errors.name && 'required'}
                  error={!!errors.name}
                  onChange={handleChange}
                  value={values.name}
                />
              </Box>
              <Box mb={1}>
                <TextField
                  name="birthday"
                  label="birthday"
                  type="birthday"
                  placeholder="dd.mm.yyyy 17.05.2010"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={values.birthday}
                />
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    onClose();
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
