import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string, todoListId: string) {
        //достанем нужный массив по todoListId 
        let todolistsTasks = tasks[todoListId]
        //перезапишем в этом объекте массив для нужного тудулиста отфильтрованнам массивам:
        tasks[todoListId] = todolistsTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
        setTasks({ ...tasks })
    }

    function addTask(title: string, todoListId: string) {
        let task = { id: v1(), title: title, isDone: false };

        //достанем нужный масив по todolistId 
        let todolistsTasks = tasks[todoListId]
        //перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску
        tasks[todoListId] = [task, ...todolistsTasks];
        // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
        setTasks({ ...tasks });
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {

        //достанем нужный массив по todoListId 
        let todolistsTasks = tasks[todoListId]
        //найдём нужную таску:
        let task = todolistsTasks.find(t => t.id === id);
        //изменим таску если она нашлась
        if (task) {
            task.isDone = isDone;
        }
        // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
        setTasks({ ...tasks });
    }
    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {

        //достанем нужный массив по todoListId 
        let todolistsTasks = tasks[todoListId]
        //найдём нужную таску:
        let task = todolistsTasks.find(t => t.id === id);
        //изменим таску если она нашлась
        if (task) {
            task.title = newTitle;
        }
        // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
        setTasks({ ...tasks });
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
    ])

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todolists.filter(tl => tl.id !== todoListId)
        setTodolists(filteredTodoList)
        delete tasks[todoListId]
        setTasks(tasks)
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }


    let [tasks, setTasks] = useState<TasksStateType>({
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

    function addTodoList(title: string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
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

export default App;
