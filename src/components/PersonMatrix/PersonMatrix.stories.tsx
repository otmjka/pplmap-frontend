import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// We create a “template” of how args map to rendering
import { PersonMatrix } from './PersonMatrix';

export default {
  title: 'PersonMatrix',
  component: PersonMatrix,
} as Meta;

const Template = () => <PersonMatrix birthday="10.09.1985" />;

// Each story then reuses that template
export const Primary = Template.bind({});

// Primary.args = {
//   primary: true,
//   label: 'Button',
// };
