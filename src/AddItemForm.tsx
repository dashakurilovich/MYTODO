import { Button, IconButton, TextField } from '@material-ui/core';
import { AddBox, AddCircleOutline } from '@material-ui/icons';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is called");

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }



    return (
        <div>
            <div>
                <TextField variant="standard"
                    error={!!error}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    label="Title"
                    helperText={error}
                />
                <IconButton color="primary" onClick={addTask}>
                    <AddCircleOutline />
                </IconButton>
            </div>
        </div>)

})