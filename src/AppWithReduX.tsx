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


    let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistId1 = v1();
    let todolistId2 = v1();

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function removeTask(id: string, todoListId: string) {

        const action = removeTaskAC(id, todoListId);
        dispatch(action)
    }

    function addTask(title: string, todoListId: string) {

        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {

        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {

        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {

        const action = changeTodoListFilterAC(value, todoListId)
        dispatch(action)
    }

    function removeTodoList(todoListId: string) {

        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {

        const action = changeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }

    const addTodoList = useCallback((title: string) => {

        const action = addTodoListAC(title)
        dispatch(action)
    }, [])

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

                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }
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
