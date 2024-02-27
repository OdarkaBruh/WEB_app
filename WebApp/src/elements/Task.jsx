import tasks from '../data/Tasks.json';
import './Task.css';


//Paste image stuff here later
function IsTaskFinished(a) {
    if (a.finished){
        return (<h1>+ </h1>);
}
return (<h1>- </h1>);
}


function printTasks() {
    return (
    <>
        <div className='tasksAll'>
            {tasks.map(item => (
                    <div key={item.id}>
                        <div className='task'>
                            <div className='taskTop'>
                            {IsTaskFinished(item)}
                            <h1>{item.name}   - {item.subtask.length!==0 && <a>0/{item.subtask.length}</a>}</h1>
                            </div>
                            <h2>{item.desc}</h2>
                            <h1>{new Date(item.deadline).toLocaleDateString()}</h1>
                            {item.subtask.length!==0 && printSubTasks(item.subtask)}
                        </div>
                    </div>
                
            ))}
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
    <h1>ЗАГОЛОВОК</h1>
    {printTasks()}
    </>
    )
}