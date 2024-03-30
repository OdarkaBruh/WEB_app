import tasks from '../data/Tasks.json';
import { useState } from 'react';
import './Task.css';

function IsTaskFinished(a) {
    if (a.finished){ 
        return(<>
            <img className='task-icon' src="../../img/icons/check.svg" alt="Task is finished"/>
            </>)
    }
    return(<>
        <img className='task-icon' src="../../img/icons/cross.svg" alt="Task is unfinished"/>
    </>)
}

function dateConvector(a){
    return new Date(a.deadline).toLocaleDateString()
}

function printFullTasks(id) {
    let task = tasks[id];
    return(
    <>      
        <div className="print-full-task">
            <div className='print-full-task-TaskTop'>
                <h1><span className='print-task-icon'> {IsTaskFinished(task)} </span> {task.name}</h1>
            </div>
            <div className='CertainTaskInfo'>
                <div className='DeadlineAndPriority'>
                <h1>Until day: {dateConvector(task)}</h1>
                <h1>Priority: {task.priority}</h1>
                <p>{task.desc}</p>
                </div>
                <ul>
                    <li>Зробити №1</li>
                    <li>Зробити №2</li>
                    <li>Зробити №3</li>
                    <li>Зробити №4</li>
                    <li>Зробити №5</li>
                </ul>
            </div>
        </div>
            
    </>)
}

function CreateFullTasks() {
    return(
    <>
            <div className="full-task-left-sidebar">
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
            </div>
    </>)
}

function printTasks() {
    const [fullTask, setFullTask] = useState(0);

    
    return (
    <>
        <div className='ViewDetailed'>
            <ShowSidebar />
            <section className='show-all-tasks'>
                <div className='show-all-tasks-top'>
                    <h1>Today</h1>
                </div>
                <div className='show-all-tasks-bottom'>
                    {tasks.map(item => (
                        <div key={item.id} className={item.id===fullTask ? 'choosenFullTask' : 'v'} onClick={()=>setFullTask(item.id)}>
                            <div className='task'>
                                <div className='show-all-TaskTop'>
                                    <span className='print-task-icon'> {IsTaskFinished(item)} </span>
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
            </section>
            
            <section className='show-all-tasks-certain'>
            {printFullTasks(fullTask)}
            </section>
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

function ShowSidebar(subtasks) {
    return(
        <>
        <section className='Sidebar'>
            <img className='task-icon' src="../../img/icons/menu.svg" alt="menu"/>
        </section>
        </>
    )
}