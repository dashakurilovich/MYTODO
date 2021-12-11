import React from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "React", isDone: false },
        { id: 3, title: "js", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Pushkin", isDone: false },
        { id: 2, title: "Kristi", isDone: true },
        { id: 3, title: "Rowling", isDone: true }
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1} />
            <Todolist title={"What to read"} tasks={tasks2} />
        </div>
    );
}

export default App;
