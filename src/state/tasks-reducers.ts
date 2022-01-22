import { v1 } from "uuid";
import { FilterValuesType, TasksStateType, TodoListType } from "../App";
import { AddTodolistActionType, RemoveTodolistActiontype } from "./todolists-reducers";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todoListId: string
}


export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActiontype

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state };
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistsTasks = state[action.todoListId]
            state[action.todoListId] = todolistsTasks
                .map(t => t.id === action.taskId
                    ? { ...t, isDone: action.isDone }
                    : t);
            return { ...state }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistsTasks = state[action.todoListId]
            state[action.todoListId] = todolistsTasks
                .map(t => t.id === action.taskId
                    ? { ...t, title: action.title }
                    : t);
            return { ...state }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListId }
}
