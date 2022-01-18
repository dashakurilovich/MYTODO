import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log("Todolist is called");


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), []);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), []);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), []);

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.id, props.changeTodoListTitle])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle} />
            <IconButton onClick={removeTodoList} >
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                props.tasks.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                />)
            }
        </div>
        <div>
            <Button className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}
                color={"default"}
                variant={"text"}
                size={"small"}
            >All</Button>
            <Button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}
                color={"primary"}
                variant={"text"}
                size={"small"}
            >Active</Button>
            <Button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}
                color={"secondary"}
                variant={"text"}
                size={"small"}
            >Completed</Button>
        </div>
    </div>
})

