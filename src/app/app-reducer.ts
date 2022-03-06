
export type RequestStatusType   = 'idle' | 'loading' | 'succeeded' | 'failed'

// status === 'loading' -  крутилку показываем
// status === idle' | 'succeeded' | 'failed'' -  крутилку прячем

const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const 
}

export type SetAppStatusActionType = ReturnType <typeof setAppStatusAC >;
type ActionsType = SetAppStatusActionType