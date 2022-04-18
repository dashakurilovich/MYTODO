import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { authAPI, LoginParamsType } from '../../../api/todolists-api'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { ClearDataActionType, clearTodosDataAC } from '../todolists-reducer'


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions

// actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({ value: true }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({ value: false }))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
                dispatch(clearTodosDataAC({}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType | ClearDataActionType>
