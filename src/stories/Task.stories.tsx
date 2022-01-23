import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Task } from '../Task';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Task>;

const callback = action("Button 'add' was pressed inside the form")
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task remove")

export const TaskBaseExample = () => {
  return <>
    <Task
      task={{ id: '1', isDone: true, title: 'CSS' }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
      todolistId={"todoListId1"}
    />
    <Task
      task={{ id: '2', isDone: false, title: 'JS' }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
      todolistId={"todoListId2"}
    />
  </>
}


