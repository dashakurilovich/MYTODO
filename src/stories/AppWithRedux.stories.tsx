import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import AppWithRedux from '../AppWithReduX';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { ReduxStoreProviderDecorator } from './ReduxStoriesProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: ReduxStoreProviderDecorator,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

const changeCallback = action("Value change")

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />
}

