import { v1 } from "uuid";
import { FilterValuesType, TasksStateType, TodoListType } from "../App";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId:string
}

export type Action2Type = {
    type: '2',
    title: string
}


export type ActionsType = Action1Type | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case '1': {
            return { ...state }
        }
        case '2': {
            return { ...state }
        }
        default:
            throw new Error("I don't understand this type")

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId }
}
export const action2AC = (title: string): Action2Type => {
    return { type: '2', title: title }
}
