import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todolistsReducer } from './state/todolists-reducers';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log("AppWithRedux is called");


    let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistId1 = v1();
    let todolistId2 = v1();

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, todoListId: string) => {

        const action = removeTaskAC(id, todoListId);
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {

        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {

        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string) => {

        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {

        const action = changeTodoListFilterAC(value, todoListId)
        dispatch(action)
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {

        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {

        const action = changeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {

        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        TodoList
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {

                            let allTasksForTodoList = tasks[tl.id];
                            let tasksForTodolist = allTasksForTodoList;

                            return <Grid item>
                                <Paper style={{ padding: "13px" }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div >
    );
}

export default AppWithRedux;
