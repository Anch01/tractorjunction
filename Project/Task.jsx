import React, { useState } from 'react';

const Task = () => {
    const [task, setTask] = useState({
        name: '',
        stage: 'ToDo',
    });

    const [tasks, setTasks] = useState([]);

    const handleInputChange = (e) => {
        setTask({
            ...task,
            name: e.target.value,
        });
    };

    const handleNext = () => {
        if (task.stage === 'ToDo') {
            setTask({
                ...task,
                stage: 'InProgress',
            });
        } else if (task.stage === 'InProgress') {
            setTask({
                ...task,
                stage: 'Done',
            });
        }
    };

    const handlePrevious = () => {
        if (task.stage === 'InProgress') {
            setTask({
                ...task,
                stage: 'ToDo',
            });
        } else if (task.stage === 'Done') {
            setTask({
                ...task,
                stage: 'InProgress',
            });
        }
    };

    const addTask = () => {
        if (task.name.trim() !== '') {
            setTasks([...tasks, task]);
            setTask({
                name: '',
                stage: 'ToDo',
            });
        }
    };

    const isNextDisabled = task.stage === 'Done';
    const isPreviousDisabled = task.stage === 'ToDo';

    let taskColor = '';
    if (task.stage === 'ToDo') {
        taskColor = 'red';
    } else if (task.stage === 'InProgress') {
        taskColor = 'yellow';
    } else if (task.stage === 'Done') {
        taskColor = 'green';
    }

    return (
        <div>
            <h2>Task Stage: {task.stage}</h2>
            <input
                type="text"
                value={task.name}
                onChange={handleInputChange}
                style={{ borderColor: taskColor }}
            />

            <button onClick={handlePrevious} disabled={isPreviousDisabled}>
                Previous
            </button>
            <button onClick={handleNext} disabled={isNextDisabled}>
                Next
            </button>

            <button onClick={addTask}>Add Task</button>

            <div>
                {tasks.map((t, index) => (
                    <h1
                        key={index}
                        style={{
                            borderColor:
                                t.stage === 'ToDo' ? 'red' : t.stage === 'InProgress' ? 'yellow' : 'green',
                        }}
                    >
                        {t.name} - Stage: {t.stage}
                    </h1>
                ))}
            </div>
        </div>
    );
};

export default Task;
