import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { EditableSpan } from '../EditableSpan';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableSpan>;

const changeCallback = action("Value change")

export const EditableSpanBaseExample = () => {
  return <EditableSpan value={"Start title"} onChange={changeCallback} />
}


