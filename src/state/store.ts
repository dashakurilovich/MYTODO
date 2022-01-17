import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducers";
import { todolistsReducer } from "./todolists-reducers";


const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

/* type AppRootState = {
    todolists: Array<TodoListType>
    tasks: TasksStateType
} */

export type AppRootState = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers);

//@ts-ignore
window.store = store