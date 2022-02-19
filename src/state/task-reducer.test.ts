import React from 'react';

import { tasksReducer } from './tasks-reducer';
import { setTodolistsAC } from './todolists-reducer';



test('empty arrays should be added when we set todoliosts', () => {
    const action = setTodolistsAC([
        { id: "1", title: "title 1", addedDate: '', order: 0 },
        { id: "2", title: "title 2", addedDate: '', order: 0 },
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBe([])
    expect(endState['2']).toBe([])
})
