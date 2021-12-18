
type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = { ...state }; ///делаем копию
            newState.age = state.age + 1 //у копии имеем право менять свойство
            return newState //возвращаем копию
        case 'INCREMENT-CHILDREN-COUNT':
            //а можно без создания переменых промежучтоных
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error("I don't understand this type")

    }
}