import tasks from '../data/Tasks.json';
import { useState, useEffect } from 'react';
import './Task.css';

exportfunction CreateFullTasks(id) {
    const [task, newTask] = useState({
        id: tasks.length,
        name:"",
        finished:"",
        deadline:"",
        desc:""
    })

    const updateValue = (e) => {
        newTask(previousState => {
          return { ...previousState, e }
        });
    }

    let editTask = tasks[id];

    function newSub(){
        {updateValue(editTask.subtask[editTask.subtask.length] = "")}
    }

    function printSub(){
        return(editTask.subtask.map (subTask => (
            <li key={subTask.id}
            onChange={(e) => updateValue(editTask.subtask[editTask.subtask.id] = e.target.value)}
            >
            <textarea>{subTask.name}</textarea></li>
        )))
    }
    return(
    <>
                <div className='CertainTaskTop'>
                    <textarea id="name" maxLength="60" 
                    value = {editTask.name}
                    onChange={(e) => updateValue(editTask.name = e.target.value)} />
                </div>
                <div className='CertainTaskInfo'>
                    <div className='DeadlineAndPriority'>
                    <h1>Until day:&emsp;
                        <input type="date" 
                        value = {editTask.deadline} 
                        onChange={(e) => updateValue(editTask.deadline = e.target.value)} />
                    </h1>
                    <br />
                    <h1>Priority:&emsp;
                        <input type="number" max={5} min={0} 
                        value = {editTask.priority} 
                        onChange={(e) => updateValue(editTask.priority = e.target.value)} />
                        </h1>
                    <textarea id="desc" placeholder="Describe task..." maxLength="100" 
                    value = {editTask.desc} 
                    onChange={(e) => updateValue(editTask.desc = e.target.value)} />
                    </div>
                </div>
                <div className='subTasks'>
            <ul>
                {printSub()}
            </ul>
        </div>
        <button onClick={newSub}>Створити новий таск</button>
    </>)
}