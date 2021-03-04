import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';

interface FormInputProps {
  name: string;
  label: string;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
}

const FormInput = (props: FormInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      as={TextField}
      control={control}
      defaultValue=""
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default FormInput;
