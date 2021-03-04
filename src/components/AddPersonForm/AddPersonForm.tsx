import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import H2 from '../H2';
import { AddPersonFormData } from '../../types/Person';
import FormInput from '../FormInput';

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
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <Box>
      <H2>Add a Person</H2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={2}>
            <Box mb={1}>
              <FormInput label="name" name="name" />
            </Box>
            <Box mb={1}>
              <FormInput
                label="birthday"
                name="birthday"
                placeholder="dd.mm.yyyy 17.05.2010"
              />
            </Box>
            <Box display="flex">
              <Box flexGrow={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Close
                </Button>
              </Box>
              <Box>
                <Button variant="outlined" type="submit">
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddPersonForm;
