import tasks from '../data/Tasks.json';
import { useState } from 'react';
import './Task.css';


//Paste image stuff here later
function IsTaskFinished(a) {
    if (a.finished){
        return (<h1>+ </h1>);
}
return (<h1>- </h1>);
}

function dateConvector(a){
    return new Date(a.deadline).toLocaleDateString()
}

function printFullTasks(id) {
    let task = tasks[id];
    return(
    <>
            <div className='CertainTaskTop'>
                <h1>{IsTaskFinished(task)} {task.name}</h1>
            </div>
            <div className='CertainTaskInfo'>
                <div className='DeadlineAndPriority'>
                <h1>Until day: {dateConvector(task)}</h1>
                <h1>Priority: {task.priority}</h1>
                <p>{task.desc}</p>
                </div>
                <p>dadsasd</p>
            </div>
    </>)
}

function CreateFullTasks() {
    return(
    <>
            <div className='CertainTaskTop'>
                <textarea id="name" maxLength="60"></textarea>
            </div>
            <div className='CertainTaskInfo'>
                <div className='DeadlineAndPriority'>
                <h1>Until day:&emsp;<input type="date"></input></h1>
                <br />
                <h1>Priority:&emsp;<input type="number" max={5} min={0}></input></h1>
                <textarea id="desc" placeholder="Describe task..." maxLength="100"></textarea>
                </div>
            </div>
    </>)
}

function printTasks() {
    const [fullTask, setFullTask] = useState(0);

    
    return (
    <>
        <div className='ViewDetailed'>
            <div className='tasksAll'>
                <div className='Top'>
                    <h1>Today</h1>
                </div>
                <div className='Bottom'>
                {tasks.map(item => (
                    <div key={item.id} className={item.id===fullTask ? 'choosenFullTask' : 'v'} onClick={()=>setFullTask(item.id)}>
                        <div className='task'>
                            <div className='taskTop'>
                            {IsTaskFinished(item)}
                            <h1>{item.name}   - {item.subtask.length!==0 && <a>0/{item.subtask.length}</a>}</h1>
                            </div>
                            <h2>{item.desc}</h2>

                            {/*
                            *<h2>{dateConvector(item)}</h2>
                            {item.subtask.length!==0 && printSubTasks(item.subtask)}*/}
                            </div>
                    </div>
                    
                ))}
            </div>
            </div>
            
            <div className='CertainTask'>
            {//{printFullTasks(fullTask)} 
            }
            {CreateFullTasks()}
            </div>
        </div>
    </>)
}

function printSubTasks(subtasks) {
    return(
        <>
        <div className='subTasks'>
            {subtasks.map(sub => (
                <div key={sub.id}>
                    <h3>{sub.name}</h3>
                </div>
            ))}
        </div>
        </>
    )
}
/* eslint-disable no-unused-vars */
export default function ShowTask() {
    
    var taskFinished = false;
    var taskSubs = 0;
    var taskDescription;
    return(
    <>
    {printTasks()}
    </>
    )
}