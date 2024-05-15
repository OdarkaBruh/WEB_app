import tasks from '../data/Tasks.json';
import categories from '../data/Categories.json';
import { useState, useEffect } from 'react';
import './Task.css';
import './Sidebar.css';
import './EditPanel.css';
import './Main.css';

var taskCategories = [];
var sidebarToggle = true;
var mobileVersion = 426;
var TabletVersion = 768;

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

function CreateFullTasks({id}) {
    const updateValue = (e) => {
        newTask(previousState => {
          return { ...previousState, e }
        });
    }

    const finishedImage = '../../img/icons/check.svg';
    const unfinishedImage = "../../img/icons/cross.svg";

    let editTask = tasks[id];

    function newSub(){
        {updateValue(editTask.subtask[editTask.subtask.length] = "")}
        return(<textarea>{editTask.subtask[editTask.subtask.length]}</textarea>)
    }

    function printSub(){
        return(editTask.subtask.map (subTask => (
            <li key={subTask.id}>
            <img className='task-icon' src={subTask.finished ? finishedImage : unfinishedImage} onClick={() => updateValue(subTask.finished = !subTask.finished)}/>
            <textarea maxLength={40} placeholder='Write your task...' defaultValue={subTask.name} onChange={(e) => updateValue(subTask.name = e.target.value)}></textarea>
            </li>
        )))
    }

    return(
    <>
                <div className='CertainTaskTop'>
                    <textarea id="name" 
                    maxLength="60"
                    defaultValue={editTask.name}
                    onChange={(e) => updateValue(editTask.name = e.target.value)}/>
                </div>
                <div className='CertainTaskInfo'>
                    <div className='DeadlineAndPriority'>
                    <h1>Until day:&emsp;
                        <input type="date"
                        defaultValue = {editTask.deadline} 
                        onChange={(e) => updateValue(editTask.deadline = e.target.value)}/>
                    </h1>
                    <br />
                    <h1>Priority:&emsp;
                        <input type="number" max={5} min={0} 
                        defaultValue = {editTask.priority} 
                        onChange={(e) => updateValue(editTask.priority = e.target.value)}/>
                        </h1>
                    <textarea id="desc" placeholder="Describe task..." maxLength="200" 
                    defaultValue = {editTask.desc} 
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

function printTasks() {
    const [fullTask, setFullTask] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    var [toggle, setToggle] = useState(true);
    
    function toggleState(){
        if (window.innerWidth > mobileVersion){
            setToggle(!toggle);
            sidebarToggle = !sidebarToggle;
        }
        else {
            if (toggle){
                setPageNum(1);
            }
            else {
                setToggle(true);
                sidebarToggle = true;
            }
        }
    }

    function mobileDisplay(){
        if (window.innerWidth<=mobileVersion && pageNum !== 2){
            return {
                display: 'none'
            }
        }
        else if (window.innerWidth<=TabletVersion && toggle){
            return {
                
            }
        }
    }

    function showFull() {
        if (window.innerWidth<=TabletVersion && toggle){}
        else{
            return(
            <>
            <section className='show-all-tasks-certain' id="ID_EditPanel" 
            style={mobileDisplay()}>
                {MobileButton({setPageNum})}
                <div className="full-task-left-sidebar" style={mobileDisplay()}>
                    {MobileButton({setPageNum})}
                    <div className="full-task-info">
                        <CreateFullTasks id={fullTask}/>
                    </div>
                </div>
            </section>
            </>)
        }
    }

    function countFinishedSubtasks(item) {
        var counter = 0;
        for (let i = 0; i < item.subtask.length; i++) {
            if (item.subtask[i].finished){
                counter++;
            }
        } 

        return (<>{counter}/{item.subtask.length}</>)
    }

    function filterAllTasks(){
        var filteredTasks=[];
        for (let i = 0; i < tasks.length; i++) {
            if (taskCategories.length == 0) {
                return(tasks.map(task =>(printFilteredTask(task))))
            }
            else {
                if (taskCategories.every(v => tasks[i].category.includes(v))){
                    filteredTasks.push(tasks[i]);
                }

            }
        }

        return(<>{filteredTasks.map (task =>(printFilteredTask(task)))}</>)
    }

    function switchTask(item){
        setFullTask(item.id);
        setPageNum(2);
        setToggle(false);
        sidebarToggle=false;
    }

    function printFilteredTask(item){
        return(<div key={item.id} className={item.id===fullTask ? 'choosenFullTask' : 'v'} onClick={()=>switchTask(item)}>
            <div className='task'>
                <div className='show-all-TaskTop'>
                    <span className='print-task-icon'> {IsTaskFinished(item)} </span>
                    <h1>{item.name}{item.subtask.length !== 0 && <a>   - {countFinishedSubtasks(item)}</a>}</h1>
                </div>
                <h2>{item.desc}</h2>
            </div>
        </div>)
    }

    function filterTask(item){
        for (let i = 0; i < item.category.length; i++) {
            if (taskCategories.includes(item.category[i])){
                printFilteredTask(item);
            }
            else { return(<a>{item.category[i]}</a>)}
        }
    }

    return (
        <>
        <div className='ViewDetailed'>
            <section className='Sidebar' id="ID_Sidebar" 
                style={{
                    width: toggle ? '30%' 
                    : (window.innerWidth > TabletVersion) ? '5%' 
                    : '10%',
                    display: (window.innerWidth<mobileVersion &&  pageNum !== 0) && 'none' }}>
            {toggle
                ? <FullSidebar setPageNum={setPageNum} toggleState={toggleState}/>
                : <ShortSidebar toggleState={toggleState}/> }
            </section>

            <section className='show-all-tasks' id="ID_Main"
                    style={{
                        display: (window.innerWidth<mobileVersion && pageNum !==1) && 'none' }}>
                <div className='show-all-tasks-top'>
                    <div className='ButtonMobile'>
                        <img className='task-icon' src="../../img/icons/menu.svg" alt="menu" onClick={()=>setPageNum(0)} />
                    </div>
                    <h1>Today</h1>
                </div>
                <div className='show-all-tasks-bottom'>
                    {filterAllTasks()}
                </div>
            </section>
            {showFull()}
        </div>
    </>)
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

function MobileButton({setPageNum}){
    if (window.innerWidth < mobileVersion){
        return(<>
        <button onClick={()=>setPageNum(1)}>See all Tasks</button>
        </>)
    }
}

function ShortSidebar({toggleState}) {
    return(
        <>
        <div className='short-sidebar'>
            {imgSidebar({toggleState})}
        </div>
        </>
    )
}

function imgSidebar({toggleState}){
    return(<img className='task-icon' src="../../img/icons/menu.svg" alt="menu" 
            onClick={()=>toggleState()}/>)
}

function FullSidebar({toggleState}){
    const [category, setCategory] = useState("");

    function addCategory(e){
        if (!taskCategories.includes(e)){
            taskCategories.push(e);
        }
        else {
            var index = taskCategories.indexOf(e);
            if (index !== -1) {
                taskCategories.splice(index, 1);
            }
        }
    }

    function ClearCategory(){
        taskCategories = [];
    }

    return(
        <>
            <div className='full-sidebar'>
                {imgSidebar({toggleState})}
                <div className='full-sidebar-categories'>
                    <ul>
                        {categories.map(item => (
                        <li key={item.id} onClick={e=>addCategory(item)}>{item}</li>
                        ))}
                    </ul>
                    {taskCategories.map(e => (
                        <li key={e.id}>{e}</li>
                        ))}
                </div>
                <button onClick={() => ClearCategory()}>Clear Categories</button>
            </div>
        </>
    )
}