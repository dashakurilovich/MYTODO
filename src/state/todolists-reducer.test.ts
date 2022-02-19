import React from 'react';
import { v1 } from 'uuid';
import { setTodolistsAC, TodolistDomainType, todolistsReducer } from './todolists-reducer';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0 }
    ]
})

test('todolists shoulb be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)

})