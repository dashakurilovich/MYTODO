import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todolistsReducer } from './state/todolists-reducers';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducers';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {


    let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodoListReducer] = useReducer(todolistsReducer, [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: "book", isDone: true },
            { id: v1(), title: "mobile phone", isDone: false },
            { id: v1(), title: "jewerly", isDone: true },
        ]
    })
    function removeTask(id: string, todoListId: string) {

        const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todoListId: string) {

        const action = addTaskAC(title, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {

        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatchToTasksReducer(action)
    }
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {

        const action = changeTaskTitleAC(id, newTitle, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {

        const action = changeTodoListFilterAC(value, todoListId)
        dispatchToTodoListReducer(action)
    }

    function removeTodoList(todoListId: string) {

        const action = removeTodoListAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodoListReducer(action)
    }

    function changeTodoListTitle(id: string, newTitle: string) {

        const action = changeTodoListTitleAC(id, newTitle)
        dispatchToTodoListReducer(action)
    }

    function addTodoList(title: string) {

        const action = addTodoListAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListReducer(action)
    }

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
                                        removeTodolist={removeTodoList}
                                        changeTodolistTitle={changeTodoListTitle}
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

export default AppWithReducers;
