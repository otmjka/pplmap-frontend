import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line
import { Story, Meta } from '@storybook/react/types-6-0';

// We create a “template” of how args map to rendering
import AddPersonForm from './AddPersonForm';

export default {
  title: 'AddPersonForm',
  component: AddPersonForm,
} as Meta;

const Template = () => <AddPersonForm />;

// Each story then reuses that template
export const Primary = Template.bind({});

// Primary.args = {
//   primary: true,
//   label: 'Button',
// };
