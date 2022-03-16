import { Dispatch } from "redux"
import { AppActionsType, setAppErrorAC, setAppStatusAC } from "../app/app-reducer"

export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = (dispatch: Dispatch<AppActionsType>, data: any) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Unknown error  '))
    }

    dispatch(setAppStatusAC('failed'))
}