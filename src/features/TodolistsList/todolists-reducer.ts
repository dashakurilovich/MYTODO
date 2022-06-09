import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { RequestStatusType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { fetchTasksTC } from './tasks-reducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleServerNetworkError } from '../../utils/error-utils'


export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        return { todolists: res.data }
    }
    catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (param: { todolistId: string }, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({ id: param.todolistId, status: 'loading' }))
    const res = await todolistsAPI.deleteTodolist(param.todolistId)
    //скажем глобально приложению, что асинхронная операция завершена
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { id: param.todolistId }
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    return { todolist: res.data.data.item }

})
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, { dispatch }) => {
    const res = await todolistsAPI.updateTodolist(param.id, param.title)
    return { id: param.id, title: param.title }
})


const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        clearTodosDataAC: (state, action: PayloadAction<{}>) => {
            return []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id != action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const { changeTodolistFilterAC, changeTodolistEntityStatusAC, clearTodosDataAC } = slice.actions

/* export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? { ...tl, entityStatus: action.status } : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        case 'CLEAR-DATA':
            return []
        default:
            return state
    }
} */

// actions
/* export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: 'SET-TODOLISTS', todolists } as const)

export const clearTodosDataAC = () => ({ type: 'CLEAR-DATA' } as const) */


// thunks


// types
export type ClearDataActionType = ReturnType<typeof clearTodosDataAC>;



export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<SetAppStatusActionType>
