import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// We create a “template” of how args map to rendering
import NumberBox from './NumberBox';

export default {
  title: 'NumberBox',
  component: NumberBox,
} as Meta;

const Template = () => (
  <div style={{ position: 'absolute', top: '0', left: '0', width: '300px' }}>
    <NumberBox>111</NumberBox>
  </div>
);

// Each story then reuses that template
export const Primary = Template.bind({});

// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// https://spin.atomicobject.com/2015/07/14/css-responsive-square/
