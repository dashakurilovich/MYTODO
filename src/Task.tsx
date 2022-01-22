import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";

export type TasksPropsType = {
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TasksPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.changeTaskTitle, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}
            color={"primary"} />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})